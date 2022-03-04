import React, {useContext, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Menu from '../ShopMenu/Menu';
import ItemsData from '../../fake-data/ItemsData';
import renderers from '../../renderers';
import {OptionsContext} from '../../screens/LandingMapPage';
import {BlurView} from '@react-native-community/blur';
import OptionsPopUp from '../ShopMenu/OptionsPopUp';
import CoffeeOptionsData from '../../fake-data/CoffeeOptionsData';
import ShopIntro from './ShopIntro';

export const ShopContext = React.createContext();
const ShopPage = ({navigation, route}) => {
  const MENUDATA = ItemsData;
  const defaultContext = useContext(OptionsContext);
  const context = route === undefined ? defaultContext : route.params;
  const shop = context.currShop;
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [currItem, setCurrItem] = useState(null);

  return (
    <ShopContext.Provider
      value={{
        setOptionsVisible: setOptionsVisible,
        setCurrItem: setCurrItem,
        shop: shop,
        navigation: navigation,
        currRef: context.currRef,
        isShopIntro: context.isShopIntro,
        isFullScreen: context.isFullScreen,
      }}
    >
      <TouchableWithoutFeedback onPressIn={() => setOptionsVisible(false)}>
        <View style={styles.container}>
          <ShopIntro
            likeness={shop.Likeness}
            timeToOrder={shop.Queue}
            shopName={shop.Name}
            shopIntroText={shop.Intro}
          />
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
    width: '100%',
    position: 'relative',
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    backgroundColor: '#36363677',
    height: '100%',
  },

  back_button: {
    top: 30,
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
