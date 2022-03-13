import React from 'react';
import ShopIntro from './ShopIntro';
import Menu from '../ShopMenu/Menu';

function NonDraggableShopPage({shop}) {
  return (
    <>
      <ShopIntro shop={shop} />
      <Menu />
    </>
  );
}

export default NonDraggableShopPage;
