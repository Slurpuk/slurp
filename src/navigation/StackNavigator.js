import LandingMapPage from '../screens/LandingMapPage';
import PaymentCardsPage from '../screens/PaymentCardsPage';
import UpdateDetailsPage from '../screens/UpdateDetailsPage';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShopList from '../components/Shops/ShopList';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {TransitionPresets} from '@react-navigation/stack';
import ShopPage from '../components/Shops/ShopPage';
import ChangePasswordPage from '../screens/ChangePasswordPage';
import OrderPage from '../screens/OrderPage';
import BasketPage from '../screens/BasketPage';

const HomeStack = createSharedElementStackNavigator();
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Landing map"
      screenOptions={{
        headerShown: false,
        useNativeDriver: true,
        gestureEnabled: false,
      }}>
      <HomeStack.Screen name="Landing map" component={LandingMapPage} />
      <HomeStack.Screen name="Shop list" component={ShopList} />
      <HomeStack.Screen name="Basket page" component={BasketPage} />
      <HomeStack.Screen name="Order history" component={OrderPage} />
      <HomeStack.Screen
        name="Shop page"
        component={ShopPage}
        sharedElements={(route, otherRoute) => {
          if (['Shop list'].includes(otherRoute.name)) {
            return [route.params.shop.id];
          }
          return [];
        }}
      />
    </HomeStack.Navigator>
  );
};

const PaymentAccountsStack = createNativeStackNavigator();
const PaymentAccountsNavigator = () => {
  return (
    <PaymentAccountsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <PaymentAccountsStack.Screen
        name="PaymentAccounts"
        component={PaymentCardsPage}
      />
    </PaymentAccountsStack.Navigator>
  );
};

const ChangeDetailsStack = createNativeStackNavigator();
const ChangeDetailsStackNavigator = () => {
  return (
    <ChangeDetailsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ChangeDetailsStack.Screen
        name="ChangeDetails"
        component={UpdateDetailsPage}
      />
    </ChangeDetailsStack.Navigator>
  );
};
const ChangePasswordStack = createNativeStackNavigator();
const ChangePasswordStackNavigator = () => {
  return (
    <ChangePasswordStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ChangePasswordStack.Screen
        name="ChangePassword"
        component={ChangePasswordPage}
      />
    </ChangePasswordStack.Navigator>
  );
};

const OrderHistoryStack = createNativeStackNavigator();
const OrderHistoryStackNavigator = () => {
  return (
    <OrderHistoryStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <OrderHistoryStack.Screen name="OrderHistory" component={OrderPage} />
    </OrderHistoryStack.Navigator>
  );
};

export {
  HomeStackNavigator,
  ChangeDetailsStackNavigator,
  PaymentAccountsNavigator,
  ChangePasswordStackNavigator,
  OrderHistoryStackNavigator,
};
