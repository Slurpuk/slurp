import React from 'react';
import ShopIntro from './ShopIntro';
import Menu from '../ShopMenu/Menu';

/**
 * Non-draggable version of the shop page
 * @param shop The shop to display
 * @param navigation The navigation object
 */
function NonDraggableShopPage({shop, navigation}) {
  return (
    <>
      <ShopIntro shop={shop} isFullScreen={true} navigation={navigation}/>
      <Menu navigation={navigation} />
    </>
  );
}

export default NonDraggableShopPage;
