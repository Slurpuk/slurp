import firestore from '@react-native-firebase/firestore';
import {Alerts} from '../data/Alerts';

/**
 * Separates the items offered by the shop into 3 sections: coffees, drinks and snacks.
 * Formats the data before passing it to the flatlists.
 * @return Array The formatted options data.
 */
async function getOptions() {
  let options = [
    {title: 'Select Milk', data: []},
    {title: 'Add Syrup', data: []},
  ];
  let dairy;
  await firestore()
    .collection('Options')
    .get()
    .then(querySnapShot => {
      querySnapShot.forEach(documentSnapshot => {
        let option = {
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        };
        let index = 0;
        option.Type === 'Syrup' ? (index = 1) : (index = 0);
        if (option.Name === 'Dairy') {
          dairy = option;
        } else {
          options[index].data.push(option);
        }
      });
      options[1].data.sort((a, b) => a.Name.localeCompare(b.Name));
      options[0].data.sort((a, b) => a.Name.localeCompare(b.Name));
      options[0].data.unshift(dairy);
    })
    .catch(error => {
      if (error === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    });

  return options;
}

/**
 * Update the backend user instance to the new one.
 * @param userRef The document id of the user
 * @param latitude The new latitude
 * @param longitude The new longitude
 */
async function updateUserLocation(userRef, latitude, longitude) {
  await firestore()
    .collection('Users')
    .doc(userRef)
    .update({Location: new firestore.GeoPoint(latitude, longitude)})
    .catch(error => {
      if (error === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    });
}

/**
 * Set the current user's state to its corresponding backend instance.
 * @param user The firebase authentication instance of the current user
 * @param setUser The setState method of the user.
 */
async function setUserObject(user, setUser) {
  await firestore()
    .collection('Users')
    .where('Email', '==', user.email)
    .get()
    .then(querySnapshot => {
      let userModel = querySnapshot.docs[0];
      let newUser = {...userModel.data(), key: userModel.id};
      setUser(newUser);
    })
    .catch(error => {
      if (error === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    });
}

/**
 * Retrieve the backend instance of the given item and return a formatted version of it.
 * Suitable for orderPage display
 * @param item
 * @return Object The formatted item for being displayed as part of an order.
 */
async function getOrderItem(item) {
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
    })
    .catch(error => {
      if (error.code === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    });

  return newItem;
}

/**
 * Retrieve and return the backend instance of the order's shop.
 * @return Object The shop to which the order was sent
 * @param order The target order
 */
async function getOrderShop(order) {
  let shop;
  await firestore()
    .collection('CoffeeShop')
    .doc(order.ShopID)
    .get()
    .then(document => {
      shop = document.data();
    })
    .catch(error => {
      if (error === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    });
  return shop;
}

/**
 * Send a new order to the database.
 * @param items List of items in the order
 * @param shopID The id of the shop to which the order is sent
 * @param userID The id of the user sending the order
 * @param total The total amount of the order
 */
async function sendOrder(items, shopID, userID, total) {
  await firestore()
    .collection('Orders')
    .add({
      DateTime: new firestore.Timestamp.now(),
      Items: items,
      Status: 'incoming',
      ShopID: shopID,
      UserID: userID,
      Total: total,
    })
    .catch(error => {
      if (error === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    });
}

export {
  getOptions,
  updateUserLocation,
  setUserObject,
  getOrderItem,
  getOrderShop,
  sendOrder,
};
