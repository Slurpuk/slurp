import React from 'react';
import {LogBox} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useState} from 'react';
import LandingMapPage from '../screens/LandingMapPage';
import SideDrawerContent from '../components/HamburgerMenu/SideDrawerContent';
import HamburgerButton from '../components/HamburgerMenu/HamburgerButton';
import PaymentCardsPage from '../screens/PaymentCardsPage';
import UpdateDetailsPage from '../screens/UpdateDetailsPage';
import ChangePasswordPage from '../screens/ChangePasswordPage';
import LogInPage from '../screens/LogInPage';
import {
  ChangeDetailsStackNavigator,
  ChangePasswordStackNavigator,
  HomeStackNavigator,
  MainStackNavigator,
  PaymentAccountsNavigator,
} from './StackNavigator';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Drawer = createDrawerNavigator();
export const VisibleContext = React.createContext();
function HamburgerSlideBarNavigator() {
  const [isHeaderVisible, setVisible] = useState(true);

  return (
    <VisibleContext.Provider value={setVisible}>
      <Drawer.Navigator
        drawerContent={props => <SideDrawerContent {...props} />}
        screenOptions={({navigation}) => ({
          headerShown: isHeaderVisible,
          drawerPosition: 'left',
          header: () => <HamburgerButton navigation={navigation} />,
        })}
        onNavigationStateChange={() => console.log('LOL')}
      >
        <Drawer.Screen name="Home" children={() => <HomeStackNavigator />} />
        <Drawer.Screen
          name="View order history"
          children={() => <HomeStackNavigator />} //need to fix this page
        />
        <Drawer.Screen
          name="Payment accounts"
          children={() => <PaymentAccountsNavigator />}
        />
        <Drawer.Screen
          name="Change name"
          children={() => <ChangeDetailsStackNavigator />}
        />
        <Drawer.Screen
          name="Change password"
          children={() => <ChangePasswordStackNavigator />}
        />
        <Drawer.Screen
          name="Logout the device"
          children={() => <LogInPage />}
        />
      </Drawer.Navigator>
    </VisibleContext.Provider>
  );
}

export default HamburgerSlideBarNavigator;
