import {StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useContext} from 'react';
import ShopCard from './ShopCard';
import {OptionsContext} from '../../screens/LandingMapPage';

const ShopList = ({navigation}) => {
  const context = useContext(OptionsContext);
  const DATA = context.shopsData;
  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.container}
        data={DATA}
        numColums={1}
        nestedScrollEnabled={true}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          return <ShopCard shop={item} navigation={navigation} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
  },

  wrapper: {
    height: '70%',
  },
});
export default ShopList;
