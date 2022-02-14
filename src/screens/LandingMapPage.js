import React, {useRef} from 'react';
import {Dimensions, StyleSheet, Text, View, Button} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import ShopList from '../components/Shops/ShopList';
import ShopsData from '../fake-data/ShopsData';
import renderers from '../renderers';

const windowHeight = Dimensions.get('window').height;

export default function LandingMapPage() {
  const bottomSheet = useRef();

  const bringUpBottomSheet = () => {
    bottomSheet.current.show();
  };

  return (
    <View style={styles.container}>
      <BottomSheet hasDraggableIcon ref={bottomSheet} height={300}>
        <Text>The details of the shop</Text>
      </BottomSheet>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>Map View Will Be There</Text>
        <Button title="Location" onPress={bringUpBottomSheet} />
      </View>
      <ScrollBottomSheet
        componentType="FlatList"
        snapPoints={[128, '50%', windowHeight - 80]}
        initialSnapIndex={2}
        renderHandle={() => (
          <View style={styles.header}>
            <View style={styles.panelHandle} />
            <Text style={{padding: 10, fontWeight: 'bold', fontSize: 25}}>
              Top Picks Near By
            </Text>
          </View>
        )}
        data={Array.from({length: 200}).map((_, i) => String(i))}
        keyExtractor={i => i}
        renderItem={({item}) => (
          <View style={styles.item}>
            <ShopList DATA={ShopsData} renderItem={renderers.renderShopCard} />
          </View>
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: '#EDEBE7',
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#EDEBE7',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 3,
    backgroundColor: 'green',
    borderRadius: 4,
  },
  item: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 10,
  },
});
