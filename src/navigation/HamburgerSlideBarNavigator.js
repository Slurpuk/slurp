import React from 'react';
import {LogBox} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useState} from 'react';
import LandingMapPage from '../screens/LandingMapPage';
import SideDrawerContent from '../components/UserManagement/SideDrawerContent';
import HamburgerButton from '../components/UserManagement/HamburgerButton';
import PaymentCardsPage from '../screens/PaymentCardsPage';
import ChangeDetailsPage from '../components/UserManagement/ChangeDetailsPage';
import ChangePasswordPage from '../screens/ChangePasswordPage';
import LogInPage from '../screens/LogInPage';
import {
  ChangeDetailsStackNavigator,
  HomeStackNavigator,
  MainStackNavigator, PaymentAccountsNavigator,
} from "./StackNavigator";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Drawer = createDrawerNavigator();

function HamburgerSlideBarNavigator() {
  const [isHeaderVisible, setVisible] = useState(true);

  return (
    <Drawer.Navigator
      drawerContent={props => <SideDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerShown: isHeaderVisible,
        drawerPosition: 'left',
        header: () => <HamburgerButton navigation={navigation} />,
      })}>
      <Drawer.Screen
        name="Home"
        children={() => <HomeStackNavigator setVisible={setVisible} />}
      />
      <Drawer.Screen
        name="View order history"
        children={() => <HomeStackNavigator setVisible={setVisible} />} //need to fix this page
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
        children={() => <ChangePasswordPage setVisible={setVisible} />} //need to fix this page
      />
      <Drawer.Screen
        name="Logout the device"
        children={() => <LogInPage setVisible={setVisible} />}
      />
    </Drawer.Navigator>
  );
}

export default HamburgerSlideBarNavigator;
