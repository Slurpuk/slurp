import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  LogBox,
  TextInput,
} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import ShopPage from '../components/Shops/ShopPage';
import MapBackground from '../components/LandingMap/MapBackground';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import ShopList from '../components/Shops/ShopList';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import {useFocusEffect} from '@react-navigation/native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export const OptionsContext = React.createContext();

// well...

export default function LandingMapPage({navigation}) {
  const setVisible = useContext(VisibleContext);
  const [shopsData, setShopsData] = useState([]);
  const bottomSheetRef = useRef(null);
  const [currRef, setCurrRef] = useState(bottomSheetRef.current);
  const [isShopIntro, setIsShopIntro] = useState(false);
  const [currShop, setCurrShop] = useState(shopsData[0]);

  useFocusEffect(
    React.useCallback(() => {
      setVisible(true);

      return () => {
        setVisible(false);
      };
    }, []),
  );

  useEffect(() => {
    const subscriber = firestore()
      .collection('CoffeeShop')
      .onSnapshot(querySnapshot => {
        const shops = [];

        querySnapshot.forEach(documentSnapshot => {

          let shopData = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          }

          let items = []
          documentSnapshot.data().ItemsOffered.forEach(itemRef => {
            firestore().doc(itemRef.path).onSnapshot(querySnapshot => {
              items.push({
                ...querySnapshot.data(),
                key: querySnapshot.id,
              })
              shopData.ItemsOffered = items
            })
          })
          shops.push(shopData);
          setShopsData(shops);
          setCurrShop(shops[0]);
        });
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  console.log(shopsData)


  const updatePage = ({index}) => {
    if (index === 0) {
      setVisible(false);
      setCurrRef(bottomSheetRef.current);
    } else {
      setVisible(true);
    }
  };

  const setLOL = () => {
    setIsShopIntro(!isShopIntro);
  };

  return (
    <OptionsContext.Provider
      value={{
        currShop: currShop,
        setCurrShop: setCurrShop,
        isShopIntro: isShopIntro,
        currRef: currRef,
        shopsData: shopsData,
      }}
    >
      <View style={styles.container}>
        <View style={styles.map}>
          <MapBackground />
          <View style={{margin: '10%'}}>
            <Button title={'Switch bottom sheet'} onPress={setLOL} />
          </View>

          <TextInput
            style={{
              borderRadius: 10,
              margin: 10,
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
        </View>
        {isShopIntro ? (
          <ScrollBottomSheet
            componentType="FlatList"
            ref={bottomSheetRef}
            snapPoints={['0%', '70%', '100%']}
            onSettle={index => updatePage({index})}
            initialSnapIndex={1}
            enableOverScroll={false}
            renderHandle={() => (
              <ShopPage navigation={navigation} shop={currShop} />
            )}
            contentContainerStyle={styles.contentContainerStyle}
          />
        ) : null}
        {isShopIntro === false ? (
          <ScrollBottomSheet
            componentType="FlatList"
            snapPoints={['20%', '91.5%']}
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
    </OptionsContext.Provider>
  );
}

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: '#EDEBE7',
  },
  header1: {
    height: windowHeight,
    position: 'relative',
    width: '100%',
    left: 0,
    top: 0,
  },
  header2: {
    alignItems: 'center',
    backgroundColor: '#EDEBE7',
    paddingVertical: '3%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'visible',
    height: 600,
  },
  panelHandle: {
    width: '10%',
    height: '7%',
    backgroundColor: 'green',
    borderRadius: 4,
    position: 'absolute',
    top: '15%',
  },
  headerText: {
    padding: '2%',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  map: {
    flex: 1,
  },
  //
  // absolute: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   bottom: 0,
  //   right: 0,
  //   borderRadius: 20,
  // },
});
