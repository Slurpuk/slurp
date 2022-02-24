import React from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useState} from 'react';
import LandingMapPage from '../screens/LandingMapPage';
import SideDrawerContent from '../components/HamburgerMenu/SideDrawerContent';
import HamburgerButton from '../components/HamburgerMenu/HamburgerButton';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Drawer = createDrawerNavigator();

function HamburgerSlideBarNavigator() {
  const [isHeaderVisible, setVisible] = useState(true);

  return (
    <Drawer.Navigator
      drawerContent={props => <SideDrawerContent {...props} />}
      initialRouteName={'Home'}
      screenOptions={({navigation}) => ({
        headerShown: isHeaderVisible,
        drawerPosition: 'left',
        header: () => <HamburgerButton navigation={navigation} />,
      })}
    >
      <Drawer.Screen
        name="Home"
        children={() => <LandingMapPage setVisible={setVisible} />}
      />
      <Drawer.Screen
        name="View order history"
        children={() => <LandingMapPage setVisible={setVisible} />}
      />
      <Drawer.Screen
        name="Payment accounts"
        children={() => <LandingMapPage setVisible={setVisible} />}
      />
      <Drawer.Screen
        name="Change name"
        children={() => <LandingMapPage setVisible={setVisible} />}
      />
      <Drawer.Screen
        name="Change password"
        children={() => <LandingMapPage setVisible={setVisible} />}
      />
      <Drawer.Screen
        name="Logout the device"
        children={() => <LandingMapPage setVisible={setVisible} />}
      />
    </Drawer.Navigator>
  );
}

export default HamburgerSlideBarNavigator;
