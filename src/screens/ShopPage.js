import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import renderers from '../renderers';

import {BlurView} from '@react-native-community/blur';
import OptionsPopUp from '../components/ShopMenu/OptionsPopUp';
import DraggableShopPage from '../components/Shops/DraggableShopPage';
import NonDraggableShopPage from '../components/Shops/NonDraggableShopPage';
import {GlobalContext} from '../../App';
import firestore from '@react-native-firebase/firestore';

export const ShopContext = React.createContext();
const ShopPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const shop = context.currShop;
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [currItem, setCurrItem] = useState(null);
  const [options, setOptions] = useState([]);

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

  // Retrieves the options data from firebase
  async function getOptions() {
    let initial = [
      {title: 'Select Milk', data: []},
      {title: 'Add Syrup', data: []},
    ];
    let dairy;
    await firestore()
      .collection('Options')
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(documentSnapshot => {
          let option = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
          let index = 0;
          option.Type === 'Syrup' ? (index = 1) : (index = 0);
          if (option.Name === 'Dairy') {
            dairy = option;
          } else {
            initial[index].data.push(option);
          }
        });
        initial[1].data.sort((a, b) => a.Name.localeCompare(b.Name));
        initial[0].data.sort((a, b) => a.Name.localeCompare(b.Name));
        initial[0].data.unshift(dairy);
        setOptions(initial);
      });
  }

  // Get the options on first render.
  useEffect(() => {
    getOptions();
  }, []);

  function getDefaultMilk() {
    let def = options[0].data.find(el => el.Name === 'Dairy');
    return def;
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
        getDefault: getDefaultMilk,
        isFullScreen: context.isFullScreen,
        setFullScreen: context.setFullScreen,
      }}>
      <TouchableWithoutFeedback onPressIn={() => setOptionsVisible(false)}>
        <>
          {context.isShopIntro ? (
            <DraggableShopPage
              shop={shop}
              navigation={navigation}
            />
          ) : (
            <NonDraggableShopPage shop={shop} navigation={navigation} />
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
          data={options}
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
