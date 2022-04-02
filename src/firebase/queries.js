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
    .collection('options')
    .get()
    .then(querySnapShot => {
      querySnapShot.forEach(documentSnapshot => {
        let option = {
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
          ref: documentSnapshot.ref,
        };
        let index;
        option.type === 'Syrup' ? (index = 1) : (index = 0);
        if (option.name === 'Dairy') {
          dairy = option;
        } else {
          options[index].data.push(option);
        }
      });
      options[1].data.sort((a, b) => a.name.localeCompare(b.name));
      options[0].data.sort((a, b) => a.name.localeCompare(b.name));
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
    .doc(userRef.path)
    .update({location: new firestore.GeoPoint(latitude, longitude)})
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
    .collection('users')
    .where('email', '==', user.email)
    .get()
    .then(async querySnapshot => {
      if (querySnapshot.docs.length === 0) {
      }
      let userModel = querySnapshot.docs[0];
      let newUser = {
        ...userModel.data(),
        key: userModel.id,
        ref: userModel.ref,
      };
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
 * @return Object The formatted item for being displayed as part of an order.
 * @param orderItem
 */
async function getOrderItem(orderItem) {
  let newItem;
  await firestore()
    .doc(orderItem.item.path)
    .get()
    .then(async doc => {
      let item = doc.data();
      newItem = {
        ...item,
        key: doc.id,
        quantity: orderItem.quantity,
      };
      if (item.has_options) {
        newItem.options = await Promise.all(
          orderItem.options.map(async option => await getOrderOption(option)),
        );
      }
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

async function getOrderOption(option) {
  let newOption;
  await firestore()
    .doc(option.path)
    .get()
    .then(doc => {
      newOption = {
        ...doc.data(),
        key: doc.id,
      };
    })
    .catch(error => {
      if (error.code === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    });
  return newOption;
}

/**
 * Retrieve and return the backend instance of the order's shop.
 * @return Object The shop to which the order was sent
 * @param order The target order
 */
async function getOrderShop(order) {
  let shop;
  await firestore()
    .doc(order.shop.path)
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
 * @param shopRef The reference to the shop
 * @param userRef The reference to the user
 * @param total The total amount of the order
 */
async function sendOrder(items, shopRef, userRef, total) {
  await firestore()
    .collection('orders')
    .add({
      incoming_time: new firestore.Timestamp.now(),
      items: items,
      status: 'incoming',
      shop: shopRef,
      user: userRef,
      is_displayed: true,
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
