import 'react-native-gesture-handler';
import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import HamburgerSlideBarNavigator, {
  VisibleContext,
} from './src/navigation/HamburgerSlideBarNavigator';
import SignUpPage from './src/screens/SignUpPage';
import LogInPage from './src/screens/LogInPage';
import WelcomePages from './src/screens/WelcomePages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const GlobalContext = React.createContext();
export default function App() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser);
  const [shopsData, setShopsData] = useState([]);
  const [isShopIntro, setIsShopIntro] = useState(false);
  const [currShop, setCurrShop] = useState(shopsData[0]);
  const [isFullScreen, setFullScreen] = useState(false);
  const [basketContent, setBasketContent] = useState([]);
  const [basketSize, setBasketSize] = useState(0);
  const [total, setTotal] = useState(0);

  const checkForFirstTime = async () => {
    const result = await AsyncStorage.getItem('isFirstTime');
    //if what we get from the Async is null we are opening the app for the first time
    //if we pressed the sign up button on the last slide we set the 'isFirstTime' to 'no'
    if (result === null) {
      setIsFirstTime(true);
    } //now we can use the isFirstTimeLoad state to choose what to render
  };

  useEffect(() => {
    checkForFirstTime();
  }, []);


  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  });

  const enterApp = () => {
    setIsFirstTime(false);
    AsyncStorage.setItem('isFirstTime', 'potatoesInPower');
  };

  function newShop({shop, navigation}) {
    setBasketContent([]);
    setBasketSize(0);
    setTotal(0);
    setCurrShop(shop);
    navigation.navigate('Shop page');
  }

  function changeShop({shop, navigation}) {
    if (currShop !== shop && basketSize !== 0) {
      Alert.alert(
        'Are you sure ?',
        'Changing shops will clear your basket.',
        [
          {
            text: 'Yes',
            onPress: () => newShop({shop, navigation}),
          },
          {
            text: 'No',
            onPress: () => navigation.navigate('Shop page'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      setCurrShop(shop);
      navigation.navigate('Shop page');
    }
  }

  // Subscribe to the Shops model
  useEffect(() => {
    const subscriber = firestore()
      .collection('CoffeeShop')
      .onSnapshot(querySnapshot => {
        const shops = [];

        querySnapshot.forEach(documentSnapshot => {
          let shopData = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };

          let coffees = [];
          let drinks = [];
          let snacks = [];
          documentSnapshot.data().ItemsOffered.forEach(itemRef => {
            firestore()
              .doc(itemRef.path)
              .onSnapshot(querySnapshot => {
                let collection = '';
                if (itemRef.path.includes('Coffees')) {
                  collection = coffees;
                } else if (itemRef.path.includes('Drinks')) {
                  collection = drinks;
                } else {
                  collection = snacks;
                }
                collection.push({
                  ...querySnapshot.data(),
                  key: querySnapshot.id,
                });
              });
          });
          shopData.ItemsOffered = {
            Coffees: coffees,
            Drinks: drinks,
            Snacks: snacks,
          };
          shops.push(shopData);
          setShopsData(shops);
          setCurrShop(shops[0]);
        });
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  function addToBasket(item) {
    const basket = basketContent;
    const exist = basket.find(x => x.key === item.key);
    if (exist) {
      setBasketContent(
        basket.map(x =>
          x.key === item.key ? {...exist, count: exist.count + 1} : x,
        ),
      );
    } else {
      setBasketContent([...basket, {...item, count: 1}]);
    }
    setTotal(total + item.totalPrice);
    setBasketSize(basketSize + 1);
  }

  function removeFromBasket(item) {
    const basket = basketContent;
    const exist = basket.find(x => x.key === item.key);
    if (exist.count === 1) {
      setBasketContent(basket.filter(x => x.key !== item.key));
    } else {
      setBasketContent(
        basket.map(x =>
          x.key === item.key ? {...exist, count: exist.count - 1} : x,
        ),
      );
    }
    setTotal(total - item.Price);
    setBasketSize(basketSize - 1);
  }

  const setShopIntro = () => {
    setIsShopIntro(!isShopIntro);
  };

  const Stack = createNativeStackNavigator();
  return (
    <GlobalContext.Provider
      value={{
        enterApp: enterApp,
        user: currentUser,
        currShop: currShop,
        setCurrShop: changeShop,
        isShopIntro: isShopIntro,
        shopsData: shopsData,
        setShopIntro: setShopIntro,
        isFullScreen: isFullScreen,
        setFullScreen: setFullScreen,
        basketContent: basketContent,
        setBasketContent: setBasketContent,
        total: total,
        setTotal: setTotal,
        addToBasket: addToBasket,
        removeFromBasket: removeFromBasket,
        basketSize: basketSize,
      }}
    >
      <NavigationContainer>
        {isLoggedIn ? (
          <HamburgerSlideBarNavigator />
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
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
