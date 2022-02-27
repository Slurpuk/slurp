import React, {Component, useContext, useEffect, useState} from 'react';
import ShopIntro from './ShopIntro';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CustomButton from '../../sub-components/CustomButton';
import Menu from '../ShopMenu/Menu';
import {SharedElement} from 'react-native-shared-element';
import ShopCard from './ShopCard';
import ShopsData from '../../fake-data/ShopsData';
import ItemsData from '../../fake-data/ItemsData';
import renderers from '../../renderers';
import ShopDetailIcons from './ShopDetailIcons';
import textStyles from '../../../stylesheets/textStyles';
import WhiteArrowButton from '../../sub-components/WhiteArrowButton';
import {OptionsContext} from '../../screens/LandingMapPage';

const ShopPage = ({navigation, route}) => {
  const MENUDATA = ItemsData;
  // const item = ShopPage.sharedElements.route.params;
  const tempContext = useContext(OptionsContext);
  const context = route === undefined ? tempContext : route.params;
  const shop = context.currShop;
  return (
    <View style={styles.container}>
      <View style={{maxHeight: '35%', minHeight: '30%', position: 'relative'}}>
        <SharedElement id={`shop.id}`}>
          <Image
            style={styles.cardImgs}
            source={shop.image_url}
            resizeMode="cover"
          />
        </SharedElement>

        <SharedElement id={`shop.id`}>
          <Text style={[textStyles.headingOne, styles.cardHeading]}>
            {shop.name}
          </Text>
        </SharedElement>

        <SharedElement id={`shop.id`}>
          <ShopDetailIcons
            style={styles.details}
            likeness={shop.details.likeness}
            timeToOrder={shop.details.queue}
          />
        </SharedElement>
        <View>
          <WhiteArrowButton
            style={styles.back_button}
            direction={context.isShopIntro ? 'down' : 'left'}
            navigation={navigation}
            onPressAction={context.isShopIntro ? context.currRef : null}
          />
        </View>
      </View>
      <Menu
        DATA={MENUDATA}
        renderItem={renderers.renderItemCard}
        renderSection={renderers.renderMenuSection}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
    position: 'relative',
    maxHeight: '35%',
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    backgroundColor: '#36363677',
    height: '100%',
  },
  cardImgs: {
    position: 'absolute',
    width: '100%',
    left: 0,
  },
  back_button: {
    top: 30,
  },

  cardHeading: {
    position: 'absolute',
    width: '100%',
    // borderWidth: 3,
    // marginTop: '0%'
    // left: '20%',
    top: 80,
  },
});

const shopPageCustom = StyleSheet.create({
  absoluteArea: {
    height: 60,
    backgroundColor: '',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});

// ShopPage.sharedElements = route => {
//   const {shop} = route.params;
//   return [
//     {
//       id: `shop.id`,
//       animation: 'move',
//       resize: 'clip',
//     },
//   ];
// };
export default ShopPage;
