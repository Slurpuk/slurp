import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import renderers from '../renderers';
import {GlobalContext} from './LandingMapPage';
import {BlurView} from '@react-native-community/blur';
import OptionsPopUp from '../components/ShopMenu/OptionsPopUp';
import CoffeeOptionsData from '../fake-data/CoffeeOptionsData';
import DraggableShopPage from '../components/Shops/DraggableShopPage';
import NonDraggableShopPage from '../components/Shops/NonDraggableShopPage';

export const ShopContext = React.createContext();
const ShopPage = ({navigation, route}) => {
  const defaultContext = useContext(GlobalContext);
  const context = route === undefined ? defaultContext : route.params;
  const shop = context.currShop;
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [basketContent, setBasketContent] = useState([]);
  const [basketSize, setBasketSize] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setMenuData(filterData());
  }, [context.currShop]);

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
    setTotal(total + item.Price);
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

  function filterData() {
    let data = [
      {title: 'Coffees', list: [], key: 1},
      {title: 'Drinks', list: [], key: 2},
      {title: 'Snacks', list: [], key: 3},
    ];
    const items = shop.ItemsOffered;
    data[0].list = items.Coffees;
    data[1].list = items.Drinks;
    data[2].list = items.Snacks;
    return data;
  }

  function getCoffees() {
    return filterData()[0].list;
  }
  function getDrinks() {
    return filterData()[1].list;
  }
  function getSnacks() {
    return filterData()[2].list;
  }

  return (
    <ShopContext.Provider
      value={{
        setOptionsVisible: setOptionsVisible,
        setCurrItem: setCurrItem,
        shop: shop,
        navigation: navigation,
        setShopIntro: context.setShopIntro,
        isShopIntro: context.isShopIntro,
        getCoffees: getCoffees,
        getSnacks: getSnacks,
        getDrinks: getDrinks,
        isFullScreen: context.isFullScreen,
        setFullScreen: context.setFullScreen,
      }}>
      <TouchableWithoutFeedback onPressIn={() => setOptionsVisible(false)}>
        <>
          {context.isShopIntro ? (
            <DraggableShopPage shop={shop} />
          ) : (
            <NonDraggableShopPage shop={shop} />
          )}
          {optionsVisible ? (
            <BlurView
              style={styles.absolute}
              blurType="dark"
              blurAmount={2}
              reducedTransparencyFallbackColor="white"
            />
          ) : null}
        </>
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
