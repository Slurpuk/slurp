import React from 'react';
import {StyleSheet, Text, View, Fragment, SafeAreaView} from 'react-native';
import BasketHeader from '../components/Basket/BasketHeader';
import BasketContents from '../components/Basket/BasketContents';
import PrimaryButton from '../SubComponents/PrimaryButton';

const BasketPage = () => {
  return (
    <>
      <SafeAreaView style={styles.safe_header}></SafeAreaView>
      <SafeAreaView style={styles.basket}>
        <View style={styles.basket}>
          <View style={styles.header}>
            <BasketHeader coffeShopName={'ETEN & DRIKEN'} />
          </View>
          <View style={styles.main_container}>
            <BasketContents/>
          </View>
          <View style={styles.buttons}>
            <PrimaryButton style={styles.button} text={'Apple/Google pay'} />
            <PrimaryButton style={styles.button} text={'Checkout with card'} />
          </View>
        </View>
      </SafeAreaView>
    </>
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
    flexShrink: 2,
  },
  main_container: {
    flexShrink: 10,
    marginHorizontal: '5%',
    marginVertical: '3%',
  },
  buttons: {
    flexShrink: 4,
    marginVertical: '4%',
    justifyContent: 'flex-end',
  },
  button: {
    marginVertical: '2%',

  },
});

export default BasketPage;
