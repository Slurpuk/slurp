import React from 'react';
import {StyleSheet, View, Text, FlatList} from 'react-native';
import BasketItem from './BasketItem';

const BasketContents = ({Items}) => {
  function keyExtract(it) {
    if (it.hasOwnProperty('Bean')) {
      let newKey = it.key;
      it.options.forEach(option => (newKey += option.Name));
      return newKey;
    } else {
      return it.key;
    }
  }
  return (
    <View style={styles.basket_content}>
      <Text style={styles.my_order}>My Order</Text>
      <FlatList
        data={Items}
        renderItem={({item}) => <BasketItem item={item} />}
        style={styles.items_list}
        keyExtractor={keyExtract}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  basket_content: {
    display: 'flex',
    height: '100%',
  },
  my_order: {
    fontWeight: '700',
    fontSize: 26,
    color: '#212121',
    paddingBottom: '5%',
  },
  items_list: {
    display: 'flex',
    flex: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C0C0C0',
  },
});

export default BasketContents;
