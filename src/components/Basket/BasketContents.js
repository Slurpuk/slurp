import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, FlatList} from 'react-native';

const BasketContents = ({total, setTotal, Items}) => {
  const changeAmount = (item, amount) => {
    if (!(item.amount < 1 && amount < 0)) {
      item.amount += amount;
      let add_value = Math.round(item.price * amount * 100) / 100;
      setTotal(total + add_value);
    }
    // console.log(Items.find(i => i.key === item.key).amount);
    // setItems((Items.find(i => i.key === item.key).amount += amount));
  };



  return (
    <View style={styles.basket_content}>
      <Text style={styles.my_order}>My Order</Text>
      <FlatList
        data={Items}
        renderItem={({item}) => (
          <View style={styles.item_container}>
            <View style={styles.item_information}>
              <Text style={styles.item_name}>{item.Name}</Text>
              <FlatList
                data={item.specifications}
                renderItem={specification => (
                  <Text style={styles.item_specification}>
                    {specification.item}
                  </Text>
                )}
                style={styles.item_specification_list}
              />
            </View>
            <View style={styles.amount_selection_container}>
              <Pressable onPress={() => changeAmount(item, -1)}>
                <Text style={styles.change_amount_button}>-</Text>
              </Pressable>
              <Text style={styles.amount}>{item.count}</Text>
              <Pressable onPress={() => changeAmount(item, 1)}>
                <Text style={styles.change_amount_button}>+</Text>
              </Pressable>
            </View>
            <Text style={styles.price}>£{item.Price * 1}</Text>
          </View>
        )}
        style={styles.items_list}
      />
      <View style={styles.order_summary}>
        <Text style={styles.total_text}>TOTAL</Text>
        <Text style={styles.total_amount}>£{total.toFixed(2)}</Text>
      </View>
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
  order_summary: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: '5%',
    alignItems: 'flex-end',
    width: '100%',
    justifyContent: 'space-between',
  },
  total_text: {
    fontSize: 21,
    color: '#173C4F',
    fontWeight: '900',
  },
  total_amount: {
    fontSize: 20,
    color: '#173C4F',
    fontWeight: '900',
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

export default BasketContents;
