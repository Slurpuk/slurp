import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  LogBox,
  TextInput,
  StatusBar,
  Platform,
} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import ShopPage from './ShopPage';
import MapBackground from '../components/LandingMap/MapBackground';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import ShopList from '../components/Shops/ShopList';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import {useFocusEffect} from '@react-navigation/native';
import ShopIntro from '../components/Shops/ShopIntro';
import Menu from '../components/ShopMenu/Menu';
import renderers from '../renderers';
import textStyles from '../../stylesheets/textStyles';
import DraggableShopPage from '../components/Shops/DraggableShopPage';
import Shit from '../components/Shops/Shit';

// Height to render the ScrollBottomSheet in its retracted position.
// Different on android due to bottom icon bar being considered part of the screen
const RAISED_MAP_POSITION_IOS = '90.5%';
const RAISED_MAP_POSITION_ANDROID = '98%';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export const GlobalContext = React.createContext();

// well...

export default function LandingMapPage({navigation}) {
  const setVisible = useContext(VisibleContext);
  const [shopsData, setShopsData] = useState([]);
  const [isShopIntro, setIsShopIntro] = useState(false);
  const [currShop, setCurrShop] = useState(shopsData[0]);
  const [isFullScreen, setFullScreen] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setVisible(true);

      return () => {
        setVisible(false);
      };
    }, []),
  );

  function filterData() {
    let data = [
      {title: 'Coffees', data: [{key: 'Coffees', list: []}], key: 1},
      {title: 'Drinks', data: [{key: 'Cold Drinks', list: []}], key: 2},
      {title: 'Snacks', data: [{key: 'Snacks', list: []}], key: 3},
    ];
    currShop.ItemsOffered.forEach(item => {
      data[0].data[0].list.push(item);
    });
    return data;
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

  const setLOL = () => {
    setIsShopIntro(!isShopIntro);
  };

  return (
    <GlobalContext.Provider
      value={{
        currShop: currShop,
        setCurrShop: setCurrShop,
        isShopIntro: isShopIntro,
        shopsData: shopsData,
        isFullScreen: isFullScreen,
      }}>
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.map}>
          <MapBackground />
          <TextInput
            style={{
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
            }}
            placeholder={'Search Location'}
            placeholderTextColor={'#666'}
          />
          <Button title={'Switch bottom sheet'} onPress={setLOL} />
        </View>
        {isShopIntro ? <Shit /> : null}
        {isShopIntro === false ? (
          <ScrollBottomSheet
            componentType="FlatList"
            snapPoints={[
              '15%',
              Platform.OS === 'ios'
                ? RAISED_MAP_POSITION_IOS
                : RAISED_MAP_POSITION_ANDROID,
            ]}
            initialSnapIndex={1}
            renderHandle={() => (
              <View style={styles.header2}>
                <View style={styles.panelHandle} />
                <Text style={styles.headerText}>Top Picks Nearby</Text>
                <ShopList navigation={navigation} />
              </View>
            )}
            contentContainerStyle={styles.contentContainerStyle}
          />
        ) : null}
      </View>
    </GlobalContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    display: 'flex',
    minHeight: '100%',
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  contentContainerStyle: {
    backgroundColor: '#EDEBE7',
  },
  roundedCorners: {
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
  },

  header2: {
    alignItems: 'center',
    backgroundColor: '#EDEBE7',
    paddingVertical: '3%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'visible',
    height: '100%',
  },
  header1: {
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '30%',
  },
  panelHandle: {
    width: '10%',
    height: 5,
    backgroundColor: '#046D66',
    borderRadius: 4,
    position: 'absolute',
    top: '2%',
    zIndex: 2,
    left: '45%',
  },

  white: {
    backgroundColor: 'white',
  },
  headerText: {
    padding: '4%',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  map: {
    flex: 1,
  },
});
