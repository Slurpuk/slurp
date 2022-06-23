import React from 'react';
import {Animated} from 'react-native';

export const defaultGlobalContextValues = {
  isLoadingShops: true,
  isLoadingUser: true,
  currentUser: null,
  currentUserRef: null,
  currentShopKey: '',
  currentShop: null,
  pastOrders: [],
  currentOrders: [],
  listOfShops: [],
  currentBasket: [],
  isShopIntro: false, // Is the shop page bottom sheet up.
  isFirstTime: true, // Is it the first time the app is downloaded
  adaptiveOpacity: new Animated.Value(0), // Animation fading value.
  locationIsEnabled: false,
  isConnected: false,
};

export const defaultMapContextValues = {
  mapCenter: {
    longitudeDelta: 0.01,
    latitudeDelta: 0.01,
  },
  isSearchBarFocused: false,
  isUserCentered: false,
  isManuallyCentered: false,
};
const GlobalContext = React.createContext(defaultGlobalContextValues);

const MapContext = React.createContext(defaultMapContextValues);

export {GlobalContext, MapContext};
