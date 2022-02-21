import LandingMapPage from '../screens/LandingMapPage';
import PaymentCardsPage from '../screens/PaymentCardsPage';
import ChangeDetailsPage from '../components/UserManagement/ChangeDetailsPage';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator();
const HomeStackNavigator = ({setVisible}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen
        name="Home"
        children={() => <LandingMapPage setVisible={setVisible} />}
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
        name="Payment accounts"
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
        name="Change details"
        component={ChangeDetailsPage}
      />
    </ChangeDetailsStack.Navigator>
  );
};

export {
  HomeStackNavigator,
  ChangeDetailsStackNavigator,
  PaymentAccountsNavigator,
};
