import React, {useContext, useEffect, useState} from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';
import ShopList from './ShopList';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import {GlobalContext} from '../../../App';

export default function DraggableShopList({navigation}) {
  // Height to render the ScrollBottomSheet in its retracted position.
  // Different on android due to bottom icon bar being considered part of the screen
  const RAISED_MAP_POSITION_IOS = '90.5%';
  const RAISED_MAP_POSITION_ANDROID = '98%';
  const context = useContext(GlobalContext);
  const [orderedShops, setOrderedShops] = useState(context.shopsData);

  useEffect(() => {
    //ordering the shops based on distance from user location
    const sortedShops = context.shopsData.sort(
      (a, b) => a.distanceTo > b.distanceTo,
    );
    const filteredShops = sortedShops.filter(shop => shop.distanceTo < 10000);
    //filtering the shops based on radius limitation
    setOrderedShops(filteredShops);
  }, [context.shopsData, context.currentUser.location]);

  return (
    <ScrollBottomSheet
      componentType="FlatList"
      snapPoints={[
        '15%',
        Platform.OS === 'ios'
          ? RAISED_MAP_POSITION_IOS
          : RAISED_MAP_POSITION_ANDROID,
      ]}
      initialSnapIndex={1}
      renderHandle={() => (
        <View style={styles.header2}>
          <View style={styles.panelHandle} />
          <Text style={styles.headerText}>Top Picks Nearby</Text>
          <ShopList navigation={navigation} data={orderedShops} />
        </View>
      )}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    backgroundColor: '#EDEBE7',
  },

  header2: {
    alignItems: 'center',
    backgroundColor: '#EDEBE7',
    paddingVertical: '3%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'visible',
    height: '100%',
  },

  panelHandle: {
    width: '10%',
    height: 5,
    backgroundColor: '#046D66',
    borderRadius: 4,
    position: 'absolute',
    top: '2%',
    zIndex: 2,
    left: '45%',
  },
  headerText: {
    padding: '4%',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
});
