import {GlobalAction, MapAction} from './data/actionEnum';
import {defaultGlobalContextValues} from './contexts';

function globalReducer(state, action) {
  switch (action.type) {
    case GlobalAction.CONNECT:
      return {...state, isConnected: true};
    case GlobalAction.USE_APP:
      return {...state, isFirstTime: false};
    case GlobalAction.DISABLE_LOCATION:
      return {...state, locationIsEnabled: false};
    case GlobalAction.DISCONNECT:
      return {...state, isConnected: false};
    case GlobalAction.ENABLE_LOCATION:
      return {...state, locationIsEnabled: true};
    case GlobalAction.SET_CURRENT_BASKET:
      return {...state, currentBasket: action.basket};
    case GlobalAction.SET_CURRENT_USER:
      return {...state, currentUser: action.user};
    case GlobalAction.SET_USER_REF:
      return {...state, currentUserRef: action.ref};
    case GlobalAction.BOTTOM_SHEET_UP:
      return {...state, isShopIntro: true};
    case GlobalAction.BOTTOM_SHEET_DOWN:
      return {...state, isShopIntro: false};
    case GlobalAction.SET_LIST_OF_SHOPS:
      return {...state, listOfShops: action.shops};
    case GlobalAction.SET_CURRENT_SHOP:
      const newShop =
        action.key === ''
          ? null
          : state.listOfShops.find(shop => shop.key === action.key);
      return {...state, currentShopKey: action.key, currentShop: newShop};
    case GlobalAction.START_USER_LOADING:
      return {...state, isLoadingUser: true};
    case GlobalAction.START_SHOPS_LOADING:
      return {...state, isLoadingShops: true};
    case GlobalAction.STOP_SHOPS_LOADING:
      return {...state, isLoadingShops: false};
    case GlobalAction.STOP_USER_LOADING:
      return {...state, isLoadingUser: false};
    case GlobalAction.CLEAR_BASKET:
      return {...state, currentBasket: []};
    case GlobalAction.CHANGE_SHOP_FROM_LIST:
      const listShop =
        action.key === ''
          ? null
          : state.listOfShops.find(shop => shop.key === action.key);
      return {
        ...state,
        currentShopKey: action.key,
        currentShop: listShop,
      };
    case GlobalAction.CHANGE_SHOP_FROM_MARKER:
      const markerShop =
        action.key === ''
          ? null
          : state.listOfShops.find(shop => shop.key === action.key);
      return {
        ...state,
        isShopIntro: true,
        currentShopKey: action.key,
        currentShop: markerShop,
      };
    case GlobalAction.LOGOUT:
      return defaultGlobalContextValues;
    case GlobalAction.SET_CURRENT_ORDERS:
      return {...state, currentOrders: action.orders};
    case GlobalAction.SET_PAST_ORDERS:
      return {...state, pastOrders: action.orders};
    default:
      return state;
  }
}

function mapReducer(state, action) {
  switch (action.type) {
    case MapAction.UNFOCUS_SEARCH_BAR:
      return {...state, isSearchBarFocused: false};
    case MapAction.SET_MAP_CENTER:
      const mapCenter = state.mapCenter;
      return {
        ...state,
        mapCenter: {
          ...mapCenter,
          latitude: action.location.latitude,
          longitude: action.location.longitude,
        },
        isManuallyCentered: true,
      };
    case MapAction.SET_REGION:
      const currentRegion = state.mapCenter;
      return {
        ...state,
        mapCenter: {
          ...currentRegion,
          latitude: action.location.latitude,
          longitude: action.location.longitude,
        },
      };
    case MapAction.CENTER_AUTOMATICALLY:
      return {...state, isManuallyCentered: false};
    case MapAction.CENTER_USER:
      return {...state, isUserCentered: true};
    case MapAction.FOCUS_SEARCH_BAR:
      return {...state, isSearchBarFocused: true};
    case MapAction.DECENTER_USER:
      return {...state, isUserCentered: false};
    default:
      return state;
  }
}

export {globalReducer, mapReducer};
