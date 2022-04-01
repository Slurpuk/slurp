import {Platform, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import ShopCard from './ShopCard';
import EmptyListText from '../../sub-components/EmptyListText';
import {emptyShopListText} from '../../data/Texts';

// Height to render the ScrollBottomSheet in its retracted position.
// Different on android due to bottom icon bar being considered part of the screen
const SHOP_LIST_HEIGHT_IOS = '75%';
const SHOP_LIST_HEIGHT_ANDROID = '78%';

const ShopList = ({navigation, data}) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.container}
        data={data}
        numColums={1}
        nestedScrollEnabled={true}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          return <ShopCard shop={item} navigation={navigation} />;
        }}
        ListEmptyComponent={<EmptyListText text={emptyShopListText} />}
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
