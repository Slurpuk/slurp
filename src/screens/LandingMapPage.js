import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Button,
  LogBox,
  TextInput,
  StatusBar,
} from 'react-native';
import MapBackground from '../components/LandingMap/MapBackground';
import firestore from '@react-native-firebase/firestore';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import {useFocusEffect} from '@react-navigation/native';
import DraggableShopPage from '../components/Shops/DraggableShopPage';
import DraggableShopList from '../components/Shops/DraggableShopList';
import ShopPage from './ShopPage';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export const GlobalContext = React.createContext();

export default function LandingMapPage({navigation}) {
  const setHamburgerVisible = useContext(VisibleContext);
  const [shopsData, setShopsData] = useState([]);
  const [isShopIntro, setIsShopIntro] = useState(false);
  const [currShop, setCurrShop] = useState(shopsData[0]);
  const [isFullScreen, setFullScreen] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setHamburgerVisible(true);

      return () => {
        setHamburgerVisible(false);
      };
    }, []),
  );

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

          let items = [];
          documentSnapshot.data().ItemsOffered.forEach(itemRef => {
            firestore()
              .doc(itemRef.path)
              .onSnapshot(query => {
                items.push({
                  ...query.data(),
                  key: query.id,
                });
                shopData.ItemsOffered = items;
              });
          });
          shops.push(shopData);
          setShopsData(shops);
          setCurrShop(shops[0]);
        });
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const setShopIntro = () => {
    setIsShopIntro(!isShopIntro);
  };

  return (
    <GlobalContext.Provider
      value={{
        currShop: currShop,
        setCurrShop: setCurrShop,
        isShopIntro: isShopIntro,
        shopsData: shopsData,
        setShopIntro: setShopIntro,
        isFullScreen: isFullScreen,
        setFullScreen: setFullScreen,
      }}
    >
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.map}>
          <MapBackground />
          <TextInput
            style={styles.searchBar}
            placeholder={'Search Location'}
            placeholderTextColor={'#666'}
          />
          <Button title={'Switch bottom sheet'} onPress={setShopIntro} />
        </View>

        {isShopIntro ? (
          <ShopPage />
        ) : (
          <DraggableShopList navigation={navigation} />
        )}
      </View>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    borderRadius: 10,
    marginTop: '15%',
    margin: '5%',
    color: '#000',
    borderColor: '#666',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: screenHeight / 19,
    width: screenWidth / 1.4,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
