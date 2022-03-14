import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

export default function BasketItem({item, context}) {
  const [count, setCount] = useState(item.count);
  const [itemTotal, setItemTotal] = useState(item.Price * item.count);
  const [totalPrice, setTotalPrice] = useState(context.total);


  function remove(item) {
    if (count > 0) {
      context.removeFromBasket(item);
      setCount(count - 1);
      setItemTotal(itemTotal - item.Price);
    }
  }
  function add(item) {
    context.addToBasket(item);
    setCount(count + 1);
    setItemTotal(itemTotal + item.Price);
  }
  return (
    <View style={styles.item_container}>
      <View style={styles.item_information}>
        <Text style={styles.item_name}>{item.Name}</Text>
        <FlatList
          data={item.specifications}
          renderItem={specification => (
            <Text style={styles.item_specification}>{specification.item}</Text>
          )}
          style={styles.item_specification_list}
        />
      </View>
      <View style={styles.amount_selection_container}>
        <Pressable onPress={() => remove(item)}>
          <Text style={styles.change_amount_button}>-</Text>
        </Pressable>
        <Text style={styles.amount}>{count}</Text>
        <Pressable onPress={() => add(item)}>
          <Text style={styles.change_amount_button}>+</Text>
        </Pressable>
      </View>
      <Text style={styles.price}>£{itemTotal.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  items_list: {
    display: 'flex',
    flex: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C0C0C0',
  },
  item_container: {
    flex: 1,
    borderColor: '#C0C0C0',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  item_information: {
    alignSelf: 'flex-start',
    flex: 1,
  },
  item_name: {
    color: '#173C4F',
    fontSize: 21,
    fontWeight: '600',
    paddingBottom: '2%',
    alignSelf: 'flex-start',
  },
  item_specification_list: {},
  item_specification: {
    color: '#717171',
    fontWeight: '300',
    fontSize: 13,
  },
  price: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    minWidth: 30,
    flex: 0.25,
    display: 'flex',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'right',
    alignSelf: 'flex-start',
    color: '#434343',
  },
  amount_selection_container: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#1B947E',
    borderRadius: 3,
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    flex: 0.15,
    marginEnd: '5%',
    justifyContent: 'space-between',
  },
  amount: {
    color: '#F1F1F1',
    fontWeight: '600',
    fontSize: 13,
  },
  change_amount_button: {
    color: '#FFFFFF',
  },
});
