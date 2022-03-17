import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import textStyles from '../../../stylesheets/textStyles';
import OrderDetailsView from './OrderDetailsView';
import OrderItemsList from './OrderItemsList';
import AnimatedCard from '../../sub-components/AnimatedCard';
import LinearGradient from 'react-native-linear-gradient';

const CollapsableOrder = ({order}) => {
  const totalPrice = getTotalPrice(order.Items);
  const isOrderCurrent =
    order.status === 'Ready' ||
    order.status === 'Pending' ||
    order.status === 'Accepted';
  const initialHeight = isOrderCurrent ? 126 : 100;

  return (
    <View style={styles.order}>
      <AnimatedCard
        initialHeight={initialHeight}
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

const getTotalPrice = items => {
  let total = 0;
  items.forEach(item => (total += item.quantity * item.Price));
  return total;
};

const styles = StyleSheet.create({
  order: {
    marginTop: 15,
    flex: 1,
  },
  linearGradient: {
    padding: 10,
    flex: 1,
    zIndex: 1,
    borderRadius: 10,
  },
});
export default CollapsableOrder;
