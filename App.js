import 'react-native-gesture-handler';
import React, {useEffect, useMemo, useRef, useState} from 'react';
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
import {getOptions, setUserObject} from './src/firebase/queries';
import {Alerts} from './src/data/Alerts';
import {
  clearBasket,
  getIsFirstTime,
  refreshCurrentBasket,
  refreshCurrentShop,
  setCurrentShopKey,
} from './src/helpers/ScreensFunctions';

export const GlobalContext = React.createContext();
export default function App() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    authUser: auth().currentUser,
    userObj: null,
  });
  const [shopsData, setShopsData] = useState([]);
  const currShop = useRef(null);
  const isFirstTime = useMemo(async () => getIsFirstTime(), []);
  const [currBasket, setCurrBasket] = useState([]);
  const [isShopIntro, setIsShopIntro] = useState(false);
  const adaptiveOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        setCurrentUser(user);
        setUserObject(user, setCurrentUser).catch(error => console.log(error));
      } else {
        setCurrentUser(null);
        setCurrentUser(prevState => ({...prevState, userObj: null}));
      }
    });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  // Subscribe to the Shops model
  useEffect(() => {
    if (currentUser.userObj) {
      const subscriber = firestore()
        .collection('CoffeeShop')
        .onSnapshot(async querySnapshot => {
          const shops = [];
          await Promise.all(
            querySnapshot.docs.map(async documentSnapshot => {
              let shopData = {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              };
              let coffees = [];
              let drinks = [];
              let snacks = [];
              await Promise.all(
                documentSnapshot.data().ItemsOffered.map(async itemRef => {
                  await firestore()
                    .doc(itemRef.path)
                    .get()
                    .then(item => {
                      if (itemRef.path.includes('Coffees')) {
                        coffees.push({...item.data(), key: item.id});
                      } else if (itemRef.path.includes('Drinks')) {
                        drinks.push({...item.data(), key: item.id});
                      } else {
                        snacks.push({...item.data(), key: item.id});
                      }
                    });
                }),
              );
              shopData.ItemsOffered = {
                Coffees: coffees,
                Drinks: drinks,
                Snacks: snacks,
              };

              await getOptions().then(options => {
                shopData.options = options;
                shops.push(shopData);
              });
            }),
          );
          setShopsData(shops);
          console.log('1');
          await refreshCurrentShop(currShop, shops);
          await refreshCurrentBasket(currBasket, setCurrBasket);
          setLoading(false);
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
  }, [currBasket, currentUser.userObj]);

  const setShopIntro = shown => {
    setIsShopIntro(shown);
  };

  async function setNewShop(shop) {
    currShop.current = shop;
    await setCurrentShopKey(shop.key).catch(error => console.log(error));
  }

  // When coming from the shop list
  async function cardSwitchShop(shop, navigation) {
    clearBasket();
    await setNewShop(shop);
    navigation.navigate('Shop page');
  }

  // When coming from the markers
  async function markerSwitchShop(shop) {
    clearBasket();
    await setNewShop(shop);
  }

  // When coming from the shop list
  function changeShopFromCard(shop, navigation) {
    let basketSize = currBasket.length;
    if (
      currShop.current &&
      currShop.current.key !== shop.key &&
      basketSize !== 0
    ) {
      Alerts.changeShopAlertV2(cardSwitchShop, shop, navigation);
    } else {
      navigation.navigate('Shop page');
    }
  }

  // When coming from the markers
  async function changeShopFromMarker(shop) {
    let basketSize = currBasket.length;
    if (
      currShop.current &&
      currShop.current.key !== shop.key &&
      basketSize !== 0
    ) {
      Alerts.changeShopAlertV1(markerSwitchShop, shop);
    } else {
      await setNewShop(shop);
      if (!isShopIntro) {
        setIsShopIntro(true);
      }
    }
  }

  function changeShop(isFromCard, newShop, navigation = null) {
    isFromCard
      ? changeShopFromCard(newShop, navigation)
      : changeShopFromMarker(newShop);
  }

  const Stack = createNativeStackNavigator();
  return (
    <GlobalContext.Provider
      value={{
        currentUser: currentUser.userObj,
        shopsData: shopsData,
        currBasket: {data: currBasket, setContent: setCurrBasket},
        currShop: currShop.current,
        changeShop: changeShop,
        isShopIntro: isShopIntro,
        setShopIntro: setShopIntro,
        adaptiveOpacity: adaptiveOpacity,
      }}>
      <NavigationContainer>
        {currentUser ? (
          currentUser.userObj && !loading ? (
            <HamburgerSlideBarNavigator />
          ) : (
            <LoadingPage />
          )
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {isFirstTime ? (
              <Stack.Screen name="Welcome" component={WelcomePages} />
            ) : null}
            <Stack.Screen name="LogIn" component={LogInPage} />
            <Stack.Screen name="SignUp" component={SignUpPage} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
