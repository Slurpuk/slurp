import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  LogBox,
  SafeAreaView,
} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import renderers from '../renderers';
import ShopPage from '../components/Shops/ShopPage';
import shopData from '../fake-data/ShopData';
import ItemsData from '../fake-data/ItemsData';
import MapBackground from '../components/LandingMap/MapBackground';
import ShopsData from '../fake-data/ShopsData';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function LandingMapPage({setVisible, navigation}) {
  const [isShopIntro, setIsShopIntro] = useState(false);

  const updatePage = ({index}) => {
    if (index === 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const defaultShopData = shopData[0];

  const setLOL = () => {
    setIsShopIntro(!isShopIntro);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.map}>
        <MapBackground />
        <Button title={'Switch bottom sheet'} onPress={setLOL} />
      </View>

      {isShopIntro ? (
        <ScrollBottomSheet
          componentType="FlatList"
          snapPoints={['0%', '70%', '100%']}
          onSettle={index => updatePage({index})}
          initialSnapIndex={1}
          renderHandle={() => (
            <View style={styles.header1}>
              <ShopPage
                shopName={defaultShopData.name}
                shopIntroText={defaultShopData.intro}
                DATA={ItemsData}
                renderSection={renderers.renderMenuSection}
                renderItem={renderers.renderItemCard}
              />
            </View>
          )}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : null}
      {isShopIntro === false ? (
        <ScrollBottomSheet
          componentType="FlatList"
          snapPoints={['20%', '91.5%']}
          initialSnapIndex={1}
          renderHandle={() => (
            <View style={styles.header2}>
              <View style={styles.panelHandle} />
              <Text style={styles.headerText}>Top Picks Nearby</Text>
            </View>
          )}
          data={ShopsData}
          keyExtractor={item => item.key}
          renderItem={renderers.renderShopCard}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : null}
    </SafeAreaView>
  );
}

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: '#EDEBE7',
  },
  header1: {
    height: windowHeight,
  },
  header2: {
    alignItems: 'center',
    backgroundColor: '#EDEBE7',
    paddingVertical: '3%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: '10%',
    height: '7%',
    backgroundColor: 'green',
    borderRadius: 4,
    position: 'absolute',
    top: '15%',
  },
  headerText: {
    padding: '2%',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  map: {
    flex: 1,
  },
});
