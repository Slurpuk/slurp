import React from 'react';
import {FlatList, View} from 'react-native';
import EmptyItemLine from "./EmptyItemLine";
import Item from "./Item";

/**
 * Component corresponding to the expanded order that
 * allows the user to see all the order items and its attributes
 * @param order Order object
 */
const OrderItemsList = ({order}) => {
  return (
    <View>
      <FlatList
        data={order.Items}
        renderItem={({item}) => <Item item={item} />}
      />
      <EmptyItemLine />
    </View>
  );
};

export default OrderItemsList;
