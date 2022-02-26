import LandingMapPage from '../screens/LandingMapPage';
import PaymentCardsPage from '../screens/PaymentCardsPage';
import UpdateDetailsPage from '../screens/UpdateDetailsPage';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShopList from '../components/Shops/ShopList';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {TransitionPresets} from '@react-navigation/stack';
import ShopPage from '../components/Shops/ShopPage';

const HomeStack = createSharedElementStackNavigator();
const HomeStackNavigator = ({setVisible}) => {
  return (
    <HomeStack.Navigator
      initialRouteName="Landing map"
      screenOptions={{
        headerShown: false,
        useNativeDriver: true,
        gestureEnabled: false,
        // transitionSpec: {
        //   open: iosTransitionSpec,
        //   close: iosTransitionSpec,
        // },
      }}
    >
      <HomeStack.Screen name="Landing map" component={LandingMapPage} />
      <HomeStack.Screen name="Shop list" component={ShopList} />
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
      }}
    >
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
      }}
    >
      <ChangeDetailsStack.Screen
        name="Change details"
        component={UpdateDetailsPage}
      />
    </ChangeDetailsStack.Navigator>
  );
};

export const iosTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

const options = {
  headerBackTitleVisible: false,
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

export {
  HomeStackNavigator,
  ChangeDetailsStackNavigator,
  PaymentAccountsNavigator,
};
