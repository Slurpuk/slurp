import React, {Component} from 'react';
import ShopIntro from './shopIntro';
import Menus from './menus';
import {StyleSheet, View} from 'react-native';
import PrimaryButton from '../SubComponents/PrimaryButton';
import CustomButton from '../SubComponents/CustomButton';

const ShopPage = () => {
  return (
    <>
      <ShopIntro
        shopName="Eten & Driken"
        shopIntroText="This shop is very good and sells many different coffee things"
      />
      <Menus />
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
