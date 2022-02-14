import CoffeeOptionsData from './fake-data/CoffeeOptionsData';
import ItemsData from './fake-data/ItemsData';
import renderers from './renderers';
import React from 'react';
import OptionsPopUp from './components/ShopMenu/OptionsPopUp';
import {StyleSheet, View} from 'react-native';
import Menu from './components/ShopMenu/Menu';
import PaymentCardsPage from "./screens/PaymentCardsPage";

const OptionPopUpTester = () => {
  return (
    <View style={styles.container}>
      <OptionsPopUp
        data={CoffeeOptionsData}
        curr_price={340}
        product_name={'Cappuccino'}
        renderer={renderers.renderOption}
      />
    </View>
  );
};

const MenuTester = () => {
  return (
    <Menu
      DATA={ItemsData}
      renderSection={renderers.renderMenuSection}
      renderItem={renderers.renderItemCard}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default {MenuTester, OptionPopUpTester};
