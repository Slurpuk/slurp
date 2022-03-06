import CoffeeOptionsData from './fake-data/CoffeeOptionsData';
import ItemsData from './fake-data/ItemsData';
import renderers from './renderers';
import React from 'react';
import OptionsPopUp from './components/ShopMenu/OptionsPopUp';
import {StyleSheet, View, Text} from 'react-native';
import Menu from './components/ShopMenu/Menu';
import ShopList from './components/Shops/ShopList';
import {NavigationContainer} from '@react-navigation/native';
import HamburgerSlideBarNavigator from './navigation/HamburgerSlideBarNavigator';
import ShopPage from './components/Shops/ShopPage';
import AnimatedCard from './sub-components/AnimatedCard';

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

const NavigableLandingPage = () => {
  return (
    <NavigationContainer>
      <HamburgerSlideBarNavigator />
    </NavigationContainer>
  );
};

const AnimatedCardTester = () => {
  return (
    <AnimatedCard
      collapsableContent={
        <View>
          <Text>
            This content is always going to be visible, content below will be
            revealed.
          </Text>
        </View>
      }
      hidableContent={
        <View>
          <Text>This content will be revealed on click of the component</Text>
        </View>
      }
      bottomFixed={
        <View>
          <Text>3.10</Text>
        </View>
      }
    ></AnimatedCard>
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

export default {
  MenuTester,
  OptionPopUpTester,
  ShopPageTester,
  ShopListTester,
  NavigableLandingPage,
  AnimatedCardTester,
};