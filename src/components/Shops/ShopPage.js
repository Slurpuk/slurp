import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Menu from '../ShopMenu/Menu';
import {SharedElement} from 'react-native-shared-element';
import renderers from '../../renderers';
import ShopDetailIcons from './ShopDetailIcons';
import textStyles from '../../../stylesheets/textStyles';
import WhiteArrowButton from '../../sub-components/WhiteArrowButton';
import {OptionsContext} from '../../screens/LandingMapPage';
import {BlurView} from '@react-native-community/blur';
import OptionsPopUp from '../ShopMenu/OptionsPopUp';
import CoffeeOptionsData from '../../fake-data/CoffeeOptionsData';

export const ShopContext = React.createContext();
const ShopPage = ({navigation, route}) => {
  const defaultContext = useContext(OptionsContext);
  const context = route === undefined ? defaultContext : route.params;
  const shop = context.currShop;
  let MENUDATA = context.currShop.ItemsOffered;
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [currItem, setCurrItem] = useState(null);

  filterData();

  function filterData() {
    let data = [
      {title: 'Coffee', data: [{key: 'Coffees', list: []}], key: 1},
      {title: 'Drinks', data: [{key: 'Cold Drinks', list: []}], key: 2},
      {title: 'Snacks', data: [{key: 'Snacks', list: []}], key: 3},
    ];
    context.currShop.ItemsOffered.forEach(item => {
      data[0].data[0].list.push(item);
    });
    MENUDATA = data;
  }

  return (
    <ShopContext.Provider
      value={{setOptionsVisible: setOptionsVisible, setCurrItem: setCurrItem}}
    >
      <TouchableWithoutFeedback onPressIn={() => setOptionsVisible(false)}>
        <View style={styles.container}>
          <View
            style={{maxHeight: '35%', minHeight: '30%', position: 'relative'}}
          >
            <SharedElement id={`shop.id}`}>
              <Image
                style={styles.cardImgs}
                source={{uri: shop.Image}}
                resizeMode="cover"
              />
            </SharedElement>

            <SharedElement id={`shop.id`}>
              <Text style={[textStyles.headingOne, styles.cardHeading]}>
                {shop.Name}
              </Text>
            </SharedElement>

            <SharedElement id={`shop.id`}>
              <ShopDetailIcons
                style={styles.details}
                likeness={shop.Likeness}
                timeToOrder={shop.Queue}
              />
            </SharedElement>
            <View>
              <WhiteArrowButton
                style={styles.back_button}
                direction={context.isShopIntro ? 'down' : 'left'}
                navigation={navigation}
                onPressAction={context.isShopIntro ? context.currRef : null}
              />
            </View>
          </View>
          <Menu
            DATA={MENUDATA}
            renderItem={renderers.renderMenuItem}
            renderSection={renderers.renderMenuSection}
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
    </ShopContext.Provider>
  );
};
const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
    position: 'relative',
    // maxHeight: '35%',
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    backgroundColor: '#36363677',
    height: '100%',
  },
  cardImgs: {
    position: 'absolute',
    width: screenWidth,
    height: screenWidth * 0.7,
    left: 0,
  },
  back_button: {
    top: 30,
  },

  cardHeading: {
    position: 'absolute',
    width: '100%',
    top: 80,
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
export default ShopPage;
