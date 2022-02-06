import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Text, Dimensions} from 'react-native';
import textStyles from '../../stylesheets/textStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ShopIntro = props => {
  return (
    <View style={iconStyle.container}>
      <View style={iconStyle.iconTextWrapper}>
        <Icon size={24} color="#FFE" name="clock" />
        <Text style={textStyles.iconText}>{props.shopName}7 Min</Text>
      </View>
      <View style={iconStyle.iconTextWrapper}>
        <Icon size={24} color="#FFE" name="heart-circle" />
        <Text style={textStyles.iconText}>{props.shopName}85%</Text>
      </View>
    </View>
  );
};

const iconStyle = {
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: 200,
  },

  iconTextWrapper: {
    flexDirection: 'row',
    display: 'flex',
    marginRight: 20,
  },
};

export default ShopIntro;
