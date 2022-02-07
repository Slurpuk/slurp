import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import textStyles from '../../stylesheets/textStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import shopDetailIcons from './ShopDetailIcons';
import ShopDetailIcons from './ShopDetailIcons';
const ShopIntro = props => {
  return (
    <ImageBackground
      source={require('../assets/images/coffeeUnsplash1.jpg')}
      imageStyle={{borderRadius: 10, overflow: 'hidden'}}
      style={{}}>
      <View style={shopIntro.shopIntroContainer}>
        <Text style={textStyles.headingOne}>{props.shopName}</Text>
        <ShopDetailIcons shopName="Eten & Driken" />
        <Text style={textStyles.bodyText}>{props.shopIntroText}</Text>
      </View>
    </ImageBackground>
  );
};

export default ShopIntro;

const shopIntro = StyleSheet.create({
  shopIntroContainer: {
    minHeight: 250,
    maxHeight: '30%',
  },
});
