import 'react-native-gesture-handler';
import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {Alert, Animated} from 'react-native';
import auth from '@react-native-firebase/auth';

export const GlobalContext = React.createContext();
export default function App() {
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [userRef, setUserRef] = useState(null);
  const [userObj, setUserObj] = useState(null);
  const [shopsData, setShopsData] = useState([]);
  const [isShopIntro, setIsShopIntro] = useState(false);
  const [currShop, setCurrShop] = useState(shopsData[0]);
  const [isFullScreen, setFullScreen] = useState(false);
  const [basketContent, setBasketContent] = useState([]);
  const [basketSize, setBasketSize] = useState(0);
  const [total, setTotal] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [orderedShops, setOrderedShops] = useState([]);
  const [currentCenterLocation, setCurrentCenterLocation] = useState({
    latitude: 51.5140310233705,
    longitude: -0.1164075624320158,
  });

  const adaptiveOpacity = useRef(new Animated.Value(0)).current;

  const checkForFirstTime = async () => {
    const result = await AsyncStorage.getItem('isFirstTime');
    //if what we get from the Async is null we are opening the app for the first time
    //if we pressed the sign up button on the last slide we set the 'isFirstTime' to 'no'
    if (result === null) {
      setIsFirstTime(true);
    } //now we can use the isFirstTimeLoad state to choose what to render
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateDistance = coords => {

    const R = 6371e3; // metres
    const latitude1 = (currentCenterLocation.latitude * Math.PI) / 180; // φ, λ in radians
    const latitude2 = (coords.latitude * Math.PI) / 180;
    const diffLat =
        ((coords.latitude - currentCenterLocation.latitude) * Math.PI) / 180;
    const diffLon =
        ((coords.longitude - currentCenterLocation.longitude) * Math.PI) / 180;

    const aa =
        Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
        Math.cos(latitude1) *
        Math.cos(latitude2) *
        Math.sin(diffLon / 2) *
        Math.sin(diffLon / 2);
    const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));

  // in metres
    return parseInt(R * cc);
  };


  useEffect(() => {
    checkForFirstTime();
  }, []);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
        setUser();
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const enterApp = () => {
    setIsFirstTime(false);
    AsyncStorage.setItem('isFirstTime', 'potatoesInPower');
  };

  function clearBasket() {
    setBasketContent([]);
    setBasketSize(0);
    setTotal(0);
  }

  // When coming from the shop list
  function newShop({shop, navigation}) {
    clearBasket();
    setCurrShop(shop);
    navigation.navigate('Shop page');
  }

  // When coming from the markers
  function switchNewShop({shop}) {
    clearBasket();
    setCurrShop(shop);
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userRef)
      .onSnapshot(documentSnapshot => {
        setUserObj(documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userRef]);

  async function setUser() {
    if (currentUser) {
      await firestore()
        .collection('Users')
        .where('authID', '==', currentUser.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
            setUserRef(documentSnapshot.id);
          });
        });
    }
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

  function switchShop(shop) {
    if (currShop !== shop && basketSize !== 0) {
      Alert.alert(
        'Are you sure ?',
        'Changing shops will clear your basket.',
        [
          {
            text: 'Yes',
            onPress: () => switchNewShop({shop}),
          },
          {
            text: 'No',
            onPress: () => setIsShopIntro(true),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
    } else {
      setCurrShop(shop);
      if (!isShopIntro) setIsShopIntro(true);
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
              .onSnapshot(query => {
                let collection = '';
                if (itemRef.path.includes('Coffees')) {
                  collection = coffees;
                } else if (itemRef.path.includes('Drinks')) {
                  collection = drinks;
                } else {
                  collection = snacks;
                }
                collection.push({
                  ...query.data(),
                  key: query.id,
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
          let mark = markers;
          mark.push({
            name: shopData.Name,
            description: shopData.Intro,
            coords: {
              latitude: shopData.Location._latitude,
              longitude: shopData.Location._longitude,
            },
            image: shopData.Image,
            isOpen: shopData.IsOpen,
          });
          setMarkers(mark);

          const editedShopsData = shops.map(item => {
            return {
              Name: item.Name,
              Intro: item.Intro,
              Location: {
                latitude: item.Location._latitude,
                longitude: item.Location._longitude,
              },
              Image: item.Image,
              Email: item.Email,
              IsOpen: item.isOpen,
              ItemsOffered: item.ItemsOffered,
              Likeness: item.Likeness,
              Queue: item.Queue,
              key: item.key,
              DistanceTo: calculateDistance(item.Location),
            };
          });

          //ordering the shops based on distance from user location
          editedShopsData
              .sort((a, b) => a.DistanceTo - b.DistanceTo);

          //filtering the shops based on radius limitation (rn 1500)
          const newEdited = editedShopsData
              .filter((item) => item.DistanceTo < 1500);

          setOrderedShops(newEdited);
        });

      }, []);

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  function isSameItem(it, currIt) {
    if (currIt.hasOwnProperty('Bean') && it.hasOwnProperty('Bean')) {
      let itOptions = '';
      it.options.forEach(option => (itOptions += option.Name));
      let currItOptions = '';
      currIt.options.forEach(option => (currItOptions += option.Name));
      return it.key === currIt.key && itOptions === currItOptions;
    } else {
      return it.key === currIt.key;
    }
  }

  function addToBasket(item) {
    const basket = basketContent;
    const exist = basket.find(x => isSameItem(x, item));
    let type;
    if (item.hasOwnProperty('Bean')){
      type = 'Coffee';
    } else if (
      currShop.ItemsOffered.Drinks.filter(x => x.Name === item.Name).length !== 0
    ) {
      type = 'Drink';
    } else {
      type = 'Snack';
    }
    if (exist) {
      setBasketContent(
        basket.map(x =>
          isSameItem(x, item) ? {...exist, count: exist.count + 1} : x,
        ),
      );
    } else {
      setBasketContent([...basket, {...item, count: 1, type: type}]);
    }
    setTotal(total + item.Price);
    setBasketSize(basketSize + 1);
  }

  function removeFromBasket(item) {
    const basket = basketContent;
    const exist = basket.find(x => isSameItem(x, item));
    if (exist.count === 1) {
      setBasketContent(basket.filter(x => x.key !== item.key));
    } else {
      setBasketContent(
        basket.map(x =>
          isSameItem(x, item) ? {...exist, count: exist.count - 1} : x,
        ),
      );
    }
    setTotal(total - item.Price);
    setBasketSize(basketSize - 1);
  }

  const setShopIntro = shown => {
    setIsShopIntro(shown);
  };



  const Stack = createNativeStackNavigator();
  return (
    <GlobalContext.Provider
      value={{
        enterApp: enterApp,
        user: currentUser, // Returns the authentication object
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
        switchShop: switchShop,
        currentCenterLocation: currentCenterLocation,
        setCurrentCenterLocation: setCurrentCenterLocation,
        adaptiveOpacity: adaptiveOpacity,
        markers: markers,
        clearBasket: clearBasket,
        currentUser: userObj, // Returns the model object
        userRef: userRef, // Returns ID of the model object
        orderedShops: orderedShops,
        setOrderedShops: setOrderedShops,
      }}
    >
      <NavigationContainer>
        {isLoggedIn ? (
          <HamburgerSlideBarNavigator />
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
