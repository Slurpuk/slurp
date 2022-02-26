import React, {useContext, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  LogBox,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import renderers from '../renderers';
import ShopPage from '../components/Shops/ShopPage';
import shopData from '../fake-data/ShopData';
import ItemsData from '../fake-data/ItemsData';
import MapBackground from '../components/LandingMap/MapBackground';
import ShopsData from '../fake-data/ShopsData';
import ShopList from '../components/Shops/ShopList';
import OptionsPopUp from '../components/ShopMenu/OptionsPopUp';
import CoffeeOptionsData from '../fake-data/CoffeeOptionsData';
import {BlurView} from '@react-native-community/blur';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export const OptionsContext = React.createContext();
export default function LandingMapPage({navigation}) {
  const bottomSheetRef = useRef(null);
  const setVisible = useContext(VisibleContext);
  const [isShopIntro, setIsShopIntro] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const defaultShopData = ShopsData[1];
  const [currShop, setCurrShop] = useState(defaultShopData);

  const updatePage = ({index}) => {
    if (index === 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const setLOL = () => {
    setIsShopIntro(!isShopIntro);
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
        <OptionsContext.Provider
          value={{
            optionsVisible: optionsVisible,
            setOptionsVisible: setOptionsVisible,
            setCurrItem: setCurrItem,
            currShop: currShop,
            setCurrShop: setCurrShop,
            isShopIntro: isShopIntro,
            bottomSheetRef: bottomSheetRef,
          }}
        >
          <ScrollBottomSheet
            componentType="FlatList"
            ref={bottomSheetRef}
            snapPoints={['0%', '70%', '100%']}
            onSettle={index => updatePage({index})}
            initialSnapIndex={1}
            enableOverScroll={false}
            renderHandle={() => (
              <View>
                <TouchableWithoutFeedback
                  onPressIn={() => setOptionsVisible(false)}
                >
                  <View style={[styles.header1]}>
                    <ShopPage navigation={navigation} shop={currShop} />
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
            )}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </OptionsContext.Provider>
      ) : null}
      {isShopIntro === false ? (
        <OptionsContext.Provider
          value={{
            optionsVisible: optionsVisible,
            setOptionsVisible: setOptionsVisible,
            setCurrItem: setCurrItem,
            currShop: currShop,
            setCurrShop: setCurrShop,
            isShopIntro: isShopIntro,
            bottomSheetRef: bottomSheetRef,
          }}
        >
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
        </OptionsContext.Provider>
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

  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 20,
  },
});
