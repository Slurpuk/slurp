import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import textStyles from '../../../stylesheets/textStyles';
import OrderDetailsView from './OrderDetailsView';
import OrderItemsList from './OrderItemsList';
import AnimatedCard from '../../sub-components/AnimatedCard';

const CollapsableOrder = ({order}) => {
  const totalPrice = getTotalPrice(order);

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

const getTotalPrice = order => {
  let total = 0;
  order.items.forEach(item => (total += item.quantity * item.price));
  return total;
};

const styles = StyleSheet.create({
  order: {
    marginTop: 15,
  },
});
export default CollapsableOrder;
