import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  Pressable,
} from 'react-native';
import textStyles from '../../stylesheets/textStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import ShopDetailIcons from './ShopDetailIcons';

const ShopIntro = props => {
  return (
    <View style={intro.wrapper}>
      <ImageBackground
        source={require('../assets/images/ShopExterior.png')}
        style={{width: '100%', height: '100%'}}
      >
        <LinearGradient
          colors={['transparent', 'black']}
          style={intro.linearGradient}
        >
          <View style={intro.content}>
            <Text style={[textStyles.headingOne, intro.heading]}>
              {props.shopName}
            </Text>
            <ShopDetailIcons
              likeness={props.likeness}
              timeToOrder={props.timeToOrder}
            />
            <Text style={[textStyles.bodyText, intro.body]}>
              {props.shopIntroText}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ShopIntro;

const intro = StyleSheet.create({
  content: {
    textAlign: 'left',
  },

  wrapper: {
    height: 270,
    maxHeight: '35%',
    // width: 100,
    display: 'flex',
  },

  heading: {
    paddingVertical: 7,
  },

  body: {
    paddingVertical: 7,
  },

  linearGradient: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
