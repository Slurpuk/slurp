import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useContext} from 'react';
import ShopCard from './ShopCard';
import {GlobalContext} from '../../../App';

// Height to render the ScrollBottomSheet in its retracted position.
// Different on android due to bottom icon bar being considered part of the screen
const SHOP_LIST_HEIGHT_IOS = '75%';
const SHOP_LIST_HEIGHT_ANDROID = '78%';

const ShopList = ({navigation}) => {
  const context = useContext(GlobalContext);
  const DATA = context.orderedShops;
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
    height:
      Platform.OS === 'ios' ? SHOP_LIST_HEIGHT_IOS : SHOP_LIST_HEIGHT_ANDROID,
  },
});
export default ShopList;
