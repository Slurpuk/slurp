import {View, StyleSheet, Text} from 'react-native';
import React from 'react';
import textStyles from '../../../stylesheets/textStyles';
import OrderDetailsView from './OrderDetailsView';
import OrderItemsList from './OrderItemsList';
import AnimatedCard from '../../sub-components/AnimatedCard';
import {OrderStatus} from "../../data/OrderStatus";

/**
 * Component corresponding to an order that can dynamically
 * change size to show the order details or just essential info
 * @param order Order object
 */
const CollapsableOrder = ({order}) => {

  //Identifies if the order is current to determine the initial height
  const isOrderCurrent =
    order.Status === OrderStatus.READY ||
    order.Status === OrderStatus.INCOMING ||
    order.Status === OrderStatus.ACCEPTED;

  //Sets the initial height for the Animated Card
  const initialHeight = isOrderCurrent ? 126 : 100;

  return (
    <View style={styles.order}>
      <AnimatedCard
        initialHeight={initialHeight}
        collapsableContent={<OrderDetailsView order={order} />}
        hidableContent={<OrderItemsList order={order} />}
        bottomFixed={
          <Text style={textStyles.darkGreyPoppinsHeading}>
            £{order.Total.toFixed(2)}
          </Text>
        }
      />
    </View>
  );
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
