import React, {useContext, useMemo, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import renderers from '../components/ShopMenu/renderers';
import {BlurView} from '@react-native-community/blur';
import OptionsPopUp from '../components/ShopMenu/OptionsPopUp';
import DraggableShopPage from '../components/Shops/DraggableShopPage';
import NonDraggableShopPage from '../components/Shops/NonDraggableShopPage';
import {GlobalContext} from '../contexts';

export const ShopContext = React.createContext();

/**
 * Display a draggable or non-draggable shop page.
 * @param navigation The navigation object.
 */
const ShopPage = ({navigation}) => {
  const {globalState} = useContext(GlobalContext);
  const [optionsVisible, setOptionsVisible] = useState(false); // Is the options popup visible
  const [currItem, setCurrItem] = useState(null); // Current item displayed in the shop.

  /**
   * Hook that divides the items offered by the shop into 3 sections: coffees, drinks and snacks and memoizes it.
   * Formats the data before passing it to the flatlists.
   * @return Array The formatted menu data
   */
  const menuData = useMemo(() => {
    let data = [
      {title: 'Coffees', list: [], key: 1},
      {title: 'Drinks', list: [], key: 2},
      {title: 'Snacks', list: [], key: 3},
    ];
    const items = globalState.currentShop.items;
    data[0].list = items.coffees;
    data[1].list = items.drinks;
    data[2].list = items.snacks;
    return data;
  }, [globalState.currentShop.items]);

  /**
   * Get the default milk
   * @return Object The default milk
   */
  function getDefaultMilk() {
    return globalState.currentShop.options[0].data.find(
      el => el.name === 'Dairy',
    );
  }

  return (
    <ShopContext.Provider
      value={{
        setOptionsVisible: setOptionsVisible,
        setCurrItem: setCurrItem,
        menuData: {
          coffees: menuData[0].list,
          drinks: menuData[1].list,
          snacks: menuData[2].list,
          defaultMilk: getDefaultMilk(),
        },
      }}>
      <TouchableWithoutFeedback onPressIn={() => setOptionsVisible(false)}>
        <>
          {globalState.isShopIntro ? (
            <DraggableShopPage
              shop={globalState.currentShop}
              navigation={navigation}
            />
          ) : (
            <NonDraggableShopPage
              shop={globalState.currentShop}
              navigation={navigation}
            />
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
          data={globalState.currentShop.options}
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
