import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-navigation';

const ShopList = ({DATA, renderItem}) => {
  return (
    <SafeAreaView>
      <FlatList data={DATA} numColumns={1} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
  },
});
export default ShopList;
