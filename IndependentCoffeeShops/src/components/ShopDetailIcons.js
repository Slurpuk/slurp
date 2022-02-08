import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Text, Dimensions} from 'react-native';
import textStyles from '../../stylesheets/textStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ShopDetailIcons = ({timeToOrder, likeness}) => {
  return (
    <View style={iconStyle.container}>
      <View style={iconStyle.iconTextWrapper}>
        <Icon size={24} color="#FFE" name="clock" />
        <Text style={textStyles.iconText}>{timeToOrder}</Text>
      </View>
      <View style={iconStyle.iconTextWrapper}>
        <Icon size={24} color="#FFE" name="heart-circle" />
        <Text style={textStyles.iconText}>{likeness}</Text>
      </View>
    </View>
  );
};

const iconStyle = {
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 200,
  },

  iconTextWrapper: {
    flexDirection: 'row',
    display: 'flex',
    marginRight: 20,
  },
};

export default ShopDetailIcons;
