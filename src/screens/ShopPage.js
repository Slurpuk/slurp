import React, {useContext, useMemo, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import renderers from '../renderers';
import {BlurView} from '@react-native-community/blur';
import OptionsPopUp from '../components/ShopMenu/OptionsPopUp';
import DraggableShopPage from '../components/Shops/DraggableShopPage';
import NonDraggableShopPage from '../components/Shops/NonDraggableShopPage';
import {GlobalContext} from '../../App';

export const ShopContext = React.createContext();

/**
 * Display a draggable or non-draggable shop page.
 * @param navigation The navigation object.
 */
const ShopPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const shop = context.currShop;
  const [optionsVisible, setOptionsVisible] = useState(false); // Is the options popup visible
  const [currItem, setCurrItem] = useState(null); // Current item displayed in the shop.

  /**
   * Hook that divides the items offered by the shop into 3 sections: coffees, drinks and snacks and memoizes it.
   * Formats the data before passing it to the flatlists.
   * @return The formatted menu data
   */
  const menuData = useMemo(() => {
    let data = [
      {title: 'Coffees', list: [], key: 1},
      {title: 'Drinks', list: [], key: 2},
      {title: 'Snacks', list: [], key: 3},
    ];
    const items = shop.items;
    data[0].list = items.coffees;
    data[1].list = items.drinks;
    data[2].list = items.snacks;
    return data;
  }, [shop.items]);

  /**
   * Get the default milk
   * @return Object The default milk
   */
  function getDefaultMilk() {
    return shop.options[0].data.find(el => el.name === 'Dairy');
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
      }}
    >
      <TouchableWithoutFeedback onPressIn={() => setOptionsVisible(false)}>
        <>
          {context.bottomSheet.isOpen ? (
            <DraggableShopPage shop={shop} navigation={navigation} />
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
          data={shop.options}
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
