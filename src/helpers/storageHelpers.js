import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alerts} from '../data/Alerts';

/**
 * Returns the storage shop key
 * @return Number The key of the shop
 */
async function getCurrentShopKey() {
  try {
    return await AsyncStorage.getItem('@CurrentShopKey');
  } catch (err) {
    Alerts.StorageAlert();
  }
}

/**
 * Set the storage shop key to the given one
 * @param shopKey The new key to set
 */
async function setCurrentShopKey(shopKey) {
  try {
    await AsyncStorage.setItem('@CurrentShopKey', shopKey);
  } catch (err) {
    Alerts.StorageAlert();
  }
}

/**
 * Load initial values in the async storage.
 */
async function initiateStorage() {
  try {
    const emptyBasket = JSON.stringify([]);
    await AsyncStorage.setItem('@isFirstTime', 'false');
    await AsyncStorage.setItem('@Basket', emptyBasket);
    await AsyncStorage.setItem('@CurrentShopKey', '');
  } catch (err) {
    Alerts.StorageAlert();
  }
}

/**
 * Retrieve the basket from the storage.
 * @return Array if the basket exists, return it, otherwise return empty array
 */
async function getBasket() {
  try {
    const jsonValue = await AsyncStorage.getItem('@Basket');
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (err) {
    Alerts.StorageAlert();
  }
}

/**
 * Circular replacer to solve the circular dependencies in the JSON before stringification
 */
function getCircularReplacer() {
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
}

/**
 * Set the storage basket to the given new basket.
 * @param newBasket The new basket
 */
async function setBasket(newBasket) {
  try {
    const jsonValue = JSON.stringify(newBasket, getCircularReplacer());
    await AsyncStorage.setItem('@Basket', jsonValue);
  } catch (err) {
    Alerts.StorageAlert();
  }
}

/**
 * Clear the storage basket, i.e., set it to an empty array.
 */
async function clearStorageBasket() {
  await setBasket([]);
}

/**
 * Set the current basket state to the storage instance.
 * @param setCurrBasket The setState method for the current basket state
 */
async function refreshCurrentBasket(setCurrBasket) {
  let storageBasket = await getBasket();
  setCurrBasket(storageBasket);
}

/**
 * Enter the app for the first time after installation.
 */
async function enterApp() {
  await initiateStorage();
}

/**
 * Return whether it is the first time the app is used after download.
 * @return boolean return true if it is first time, false otherwise
 */
async function getIsFirstTime() {
  try {
    const result = await AsyncStorage.getItem('@isFirstTime');
    return result !== 'false';
  } catch (error) {
    Alerts.StorageAlert();
  }
}

export {
  getIsFirstTime,
  refreshCurrentBasket,
  enterApp,
  setCurrentShopKey,
  clearStorageBasket,
  getBasket,
  setBasket,
  getCurrentShopKey,
};
