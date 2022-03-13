import React, {useContext, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Menu from '../ShopMenu/Menu';
import renderers from '../../renderers';
import {OptionsContext} from '../../screens/LandingMapPage';
import {BlurView} from '@react-native-community/blur';
import OptionsPopUp from '../ShopMenu/OptionsPopUp';
import CoffeeOptionsData from '../../fake-data/CoffeeOptionsData';
import ShopIntro from './ShopIntro';

export const ShopContext = React.createContext();
const ShopPage = ({navigation, route}) => {
  const defaultContext = useContext(OptionsContext);
  const context = route === undefined ? defaultContext : route.params;
  const shop = context.currShop;
  let MENUDATA = context.currShop.ItemsOffered;
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [basketContent, setBasketContent] = useState([]);
  const [basketSize, setBasketSize] = useState(0);
  const [total, setTotal] = useState(0);

  // function getTotalPrice() {
  //   return context.basketContent.reduce(
  //     (totalCost, {Price: itemPrice, count: itemCount}) =>
  //       totalCost + parseFloat(itemPrice * itemCount),
  //     0,
  //   );
  // }

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

  filterData();

  function filterData() {
    let data = [
      {title: 'Coffees', data: [{key: 'Coffees', list: []}], key: 1},
      {title: 'Drinks', data: [{key: 'Drinks', list: []}], key: 2},
      {title: 'Snacks', data: [{key: 'Snacks', list: []}], key: 3},
    ];
    const items = context.currShop.ItemsOffered;
    data[0].data[0].list = items.Coffees;
    data[1].data[0].list = items.Drinks;
    data[2].data[0].list = items.Snacks;
    MENUDATA = data;
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
        setBasketContent: setBasketContent,
        basketContent: basketContent,
        basketSize: basketSize,
        total: total,
        setTotal: setTotal,
        addToBasket: addToBasket,
        removeFromBasket: removeFromBasket,
      }}>
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
            navigation={navigation}
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
