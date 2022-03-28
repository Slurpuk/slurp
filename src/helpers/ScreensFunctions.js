import firestore from '@react-native-firebase/firestore';
import {Alerts} from '../data/Alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';

function formatOrders(
  formattedOrders,
  isCurrent,
  setCurrentOrders,
  setPastOrders,
) {
  let newOrders = [];
  let periods = [];
  if (!isCurrent) {
    formattedOrders.forEach(order => {
      if (!periods.find(x => x.period === order.period)) {
        periods.push(order.period);
      }
    });
  }
  formattedOrders.forEach(async order => {
    let temp = order;
    let newItems = [];
    for (let item of temp.Items) {
      let newItem;
      await firestore()
        .collection(item.Type + 's')
        .doc(item.ItemRef)
        .get()
        .then(doc => {
          newItem = {
            ...doc.data(),
            type: item.Type,
            key: doc.id,
            quantity: item.Quantity,
            options: item.Options,
          };
          newItems.push(newItem);
        })
        .catch(error => {
          if (error.code === 'auth/network-request-failed') {
            Alerts.connectionErrorAlert();
          } else {
            Alerts.databaseErrorAlert();
          }
        });
    }
    temp.Items = newItems;

    await firestore()
      .collection('CoffeeShop')
      .doc(order.ShopID)
      .get()
      .then(document => {
        temp.shop = {...document.data()};
        if (isCurrent) {
          newOrders.push(temp);
        } else {
          let curr = newOrders.find(x => x.period === temp.period);
          curr
            ? curr.data.push(temp)
            : newOrders.push({period: temp.period, data: [temp]});
        }
        isCurrent ? setCurrentOrders(newOrders) : setPastOrders(newOrders);
      })
      .catch(error => {
        if (error === 'auth/network-request-failed') {
          Alerts.connectionErrorAlert();
        } else {
          Alerts.databaseErrorAlert();
        }
      });
  });
}

function calculateDistance(shopLocation, currLocation) {
  const R = 6371e3; // metres
  const latitude1 = (currLocation.latitude * Math.PI) / 180; // φ, λ in radians
  const latitude2 = (shopLocation.latitude * Math.PI) / 180;
  const diffLat =
    ((shopLocation.latitude - currLocation.latitude) * Math.PI) / 180;
  const diffLon =
    ((shopLocation.longitude - currLocation.longitude) * Math.PI) / 180;

  const aa =
    Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(diffLon / 2) *
      Math.sin(diffLon / 2);
  const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));

  // in metres
  return parseInt(R * cc);
}

function isSameItem(it, currIt) {
  if (currIt.hasOwnProperty('Bean') && it.hasOwnProperty('Bean')) {
    let itOptions = '';
    it.options.forEach(option => (itOptions += option.Name));
    let currItOptions = '';
    currIt.options.forEach(option => (currItOptions += option.Name));
    return it.key === currIt.key && itOptions === currItOptions;
  } else {
    return it.key === currIt.key;
  }
}

async function addToBasket(item, currShop, setCurrBasket) {
  let basket = await getBasket();
  const exist = basket.find(x => isSameItem(x, item));
  let type;
  if (item.hasOwnProperty('Bean')) {
    type = 'Coffee';
  } else if (
    currShop.ItemsOffered.Drinks.filter(x => x.Name === item.Name).length !== 0
  ) {
    type = 'Drink';
  } else {
    type = 'Snack';
  }
  let newBasket;
  if (exist) {
    newBasket = basket.map(x =>
      isSameItem(x, item) ? {...exist, count: exist.count + 1} : x,
    );
  } else {
    newBasket = [...basket, {...item, count: 1, type: type}];
  }
  setCurrBasket(newBasket);
  await setBasket(newBasket);
  return newBasket;
}

async function removeFromBasket(item, setCurrBasket) {
  let basket = await getBasket();
  const exist = basket.find(x => isSameItem(x, item));
  let newBasket;
  if (exist.count === 1) {
    newBasket = basket.filter(x => x.key !== item.key);
  } else {
    newBasket = basket.map(x =>
      isSameItem(x, item) ? {...exist, count: exist.count - 1} : x,
    );
  }
  await setBasket(newBasket);
  setCurrBasket(newBasket);
  return newBasket;
}

async function getBasketSize() {
  let basket = await getBasket();
  return basket.length;
}

async function getCurrentShopKey() {
  try {
    return await AsyncStorage.getItem('@CurrentShopKey');
  } catch (err) {
    Alerts.StorageAlert();
  }
}

async function setCurrentShopKey(shopKey) {
  try {
    await AsyncStorage.setItem('@CurrentShopKey', shopKey);
  } catch (err) {
    Alerts.StorageAlert();
  }
}

async function refreshCurrentShop(currShop, setCurrShop, shops) {
  let storageKey = await getCurrentShopKey();
  if (currShop) {
    let res = shops.find(shop => shop.key === currShop.key);
    if (res) {
      currShop = res;
    } else {
      setCurrShop(prevState => ({...prevState, currShop: null}));
      await setCurrentShopKey('');
      clearBasket();
    }
  } else if (storageKey !== '') {
    let storageShop = shops.find(shop => shop.key === storageKey);
    if (storageShop) {
      setCurrShop(prevState => ({...prevState, currShop: storageShop}));
    } else {
      let basketSize = await getBasketSize();
      if (basketSize !== 0) {
        clearBasket();
      }
    }
  }
}

async function initiateStorage() {
  try {
    const emptyBasket = JSON.stringify([]);
    await AsyncStorage.setItem('@isFirstTime', 'true');
    await AsyncStorage.setItem('@Basket', emptyBasket);
    await AsyncStorage.setItem('@CurrentShopKey', '');
  } catch (err) {
    Alerts.StorageAlert();
  }
}

async function getBasket() {
  try {
    const jsonValue = await AsyncStorage.getItem('@Basket');
    return JSON.parse(jsonValue);
  } catch (err) {
    Alerts.StorageAlert();
  }
}

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

async function setBasket(newBasket) {
  try {
    const jsonValue = JSON.stringify(newBasket, getCircularReplacer());
    await AsyncStorage.setItem('@Basket', jsonValue);
  } catch (err) {
    Alerts.StorageAlert();
  }
}

function clearBasket() {
  setBasket([]).catch(error => Alerts.elseAlert());
}

async function refreshCurrentBasket(setCurrBasket) {
  let storageBasket = await getBasket();
  setCurrBasket(storageBasket);
}

function enterApp() {
  initiateStorage().catch(error => Alerts.elseAlert());
}

async function getIsFirstTime() {
  try {
    const result = await AsyncStorage.getItem('@isFirstTime');
    return result !== 'true';
  } catch (error) {
    Alerts.StorageAlert();
  }
}

export {
  calculateDistance,
  formatOrders,
  addToBasket,
  removeFromBasket,
  enterApp,
  setCurrentShopKey,
  clearBasket,
  getIsFirstTime,
  refreshCurrentShop,
  refreshCurrentBasket,
};
