import {FlatList, Pressable, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {BasketItemStyles} from '../../../stylesheets/ShopStyles';
import {BasketContext} from '../../screens/BasketPage';
import {getItemFullPrice, getOptionsPrice} from '../../helpers/screenHelpers';

export default function BasketItem({item}) {
  const context = useContext(BasketContext);
  const [count, setCount] = useState(item.count);
  const [itemTotal, setItemTotal] = useState(
      getItemFullPrice(item),
  );
  /**
   * Reduce the basket item's count, ensuring it does not
   * go below 0 (removed from basket).
   */
  async function remove() {
    if (count > 0) {
      setCount(count - 1);
      setItemTotal(itemTotal - item.price - getOptionsPrice(item));
      await context.removeFromBasket(item);
    }
  }

  /**
   * Increase the basket item's count.
   */
  async function add() {
    await context.addToBasket(item);
    setCount(count + 1);
    setItemTotal(itemTotal + item.price + getOptionsPrice(item));
  }

  return (
    <View style={BasketItemStyles.item_container}>
      <View style={BasketItemStyles.item_information}>
        <Text style={BasketItemStyles.item_name}>{item.name}</Text>
        <FlatList
          data={item.options}
          renderItem={option => (
            <Text style={BasketItemStyles.item_specification}>
              {option.item.name} {option.item.type}
            </Text>
          )}
          style={BasketItemStyles.item_specification_list}
          keyExtractor={it => it.key}
        />
      </View>
      <View style={BasketItemStyles.amount_selection_container}>
        <Pressable onPress={() => remove()} hitSlop={10}>
          <Text
            style={[
              BasketItemStyles.change_amount_button,
              BasketItemStyles.minus,
            ]}>
            -
          </Text>
        </Pressable>
        <Text style={BasketItemStyles.amount}>{count}</Text>
        <Pressable onPress={() => add()} hitSlop={10}>
          <Text
            style={[
              BasketItemStyles.change_amount_button,
              BasketItemStyles.plus,
            ]}>
            +
          </Text>
        </Pressable>
      </View>
      <Text style={BasketItemStyles.price}>£{itemTotal.toFixed(2)}</Text>
    </View>
  );
}
