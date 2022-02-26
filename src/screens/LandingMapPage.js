import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  LogBox,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import renderers from '../renderers';
import ShopPage from '../components/Shops/ShopPage';
import ItemsData from '../fake-data/ItemsData';
import MapBackground from '../components/LandingMap/MapBackground';
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
import ShopsData from '../fake-data/ShopsData';
import OptionsPopUp from '../components/ShopMenu/OptionsPopUp';
import CoffeeOptionsData from '../fake-data/CoffeeOptionsData';
import {BlurView} from '@react-native-community/blur';
import {FlatList} from 'react-native-gesture-handler';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export const OptionsContext = React.createContext();
export default function LandingMapPage({setVisible}) {
  const [isShopIntro, setIsShopIntro] = useState(false);

  const [ShopsData, setShopsData] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
        .collection('CoffeeShop')
        .onSnapshot(querySnapshot => {
          const shops = []

          querySnapshot.forEach(documentSnapshot => {
            shops.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });

          setShopsData(shops);
        });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  const [optionsVisible, setOptionsVisible] = useState(false);
  const [currItem, setCurrItem] = useState(null);


  const updatePage = ({index}) => {
    if (index === 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const defaultShopData = ShopsData[0];

  const setLOL = () => {
    setIsShopIntro(!isShopIntro);
  };

  const setHidden = () => {
    setOptionsVisible(false);
  };

  return (
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
          snapPoints={['0%', '70%', '100%']}
          onSettle={index => updatePage({index})}
          initialSnapIndex={1}
          enableOverScroll={false}
          renderHandle={() => (
            <View style={styles.header1}>
              <ShopPage
                shopName={defaultShopData.Name}
                shopIntroText={defaultShopData.Intro}
                DATA={ItemsData}
                renderSection={renderers.renderMenuSection}
                renderItem={renderers.renderItemCard}
              />
            </View>
            <OptionsContext.Provider
              value={{
                optionsVisible: optionsVisible,
                setOptionsVisible: setOptionsVisible,
                setCurrItem: setCurrItem,
              }}
            >
              <View>
                <TouchableWithoutFeedback
                  onPressIn={() => setOptionsVisible(false)}
                >
                  <View style={[styles.header1]}>
                    <ShopPage
                      shopName={defaultShopData.name}
                      shopIntroText={defaultShopData.intro}
                      DATA={ItemsData}
                      renderSection={renderers.renderMenuSection}
                      renderItem={renderers.renderItemCard}
                    />

                    {optionsVisible ? (
                      <BlurView
                        style={styles.absolute}
                        blurType="dark"
                        blurAmount={2}
                        reducedTransparencyFallbackColor="white"
                      />
                    ) : null}
                  </View>
                </TouchableWithoutFeedback>
                {optionsVisible ? (
                  <OptionsPopUp
                    data={CoffeeOptionsData}
                    curr_price={currItem.price}
                    product_name={currItem.name}
                    renderer={renderers.renderOption}
                  />
                ) : null}
              </View>
            </OptionsContext.Provider>
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
            </View>
          )}
          data={ShopsData}
          keyExtractor={item => item.key}
          renderItem={renderers.renderShopCard}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : null}
    </View>
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

  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 20,
  },
});
