import React from 'react';
import {StyleSheet, Text, View, Fragment, SafeAreaView} from 'react-native';
import BasketHeader from '../components/Basket/BasketHeader';
import BasketContents from '../components/Basket/BasketContents';
import PrimaryButton from "../SubComponents/PrimaryButton";

const BasketPage = () => {
  return (
    <>
      <SafeAreaView style={styles.safe_header}>

      </SafeAreaView>
      <SafeAreaView style={styles.basket}>
        <BasketHeader style={styles.header} coffeShopName={'ETEN & DRIKEN'} />
        <View style={styles.main_container}>
          <BasketContents/>
        </View>
        <View style={styles.buttons}>
          <Text style={styles.button}>APPLE/GOOGLE PAY HERE</Text>
          <PrimaryButton text={'Checkout with card'}/>
        </View>
      </SafeAreaView>
  </>
  );
};

const styles = StyleSheet.create({
  basket: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  safe_header: {
    flex: 0,
    backgroundColor: '#046D66',
  },
  header: {
    flex: 1,
  },
  main_container: {
    flex: 11,
    padding: '5%',
  },
  buttons: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
    paddingVertical: '10%',
  },
});

export default BasketPage;
