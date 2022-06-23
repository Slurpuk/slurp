const GlobalAction = {
  DISABLE_LOCATION: 'Disable location',
  ENABLE_LOCATION: 'Enable location',
  START_SHOPS_LOADING: 'Start shops loading',
  START_USER_LOADING: 'Start user loading',
  STOP_SHOPS_LOADING: 'Stop shops loading',
  STOP_USER_LOADING: 'Stop user loading',
  SET_CURRENT_USER: 'Set current user',
  SET_LIST_OF_SHOPS: 'Set the list if shops',
  SET_CURRENT_SHOP: 'Set the current shop',
  SET_CURRENT_BASKET: 'Set current basket',
  BOTTOM_SHEET_UP: 'Take the shop bottom sheet up',
  BOTTOM_SHEET_DOWN: 'Take the shop bottom sheet down',
  USE_APP: 'Use app for the first time (after download)',
  CONNECT: 'Connect',
  DISCONNECT: 'Disconnect',
  CLEAR_BASKET: 'Clear basket',
  CHANGE_SHOP_FROM_MARKER: 'Change shop from a map marker',
  CHANGE_SHOP_FROM_LIST: 'Change shop from the shop list',
  LOGOUT: 'Logout',
  SET_CURRENT_ORDERS: 'Set current orders',
  SET_USER_REF: 'Set user ref',
  SET_PAST_ORDERS: 'Set past orders',
};

const MapAction = {
  FOCUS_SEARCH_BAR: 'Focus search bar',
  UNFOCUS_SEARCH_BAR: 'Unfocus search bar',
  CENTER_USER: 'Center the user',
  DECENTER_USER: 'Decenter the user',
  SET_MAP_CENTER: 'Set the map center',
  SET_REGION: 'Set the map region',
  CENTER_AUTOMATICALLY: 'Center automatically',
};
Object.freeze(GlobalAction);
Object.freeze(MapAction);
export {GlobalAction, MapAction};
