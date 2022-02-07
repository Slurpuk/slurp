import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BasketHeader from './BasketHeader';
import BasketContents from './BasketContents';

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
          <Text style={styles.button}>FIRST BEAUTIFUL BUTTON HERE</Text>
          <Text style={styles.button}>SECOND BEAUTIFUL BUTTON HERE</Text>
        </View>
      </SafeAreaView>
  </>
  );
};

const styles = StyleSheet.create({
  main_container: {
    backgroundColor: '#E5E5E5',
    display: 'flex',
    height: '100%',
    padding: '5%',
  },
  basket: {
    display: 'flex',
  },
  header: {
    flex: 1,
  },
  content: {
    flex: 3,
  },
  buttons: {
    flex: 1,
    display: 'flex',
    alignSelf: 'center',
  },
});

export default BasketPage;
