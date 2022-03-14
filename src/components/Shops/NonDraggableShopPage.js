import React from 'react';
import ShopIntro from './ShopIntro';
import Menu from '../ShopMenu/Menu';

function NonDraggableShopPage({shop, navigation}) {
  return (
    <>
      <ShopIntro shop={shop} />
      <Menu navigation={navigation} />
    </>
  );
}

export default NonDraggableShopPage;
