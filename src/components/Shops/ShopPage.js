import React, {Component} from 'react';
import ShopIntro from './ShopIntro';
import {StyleSheet, Text, View} from 'react-native';
import CustomButton from '../../sub-components/CustomButton';
import Menu from '../ShopMenu/Menu';

const ShopPage = ({
  shopName,
  shopIntroText,
  DATA,
  renderItem,
  renderSection,
}) => {
  return (
    <>
      <ShopIntro
        shopName={shopName}
        shopIntroText={shopIntroText}
        likeness={'65%'}
        timeToOrder={7}
      />
      <Menu DATA={DATA} renderItem={renderItem} renderSection={renderSection} />
      <View />
    </>
  );
};

const shopPageCustom = StyleSheet.create({
  absoluteArea: {
    height: 60,
    backgroundColor: '',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
export default ShopPage;
