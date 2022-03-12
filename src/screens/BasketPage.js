import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/functions';
import React, {useContext, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Fragment,
  SafeAreaView,
  Platform,
  Pressable,
  StatusBar,
  Alert,
} from 'react-native';
import GreenHeader from '../sub-components/GreenHeader';
import BasketContents from '../components/Basket/BasketContents';
import CustomButton from '../sub-components/CustomButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BasketPage = ({navigation, route}) => {
  // const basket = route.params.basket;

  const [Items] = useState([
    {
      key: 1,
      name: 'Latte',
      amount: 0,
      price: '2.40',
      specifications: ['Oat Milk'],
    },
    {
      key: 2,
      name: 'Cappuccino',
      amount: 0,
      price: '2.30',
      specifications: ['Dairy', 'Caramel Syrup'],
    },
    {
      key: 3,
      name: 'Americano',
      amount: 0,
      price: '2.10',
      specifications: [],
    },
    {
      key: 4,
      name: 'Cappuccino',
      amount: 0,
      price: '2.30',
      specifications: ['Dairy', 'Caramel Syrup'],
    },
    {
      key: 5,
      name: 'Cappuccino',
      amount: 0,
      price: '2.30',
      specifications: ['Dairy', 'Caramel Syrup'],
    },
  ]);

  const [total, setTotal] = useState(0);
  const context = route.params;
  console.log(context.basketContent);

  // function reduceBasketContent() {
  //   const reduced = context.basketContent.reduce((occurrences, item) => {
  //     occurrences[item] = (occurrences[item] || 0) + 1;
  //     return occurrences;
  //   }, {});
  //
  //   const result = Object.keys(reduced).map(item => {
  //     return {key: item, value: reduced[item]};
  //   });
  //   console.log(result);
  //   return result;
  // }

  function confirmOrder() {
    firestore()
      .collection('FakeOrder')
      .add({
        customerName: 'Shaun the sheep',
        status: 'incoming',
        total: total.toFixed(2),
        items: Items.filter(item => item.amount !== 0),
        key: 3,
      })
      .then(() => {
        console.log('Order added!');
      });
    Alert.alert(
      'Order received.',
      'Your order has been sent to the shop! Awaiting response.',
      [
        {
          text: 'OK',
        },
      ],
    );
    navigation.navigate('Order history');
  }

  return (
    <View style={styles.basket}>
      <GreenHeader
        headerText={'My Basket - ' + context.shop.Name}
        navigation={navigation}
      />
      <View style={styles.main_container}>
        <BasketContents
          total={total}
          setTotal={setTotal}
          Items={context.basketContent}
        />
      </View>
      <TouchableOpacity onPress={confirmOrder} style={styles.buttons}>
        <CustomButton
          priority="primary"
          style={styles.button}
          text={'Apple/Google Pay'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={confirmOrder}
        style={[styles.lastButton, styles.buttons]}>
        <CustomButton
          priority="primary"
          style={styles.button}
          text={'Checkout with card'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safe_header: {
    flex: 0,
    backgroundColor: '#046D66',
  },
  basket: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E5E5E5',
  },

  main_container: {
    flexShrink: 10,
    marginHorizontal: '5%',
    marginVertical: '3%',
  },
  buttons: {
    display: 'flex',
    marginVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
  },

  lastButton: {
    marginBottom: '6%',
  },
});

export default BasketPage;
