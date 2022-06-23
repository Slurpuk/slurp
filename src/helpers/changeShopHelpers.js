import {clearStorageBasket, setCurrentShopKey} from './storageHelpers';
import {Alerts} from '../data/Alerts';
import {GlobalAction} from '../data/actionEnum';

/**
 * Clear the basket and change to the new shop
 */
async function clearBasket(globalDispatch) {
  globalDispatch({type: GlobalAction.CLEAR_BASKET});
  await clearStorageBasket();
}

async function setMarkerShop(shopKey, globalDispatch) {
  globalDispatch({type: GlobalAction.CHANGE_SHOP_FROM_MARKER, key: shopKey});
  await setCurrentShopKey(shopKey);
}

async function switchShop(shopKey, globalDispatch) {
  await clearBasket(globalDispatch);
  await setMarkerShop(shopKey, globalDispatch);
}

async function changeShopFromMarker(globalState, newKey, globalDispatch) {
  let basketSize = globalState.currentBasket.length;
  // Pops up an alert if the new shop is different from the current one and the basket is not empty.
  if (
    globalState.currentShopKey !== '' &&
    globalState.currentShopKey !== newKey &&
    basketSize !== 0
  ) {
    Alerts.changeShopAlertV1(newKey, switchShop, globalDispatch);
  } else {
    await setMarkerShop(newKey, globalDispatch);
  }
}

async function changeShop(shopKey, globalDispatch, navigation) {
  await clearBasket(globalDispatch);
  await setCardShop(shopKey, globalDispatch, navigation);
}

async function setCardShop(shopKey, globalDispatch, navigation) {
  globalDispatch({type: GlobalAction.CHANGE_SHOP_FROM_LIST, key: shopKey});
  await setCurrentShopKey(shopKey);
  navigation.navigate('Shop page');
}

async function changeShopFromList(
  globalState,
  newKey,
  globalDispatch,
  navigation,
) {
  let basketLength = globalState.currentBasket.length;
  // Pops up an alert if the new shop is different from the current one and the basket is not empty.
  if (
    globalState.currentShopKey !== '' &&
    globalState.currentShopKey !== newKey &&
    basketLength !== 0
  ) {
    Alerts.changeShopAlertV2(newKey, changeShop, globalDispatch, navigation);
  } else {
    await setCardShop(newKey, globalDispatch, navigation);
  }
}

export {changeShopFromMarker, changeShopFromList};
