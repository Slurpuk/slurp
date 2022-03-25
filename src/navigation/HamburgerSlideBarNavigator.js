import React, {useContext} from 'react';
import {LogBox, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useState} from 'react';
import SideDrawerContent from '../components/HamburgerMenu/SideDrawerContent';
import HamburgerButton from '../components/HamburgerMenu/HamburgerButton';
import LogInPage from '../screens/LogInPage';
import {
  ChangeDetailsStackNavigator,
  ChangePasswordStackNavigator,
  HomeStackNavigator,
  OrderHistoryStackNavigator,
  PaymentAccountsNavigator,
} from './StackNavigator';
import {GlobalContext} from '../../App';
import textStyles from '../../stylesheets/textStyles';
import auth from '@react-native-firebase/auth';

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
      >
        <Drawer.Screen name="Home" children={() => <HomeStackNavigator />} />
        <Drawer.Screen
          name="View order history"
          children={() => <OrderHistoryStackNavigator />}
        />
        <Drawer.Screen
          name="Change name"
          children={() => <ChangeDetailsStackNavigator />}
        />
        <Drawer.Screen
          name="Change password"
          children={() => <ChangePasswordStackNavigator />}
        />
      </Drawer.Navigator>
    </VisibleContext.Provider>
  );
}

export default HamburgerSlideBarNavigator;
