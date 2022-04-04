import React from 'react';
import {View, Text} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DetailIconsStyles} from '../../../stylesheets/ShopStyles';
import {processDistance} from '../../helpers/screenHelpers';

export default function ShopDetailIcons({distanceToShop, iconColor, iconSize, fontSize}) {
  return (
    <View style={DetailIconsStyles.container}>
      <Icon size={iconSize} color={iconColor} name="walk" />
      <Text style={[textStyles.iconText, DetailIconsStyles.spacing, {color: iconColor, fontSize: fontSize}]}>
        {processDistance(distanceToShop)}
      </Text>
    </View>
  );
}
