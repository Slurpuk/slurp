import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Menu from '../components/ShopMenu/Menu';
import renderers from '../renderers';
import {OptionsContext} from './LandingMapPage';
import {BlurView} from '@react-native-community/blur';
import OptionsPopUp from '../components/ShopMenu/OptionsPopUp';
import CoffeeOptionsData from '../fake-data/CoffeeOptionsData';
import ShopIntro from '../components/Shops/ShopIntro';

export const ShopContext = React.createContext();
const ShopPage = ({navigation, route}) => {
  const defaultContext = useContext(OptionsContext);
  const context = route === undefined ? defaultContext : route.params;
  const shop = context.currShop;
  const [menuData, setMenuData] = useState(null);
  // let MENUDATA = shop.ItemsOffered;
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [currItem, setCurrItem] = useState(null);

  useEffect(() => {
    setMenuData(filterData());
  }, [context.currShop]);

  function filterData() {
    let data = [
      {title: 'Coffee', data: [{key: 'Coffees', list: []}], key: 1},
      {title: 'Drinks', data: [{key: 'Cold Drinks', list: []}], key: 2},
      {title: 'Snacks', data: [{key: 'Snacks', list: []}], key: 3},
    ];
    shop.ItemsOffered.forEach(item => {
      data[0].data[0].list.push(item);
    });
    return data;
  }

  function getMenuData() {
    return menuData === null ? filterData() : menuData;
  }

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
            DATA={getMenuData()}
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
          item={currItem}
          renderer={renderers.renderOption}
        />
      ) : null}
    </ShopContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
    width: '100%',
    position: 'relative',
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
