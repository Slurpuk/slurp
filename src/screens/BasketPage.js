import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/functions';
import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Fragment,
  SafeAreaView,
  Platform,
    Pressable,
  StatusBar,
} from 'react-native';
import GreenHeader from '../components/General/GreenHeader';
import BasketContents from '../components/Basket/BasketContents';
import CustomButton from '../sub-components/CustomButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const BasketPage = () => {
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

  function sendOrder() {
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
  }

  return (
    <View style={styles.basket}>
      <View style={styles.header}>
        <GreenHeader headerText={'ETEN & DRIKEN'} />
      </View>
      <View style={styles.main_container}>
        <BasketContents total={total} setTotal={setTotal} Items={Items}/>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          priority="primary"
          style={styles.button}
          text={'Apple/Google pay'}
        />
        <CustomButton
          priority="primary"
          style={styles.button}
          text={'Checkout with card'}
        />
        <Pressable onPress={sendOrder}>
          <Text>Send Order</Text>
        </Pressable>
      </View>
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
  header: {
    flexShrink: 1,
  },
  main_container: {
    flexShrink: 10,
    marginHorizontal: '5%',
    marginVertical: '3%',
  },
  buttons: {
    flexShrink: 4,
    marginVertical: '8%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    paddingVertical: '5%',
  },
});

export default BasketPage;
