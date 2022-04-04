import React from 'react';
import {View, Text, FlatList} from 'react-native';
import BasketItem from './BasketItem';
import {basketContentStyles} from './basketStyles';

const BasketContents = ({Items}) => {
  function keyExtract(it) {
    if (it.has_options) {
      let newKey = it.key;
      it.options.forEach(option => (newKey += option.name));
      return newKey;
    } else {
      return it.key;
    }
  }
  return (
    <View style={basketContentStyles.basket_content}>
      <Text style={basketContentStyles.my_order} testID="my-order">My Order</Text>
      <FlatList
        data={Items}
        renderItem={({item}) => <BasketItem item={item} />}
        style={basketContentStyles.items_list}
        keyExtractor={keyExtract}
      />
    </View>
  );
};

export default BasketContents;
