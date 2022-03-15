import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {GlobalContext} from '../../../App';
import renderers from '../../renderers';

export default function BasketItem({item}) {
  const context = useContext(GlobalContext);
  const [count, setCount] = useState(item.count);
  const [itemTotal, setItemTotal] = useState(item.totalPrice * item.count);
  console.log(item.options);
  function remove() {
    if (count > 0) {
      context.removeFromBasket(item);
      setCount(count - 1);
      setItemTotal(itemTotal - item.totalPrice);
    }
  }
  function add() {
    context.addToBasket(item);
    setCount(count + 1);
    setItemTotal(itemTotal + item.totalPrice);
  }
  return (
    <View style={styles.item_container}>
      <View style={styles.item_information}>
        <Text style={styles.item_name}>{item.Name}</Text>
        <FlatList
          data={item.options}
          renderItem={option => (
            <Text style={styles.item_specification}>
              {option.item.Name} {option.item.Type}
            </Text>
          )}
          style={styles.item_specification_list}
          keyExtractor={it => it.key}
        />
      </View>
      <View style={styles.amount_selection_container}>
        <Pressable onPress={() => remove()}>
          <Text style={styles.change_amount_button}>-</Text>
        </Pressable>
        <Text style={styles.amount}>{count}</Text>
        <Pressable onPress={() => add()}>
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
    borderTopWidth: 1,
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
