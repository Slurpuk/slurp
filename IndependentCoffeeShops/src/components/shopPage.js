import React, {Component} from 'react';
import ShopIntro from './shopIntro';
import Menus from './menus';
import {View} from 'react-native';

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

export default ShopPage;
