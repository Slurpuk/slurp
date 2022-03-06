import React from 'react';
import {LogBox} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useState} from 'react';
import SideDrawerContent from '../components/HamburgerMenu/SideDrawerContent';
import HamburgerButton from '../components/HamburgerMenu/HamburgerButton';
import LogInPage from '../screens/LogInPage';
import {
  BasketPageNavigator,
  ChangeDetailsStackNavigator,
  ChangePasswordStackNavigator,
  HomeStackNavigator,
  OrderHistoryStackNavigator,
  PaymentAccountsNavigator,
} from './StackNavigator';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Drawer = createDrawerNavigator();
export const VisibleContext = React.createContext();

export const BasketContext = React.createContext();

function HamburgerSlideBarNavigator() {
  const [isHeaderVisible, setVisible] = useState(true);

  const [numBasketItems, setNumBasketItems] = useState(0);
  const [basketContents, setBasketContents] = useState(null);
  const [shopTitle, setShopTitle] = useState(null);

  return (
    <VisibleContext.Provider value={setVisible}>
      <BasketContext.Provider
        value={{
          setNumBasketItems: setNumBasketItems,
          numBasketItems: numBasketItems,
          setBasketContents: setBasketContents,
          basketContents: basketContents,
          setShopTitle: setShopTitle,
          shopTitle: shopTitle,
        }}>
        <Drawer.Navigator
          drawerContent={props => <SideDrawerContent {...props} />}
          screenOptions={({navigation}) => ({
            headerShown: isHeaderVisible,
            drawerPosition: 'left',
            header: () => <HamburgerButton navigation={navigation} />,
          })}>
          <Drawer.Screen name="Home" children={() => <HomeStackNavigator />} />
          <Drawer.Screen
            name="View order history"
            children={() => <OrderHistoryStackNavigator />}
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
          <Drawer.Screen
            name="BasketPage"
            children={() => <BasketPageNavigator />}
          />
        </Drawer.Navigator>
      </BasketContext.Provider>
    </VisibleContext.Provider>
  );
}

export default HamburgerSlideBarNavigator;
