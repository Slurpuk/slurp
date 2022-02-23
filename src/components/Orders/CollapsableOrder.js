import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import textStyles from '../../../stylesheets/textStyles';
import OrderDetailsView from './OrderDetailsView';
import OrderItemsList from './OrderItemsList';
import AnimatedCard from '../../sub-components/AnimatedCard';

const CollapsableOrder = ({order}) => {
  const totalPrice = 3;

  return (
    <View style={styles.order}>
      <AnimatedCard
        collapsableContent={<OrderDetailsView order={order} />}
        hidableContent={<OrderItemsList order={order} />}
        bottomFixed={
          <Text style={textStyles.darkGreyPoppinsHeading}>
            £{totalPrice.toFixed(2)}
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    marginTop: 15,
  },

  collapsedOrderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  collapsedOrderSectionLeft: {
    flex: 2,
    display: 'flex',
  },
  collapsedOrderSectionRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  collapsedOrderSectionRightTop: {
    flex: 1,
  },

  textFlex: {
    flex: 1,
  },
});
export default CollapsableOrder;
