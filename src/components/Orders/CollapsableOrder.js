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

const CollapsableOrder = ({order}) => {
  const isOrderCurrent =
    order.Status === 'ready' ||
    order.Status === 'incoming' ||
    order.Status === 'accepted';
  const initialHeight = isOrderCurrent ? 126 : 100;

  return (
    <View style={styles.order}>
      <AnimatedCard
        initialHeight={initialHeight}
        collapsableContent={<OrderDetailsView order={order} />}//collapsed
        hidableContent={<OrderItemsList order={order} />}//uncollapsed
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
