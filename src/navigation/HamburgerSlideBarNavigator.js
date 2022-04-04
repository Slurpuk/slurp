import React from 'react';
import {LogBox} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useState} from 'react';
import SideDrawerContent from '../components/HamburgerMenu/SideDrawerContent';
import HamburgerButton from '../components/HamburgerMenu/HamburgerButton';
import {HomeStackNavigator} from './HomeStackNavigator';
import UpdateDetailsPage from '../screens/UpdateDetailsPage';
import ChangePasswordPage from '../screens/ChangePasswordPage';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Drawer = createDrawerNavigator();
export const VisibleContext = React.createContext();

/**
 * Slide bar navigator containing the appropriate screens and allowing navigation between them
 */
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
        <Drawer.Screen name="Change details" component={UpdateDetailsPage} />
        <Drawer.Screen name="Change password" component={ChangePasswordPage} />
      </Drawer.Navigator>
    </VisibleContext.Provider>
  );
}

export default HamburgerSlideBarNavigator;
