import React from 'react';
import {View, Text} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DetailIconsStyles} from '../../../stylesheets/ShopStyles';
import {processDistance} from '../../helpers/screenHelpers';

export default function ShopDetailIcons({distanceToShop}) {
  return (
    <View style={DetailIconsStyles.container}>
      <Icon size={24} color="#FFE" name="walk" />
      <Text style={[textStyles.iconText, DetailIconsStyles.spacing]}>
        {processDistance(distanceToShop)}
      </Text>
    </View>
  );
};
