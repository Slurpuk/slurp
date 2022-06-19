import firestore from '@react-native-firebase/firestore';
import {Alerts} from '../data/Alerts';
import auth from '@react-native-firebase/auth';
const queryTimeOutMessage = 'firestore query call timeout limit reached';

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
        } else if (!options[index].data.find(opt => opt.name === option.name)) {
          options[index].data.push(option);
        }
      });
      options[1].data.sort((a, b) => a.name.localeCompare(b.name));
      options[0].data.sort((a, b) => a.name.localeCompare(b.name));
      options[0].data.unshift(dairy);
    })
    .catch(() => Alerts.databaseErrorAlert());
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
    .catch(() => Alerts.databaseErrorAlert());
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
      let userModel = querySnapshot.docs[0];
      let newUser = {
        ...userModel.data(),
        key: userModel.id,
        ref: userModel.ref,
      };
      setUser(newUser);
    })
    .catch(() => Alerts.databaseErrorAlert());
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
    .catch(() => Alerts.databaseErrorAlert());

  return newItem;
}

/**
 * Retrives the data of an option using its reference.
 * @param optionRef The reference to the option
 */
async function getOrderOption(optionRef) {
  let newOption;
  await firestore()
    .doc(optionRef.path)
    .get()
    .then(doc => {
      newOption = {
        ...doc.data(),
        key: doc.id,
      };
    })
    .catch(() => Alerts.databaseErrorAlert());
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
    .catch(() => Alerts.databaseErrorAlert());
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
    .catch(() => Alerts.databaseErrorAlert());
}

/**
 * Creates a  user model instance with the given parameters
 * @param email The email
 * @param first_name The first name
 * @param last_name The last name
 */
async function createUserModel(email, first_name, last_name) {
  await firestore()
    .collection('users')
    .add({
      email: email,
      first_name: first_name,
      last_name: last_name,
      location: new firestore.GeoPoint(51.5140310233705, -0.1164075624320158),
    })
    .catch(() => Alerts.databaseErrorAlert());
}

/**
 * Create and signs in a new user to the firebase authentication.
 * @param email The email
 * @param password The password
 */
async function createUserAuth(email, password) {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(error => handleSignUpErrorsBackEnd(error.code));
}

/**
 * Handle errors once received an error code from the database
 * @param errorCode Firebase error code
 */
function handleSignUpErrorsBackEnd(errorCode) {
  if (errorCode === 'auth/network-request-failed') {
    Alerts.networkAlert();
  } else if (errorCode === 'auth/email-already-in-use') {
    Alerts.elseAlert();
    // This is not ideal, implementing a confirm email feature would allow us to show the same message as if a confirmation email had been sent.
  } else if (errorCode === 'auth/too-many-requests') {
    Alerts.tooManyRequestsAlert();
  } else {
    Alerts.elseAlert();
  }
}

/**
 * Get the reference to an item given its key
 * @param item The target item
 */
async function getItemRef(item) {
  let itemRef;
  await firestore()
    .collection('items')
    .doc(item.key)
    .get()
    .then(doc => {
      itemRef = doc.ref;
    })
    .catch(() => Alerts.databaseErrorAlert());

  return itemRef;
}

/**
 * Get the reference to an option given its key
 * @param option The target option
 */
async function getOptionRef(option) {
  let optionRef;
  await firestore()
    .collection('options')
    .doc(option.key)
    .get()
    .then(doc => {
      optionRef = doc.ref;
    })
    .catch(() => Alerts.databaseErrorAlert());

  return optionRef;
}

/**
 * Logout the current user if there's one currently logged in.
 */
async function logout() {
  await auth()
    .signOut()
    .catch(() => Alerts.databaseErrorAlert());
}

/**
 * Call an async function with a maximum time limit (in milliseconds) for the timeout
 * @param {Promise<any>} asyncPromise An asynchronous promise to resolve
 * @param {number} timeLimit Time limit to attempt function in milliseconds
 * @returns {Promise<any> | undefined} Resolved promise for async function call, or an error if time limit reached
 */
const asyncCallWithTimeout = async (asyncPromise, timeLimit) => {
  let timeoutHandle;

  const timeoutPromise = new Promise((_resolve, reject) => {
    timeoutHandle = setTimeout(
      () => reject(new Error(queryTimeOutMessage)),
      timeLimit,
    );
  });

  return Promise.race([asyncPromise, timeoutPromise]).then(result => {
    clearTimeout(timeoutHandle);
    return result;
  });
};
export {
  getOptions,
  updateUserLocation,
  setUserObject,
  getOrderItem,
  getOrderShop,
  sendOrder,
  createUserModel,
  createUserAuth,
  getItemRef,
  getOptionRef,
  logout,
};
