import CoffeeOptionsData from './fake-data/CoffeeOptionsData';
import ItemsData from './fake-data/ItemsData';
import shopData from './fake-data/shopData';
import renderers from './renderers';
import React from 'react';
import OptionsPopUp from './components/ShopMenu/OptionsPopUp';
import {StyleSheet, View} from 'react-native';
import Menu from './components/ShopMenu/Menu';
import ShopList from './components/Shops/ShopList';
import ShopsData from './fake-data/ShopsData';
import ShopIntro from './components/shopIntro';
import ShopData from './fake-data/shopData';
import ShopPage from './components/shopPage';

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

const ShopListTester = () => {
  return <ShopList DATA={ShopsData} renderItem={renderers.renderShopCard} />;
};
const ShopPageTester = () => {
  const defaultShopData = shopData[0];
  return (
    <ShopPage
      shopName={defaultShopData.name}
      shopIntroText={defaultShopData.intro}
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

export default {MenuTester, OptionPopUpTester, ShopPageTester, ShopListTester};
