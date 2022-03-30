import firestore from '@react-native-firebase/firestore';
import {getOptions, getOrderItem, getOrderShop} from '../firebase/queries';
import {months} from '../data/Months';
import {OrderStatus} from '../data/OrderStatus';
import {
  getBasket,
  getCurrentShopKey,
  setBasket,
  setCurrentShopKey,
} from './storageHelpers';

/**
 * Format the orders to be displayed as current orders.
 * @param orders the orders to format
 * @param setCurrentOrders The setState method to set the current orders
 */
async function formatCurrentOrders(orders, setCurrentOrders) {
  let newOrders = await formatOrdersItems(orders);
  let finalOrders = [];
  await Promise.all(
    newOrders.map(async order => {
      order.shop = await getOrderShop(order);
      finalOrders.push(order);
    }),
  );
  setCurrentOrders(finalOrders);
}

/**
 * Format the orders to be displayed as past orders.
 * @param orders the orders to format
 * @param setPastOrders The setState method to set the past orders
 *
 */
async function formatPastOrders(orders, setPastOrders) {
  let periods = [];
  orders.forEach(order => {
    if (!periods.find(x => x.period === order.period)) {
      periods.push(order.period);
    }
  });
  let newOrders = await formatOrdersItems(orders);
  let finalOrders = [];
  await Promise.all(
    newOrders.map(async order => {
      order.shop = await getOrderShop(order);
      let curr = newOrders.find(x => x.period === order.period);
      curr
        ? curr.data.push(order)
        : finalOrders.push({period: order.period, data: [order]});
    }),
  );
  setPastOrders(finalOrders);
}

/**
 * Format the items of an order before being displayed on the orders page
 * @param orders the orders which items need to be formatted
 * @return Array The orders now containing formatted items
 */
async function formatOrdersItems(orders) {
  let newOrders = [];
  await Promise.all(
    orders.map(async order => {
      let newItems = [];
      for (let item of order.Items) {
        let newItem = await getOrderItem(item);
        newItems.push(newItem);
      }
      order.Items = newItems;
      newOrders.push(order);
    }),
  );
  return newOrders;
}

/**
 * Calculate the distance between 2 given locations
 * @param shopLocation the shop location
 * @param currLocation The current location
 * @return Number The euclidean distance between the 2 locations
 */
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
  return parseInt(R * cc, 10);
}

/**
 * Calculate the time between 2 coordinates with an average walking speed
 * @return time the walking time between the 2 points
 * @param distance
 */
function calculateTime(distance) {
  const speed = 4 * 16.6667;
  return parseInt(distance / speed, 10);
}

/**
 * Calculate corresponding time for given distance, formats it and returns.
 * @return time The formatted walking time between the 2 points
 * @param distance The distance to process.
 */
export function processDistance(distance) {
  let minutes = calculateTime(distance);
  let d = Math.floor(minutes / (24 * 60));
  let h = Math.floor((minutes % (24 * 60)) / 60);
  let m = Math.floor(minutes % 60);

  let dDisplay = d > 0 ? d + ' d ' : '';
  let hDisplay = h > 0 ? h + ' h ' : '';
  let mDisplay = m > 0 ? m + (m === 1 ? ' min ' : ' mins ') : '';

  return dDisplay + hDisplay + mDisplay;
}

/**
 * Returns whether 2 basket items are identical.
 * @param item1 the first item
 * @param item2 The second item
 * @return boolean Whether the 2 items are identical
 */
function isSameItem(item1, item2) {
  if (item2.hasOwnProperty('Bean') && item1.hasOwnProperty('Bean')) {
    let itOptions = '';
    item1.options.forEach(option => (itOptions += option.Name));
    let currItOptions = '';
    item2.options.forEach(option => (currItOptions += option.Name));
    return item1.key === item2.key && itOptions === currItOptions;
  } else {
    return item1.key === item2.key;
  }
}

/**
 * Add an item to both the current basket and the storage basket
 * @param item The item to add
 * @param currShop The currently selected shop
 * @param setCurrBasket The setState method for the current basket
 * @return Object The resulting basket
 */
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

/**
 * Remove an item from both the current basket and the storage basket
 * @param item The item to add
 * @param setCurrBasket The setState method for the current basket
 * @return Object The resulting basket
 */
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

/**
 * Refresh the current shop state depending on the updated list of shops and the storage shop.
 * @param formattedShops The new list of shops
 * @param staticShopsData The previous shops data
 * @param clearBasket Clear basket method
 * @param setShopsData setState method for the dynamic shops data
 */
async function refreshShops(
  formattedShops,
  staticShopsData,
  clearBasket,
  setShopsData,
) {
  if (staticShopsData.currShopIndex !== -1) {
    let previous = staticShopsData.allShops[staticShopsData.currShopIndex];
    let newCurrShop = formattedShops.findIndex(
      shop => shop.key === previous.key,
    );
    setShopsData({allShops: formattedShops, currShopIndex: newCurrShop});
    if (newCurrShop === -1) {
      await setCurrentShopKey('');
      await clearBasket;
    }
  } else {
    let storageKey = await getCurrentShopKey();
    if (storageKey !== '') {
      let storageShop = formattedShops.findIndex(
        shop => shop.key === storageKey,
      );
      setShopsData({
        allShops: formattedShops,
        currShopIndex: storageShop,
      });
      if (storageShop === -1) {
        await clearBasket();
        await setCurrentShopKey('');
      }
    }
  }
}

/**
 * Format the given shop's items (for menu display) and returns them.
 * @return Object The formatted items
 */
async function getFormattedItems(shop) {
  let coffees = [];
  let drinks = [];
  let snacks = [];
  await Promise.all(
    shop.data().ItemsOffered.map(async itemRef => {
      await firestore()
        .doc(itemRef.path)
        .get()
        .then(item => {
          if (itemRef.path.includes('Coffees')) {
            coffees.push({...item.data(), key: item.id});
          } else if (itemRef.path.includes('Drinks')) {
            drinks.push({...item.data(), key: item.id});
          } else {
            snacks.push({...item.data(), key: item.id});
          }
        });
    }),
  );
  return {Coffees: coffees, Drinks: drinks, Snacks: snacks};
}

/**
 * Format the shop objects before use in the shop page.
 * @return Array The list of formatted shops
 */
async function getFormattedShops(shopsData) {
  const shops = [];
  await Promise.all(
    shopsData.docs.map(async documentSnapshot => {
      const data = documentSnapshot.data();
      let shopData = {
        ...data,
        key: documentSnapshot.id,
        Location: {
          latitude: data.Location._latitude,
          longitude: data.Location._longitude,
        },
      };
      shopData.ItemsOffered = await getFormattedItems(documentSnapshot);
      await getOptions().then(options => {
        shopData.options = options;
        shops.push(shopData);
      });
    }),
  );
  return shops;
}

/**
 * Separate the orders between current and past orders based on their current status.
 * @return Object The object containing the current and past orders
 */
async function separateOrders(orders) {
  let currentOrdersLocal = [];
  let pastOrdersLocal = [];
  orders.forEach(documentSnapshot => {
    let firebaseOrder = {
      ...documentSnapshot.data(),
      key: documentSnapshot.id,
    };

    firebaseOrder.period =
      months[firebaseOrder.DateTime.toDate().getMonth()] +
      ' ' +
      firebaseOrder.DateTime.toDate().getFullYear();

    if (
      firebaseOrder.Status === OrderStatus.REJECTED ||
      firebaseOrder.Status === OrderStatus.COLLECTED
    ) {
      pastOrdersLocal.push(firebaseOrder);
    } else {
      currentOrdersLocal.push(firebaseOrder);
    }
  });

  return {pastOrders: pastOrdersLocal, currentOrders: currentOrdersLocal};
}

/**
 * Format basket contents to match a precision.
 * @return items The list of formatted items
 */
function formatBasket(contents) {
  let items = contents.map(item => {
    let options = item.hasOwnProperty('options') ? item.options : [];
    return {
      ItemRef: item.key,
      Quantity: item.count,
      Price: Number(item.Price.toFixed(2)),
      Type: item.type,
      Options: options,
    };
  });
  return items;
}

export {
  calculateDistance,
  formatPastOrders,
  formatCurrentOrders,
  addToBasket,
  removeFromBasket,
  refreshShops,
  separateOrders,
  getFormattedShops,
  formatBasket,
};
