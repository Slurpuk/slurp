import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import React from 'react';
import textStyles from '../../../stylesheets/textStyles';
import OrderDetailsView from './OrderDetailsView';
import OrderItemsList from './OrderItemsList';
import AnimatedCard from '../../sub-components/AnimatedCard';
import firestore from '@react-native-firebase/firestore';

const CollapsableOrder = async ({order}) => {
  const totalPrice = await getTotalPrice(order);
  const isOrderCurrent =
    order.status === 'ready' ||
    order.status === 'pending' ||
    order.status === 'accepted';
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

const getTotalPrice = async order => {
  let total = 0;
  for (const item of order.Items) {
    let coffee = await firestore().doc(item.Coffee.path).get();
    //console.log(coffee.data().Name);
    total += item.Quantity * coffee.data().Price;
  }
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
