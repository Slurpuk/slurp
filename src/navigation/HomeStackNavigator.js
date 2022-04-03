import LandingMapPage from '../screens/LandingMapPage';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShopList from '../components/Shops/ShopList';
import ShopPage from '../screens/ShopPage';
import OrderPage from '../screens/OrderPage';
import BasketPage from '../screens/BasketPage';

const HomeStack = createNativeStackNavigator();

/**
 * Home stack navigator containing the pages accessible from the landing map and enables navigation between them
 */
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
      <HomeStack.Screen name="Shop page" component={ShopPage} />
    </HomeStack.Navigator>
  );
};

export {HomeStackNavigator};
