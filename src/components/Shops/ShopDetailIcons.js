import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ShopDetailIcons = ({timeToOrder}) => {
  return (
    <View style={styles.container}>
      <Icon size={24} color="#FFE" name="clock" />
      <Text style={[textStyles.iconText, styles.spacing]}>
        {timeToOrder}min
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  spacing: {
    paddingRight: '3%',
  },
});

export default ShopDetailIcons;
