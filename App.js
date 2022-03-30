import 'react-native-gesture-handler';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HamburgerSlideBarNavigator from './src/navigation/HamburgerSlideBarNavigator';
import SignUpPage from './src/screens/SignUpPage';
import LogInPage from './src/screens/LogInPage';
import WelcomePages from './src/screens/WelcomePages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {Animated} from 'react-native';
import LoadingPage from './src/screens/LoadingPage';
import {setUserObject} from './src/firebase/queries';
import {Alerts} from './src/data/Alerts';
import {
  calculateDistance,
  getFormattedShops,
  refreshShops,
} from './src/helpers/screenHelpers';
import {
  clearStorageBasket,
  getIsFirstTime,
  refreshCurrentBasket,
  setCurrentShopKey,
} from './src/helpers/storageHelpers';

export const GlobalContext = React.createContext();
/**
 * Root component rendered when the application boots.
 */
export default function App() {
  const [loading, setLoading] = useState(true); // Is the app still fetching backend data.
  const [currentUser, setCurrentUser] = useState(null);
  const [shopsData, setShopsData] = useState({allShops: [], currShopIndex: -1});
  const staticShopsData = useRef(shopsData);
  const [currBasket, setCurrBasket] = useState([]);
  const [isShopIntro, setIsShopIntro] = useState(false); // Is the shop page bottom sheet up.
  const [isFirst, setIsFirst] = useState(true); // Is it the first time the app is downloaded
  const adaptiveOpacity = useRef(new Animated.Value(0)).current; // Animation fading value.
  const LoggedOutStack = createNativeStackNavigator(); // Stack navigator for logged out users.

  /**
   * Side effect that fires when App first renders to determine whether it is the first time the app is used since download
   * Sets the first time state accordingly.
   */
  useEffect(() => {
    async function setIsFirstTime() {
      const isFirstTime = await getIsFirstTime();
      setIsFirst(isFirstTime);
    }

    setIsFirstTime().catch(error => Alerts.elseAlert());
  }, []);

  /**
   * Side effect that updates the static shops data on every render.
   */
  useEffect(() => {
    staticShopsData.current = shopsData;
  });

  /**
   * Side effect that tracks the authentication state of the current user.
   * Sets the current user object accordingly.
   */
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      user
        ? setUserObject(user, setCurrentUser).catch(error => Alerts.elseAlert())
        : setCurrentUser(null);
    });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  /**
   * Side effect that tracks changes in the model instance of the user in the database and updates the state accordingly
   * Sets the current user object accordingly.
   */
  useEffect(() => {
    if (!loading && auth().currentUser) {
      const subscriber = firestore()
        .collection('Users')
        .where('Email', '==', auth().currentUser.email)
        .onSnapshot(query => {
          let newUserDoc = query.docs[0];
          let newUser = newUserDoc.data();
          setCurrentUser({...newUser, key: newUserDoc.id});
          shopsData.allShops.forEach(shop => {
            shop.distanceTo = calculateDistance(shop.Location, {
              latitude: newUser.Location._latitude,
              longitude: newUser.Location._longitude,
            });
          });
        });
      return () => subscriber();
    }
  }, [loading, shopsData.allShops]);

  /**
   * Side effect that tracks any change in the coffee shop model.
   * Retrieves the latest shop data, formats it and updates the current set of shops as well as the basket.
   */
  useEffect(() => {
    const subscriber = firestore()
      .collection('CoffeeShop')
      .onSnapshot(async querySnapshot => {
        let formattedShops = await getFormattedShops(querySnapshot);
        await refreshShops(
          formattedShops,
          staticShopsData.current,
          clearBasket,
          setShopsData,
        );
        if (loading) {
          await refreshCurrentBasket(setCurrBasket);
        }
        if (loading) {
          setLoading(false);
        }
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [loading]);

  /**
   * Set the current shop state and the storage instance to the given shop.
   * @param shop The new shop
   */
  async function setNewShop(shop) {
    let newIndex = shopsData.allShops.findIndex(curr => curr.key === shop.key);
    setShopsData(prevState => ({...prevState, currShopIndex: newIndex}));
    await setCurrentShopKey(shop.key).catch(error => Alerts.elseAlert());
  }

  /**
   * Clear the basket state as well as the storage one.
   */
  async function clearBasket() {
    setCurrBasket([]);
    await clearStorageBasket();
  }

  /**
   * Clear the basket, change to the new shop and navigate to the shop page.
   * @param shop The new shop
   * @param navigation The navigation object
   */
  async function cardSwitchShop(shop, navigation) {
    await clearBasket();
    await setNewShop(shop);
    navigation.navigate('Shop page');
  }

  /**
   * Clear the basket, change to the new shop and drag the shop introduction sheet up
   * @param shop The new shop
   */
  async function markerSwitchShop(shop) {
    await clearBasket();
    await setNewShop(shop);
    setIsShopIntro(true);
  }

  /**
   * Handles changing shops when pressing a shop card (in the shop list).
   * @param shop The new shop
   * @param navigation The navigation object
   */
  async function changeShopFromCard(shop, navigation) {
    let basketSize = currBasket.length;
    // Pops up an alert if the new shop is different from the current one and the basket is not empty.
    if (
      shopsData.currShopIndex !== -1 &&
      shopsData.allShops[shopsData.currShopIndex].key !== shop.key &&
      basketSize !== 0
    ) {
      Alerts.changeShopAlertV2(cardSwitchShop, shop, navigation);
    } else {
      await setNewShop(shop);
      navigation.navigate('Shop page');
    }
  }

  /**
   * Handles changing shops when pressing a map marker.
   * @param shop The new shop
   */
  async function changeShopFromMarker(shop) {
    let basketSize = currBasket.length;
    // Pops up an alert if the new shop is different from the current one and the basket is not empty.
    if (
      shopsData.currShopIndex !== -1 &&
      shopsData.allShops[shopsData.currShopIndex].key !== shop.key &&
      basketSize !== 0
    ) {
      await Alerts.changeShopAlertV1(markerSwitchShop, shop);
    } else {
      await setNewShop(shop);
      if (!isShopIntro) {
        setIsShopIntro(true);
      }
    }
  }

  /**
   * Handles changing shops throughout the app.
   * @param newShop The newly selected shop.
   * @param navigation The optional navigation (passed if the change is occurring by pressing a shop card)
   */
  async function changeShop(newShop, navigation = null) {
    navigation
      ? await changeShopFromCard(newShop, navigation)
      : await changeShopFromMarker(newShop);
  }

  return (
    <GlobalContext.Provider
      value={{
        currentUser: currentUser,
        shopsData: shopsData.allShops,
        currBasket: {
          data: currBasket,
          setContent: setCurrBasket,
          clear: clearBasket,
        },
        currShop:
          shopsData.currShopIndex === -1
            ? null
            : shopsData.allShops[shopsData.currShopIndex],
        changeShop: changeShop,
        bottomSheet: {isOpen: isShopIntro, setOpen: setIsShopIntro},
        adaptiveOpacity: adaptiveOpacity,
      }}
    >
      <NavigationContainer>
        {auth().currentUser && currentUser ? (
          !loading ? (
            <HamburgerSlideBarNavigator />
          ) : (
            <LoadingPage />
          )
        ) : !loading ? (
          <LoggedOutStack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            {isFirst ? (
              <LoggedOutStack.Screen name="Welcome" component={WelcomePages} />
            ) : null}
            <LoggedOutStack.Screen name="LogIn" component={LogInPage} />
            <LoggedOutStack.Screen name="SignUp" component={SignUpPage} />
          </LoggedOutStack.Navigator>
        ) : null}
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
