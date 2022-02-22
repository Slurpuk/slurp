import firestore from '@react-native-firebase/firestore';
import { firebase } from '@react-native-firebase/functions';
import React from 'react';

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
import GreenHeader from '../sub-components/GreenHeader';
import BasketContents from '../components/Basket/BasketContents';
import CustomButton from '../sub-components/CustomButton';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const BasketPage = () => {

  function sendOrder() {
    firestore()
        .collection('FakeOrder')
        .add({
          name: 'Ada Lovelace',
          type: 'incoming',
          total: 30,
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
        <BasketContents total={30}/>
      </View>
      <View style={styles.buttons}>
        <CustomButton
          priority="primary"
          style={styles.button}
          text={'Apple/Google pay'}
        />
      </View>
      <View style={[styles.lastButton, styles.buttons]}>
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
