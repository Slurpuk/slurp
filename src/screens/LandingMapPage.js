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
import MapPage from '../components/LandingMap/MapPage';
import ShopsData from '../fake-data/ShopsData';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const windowHeight = Dimensions.get('window').height;
export const PageContext = React.createContext();

export default function LandingMapPage() {
  const [isShopIntro, setIsShopIntro] = useState(false);
  const [isFullPage, setFullPage] = useState(false);

  const updatePage = ({index}) => {
    if (index === 0) {
      setFullPage(true);
    } else {
      setFullPage(false);
    }
  };

  const defaultShopData = shopData[0];

  const setLOL = () => {
    setIsShopIntro(!isShopIntro);
  };

  return (
    <PageContext.Provider value={isFullPage}>
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}>
          <MapPage />
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
                <Text style={{padding: 10, fontWeight: 'bold', fontSize: 25}}>
                  Top Picks Nearby
                </Text>
              </View>
            )}
            data={ShopsData}
            keyExtractor={item => item.key}
            renderItem={renderers.renderShopCard}
            contentContainerStyle={styles.contentContainerStyle}
          />
        ) : null}
      </SafeAreaView>
    </PageContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: '#EDEBE7',
  },
  header1: {
    // alignItems: 'center',
    // backgroundColor: 'red',
    // paddingVertical: 10,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    height: windowHeight,
  },
  header2: {
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
    position: 'absolute',
    top: 20,
    zIndex: 2,
  },
  item: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 10,
  },
});
