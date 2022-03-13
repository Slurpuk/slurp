import React, {useContext, useRef} from 'react';
import {View, StyleSheet, ListRenderItem} from 'react-native';
import {MaterialTabBar, Tabs} from 'react-native-collapsible-tab-view';
import {GlobalContext} from '../../screens/LandingMapPage';
import renderers from '../../renderers';
import textStyles from '../../../stylesheets/textStyles';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';
import ShopIntro from "./ShopIntro";

const HEADER_HEIGHT = 200;

const DATA = [0, 1, 2, 3, 4];
const identity = (v: unknown): string => v + '';

const Header = () => {
  return <View style={styles.header} />;
};

const Shit = () => {
  const bottomSheetRef = useRef(null);
  const context = useContext(GlobalContext);
  const shop = context.currShop;
  function filterData() {
    let data = [
      {title: 'Coffees', list: [], key: 1},
      {title: 'Drinks', list: [], key: 2},
      {title: 'Snacks', list: [], key: 3},
    ];
    shop.ItemsOffered.forEach(item => {
      data[0].list.push(item);
    });
    return data;
  }

  function getCoffees() {
    return filterData()[0].list;
  }
  function getDrinks() {
    return filterData()[1].list;
  }
  function getSnacks() {
    return filterData()[2].list;
  }

  const renderItem: ListRenderItem<number> = React.useCallback(({index}) => {
    return (
      <ShopIntro/>
    );
  }, []);

  function updatePage({index}) {
    if (index === 0) {
      console.log('LOL');
    }
  }

  return (
    <ScrollBottomSheet
      ref={bottomSheetRef}
      componentType="FlatList"
      snapPoints={['0%', '70%', '100%']}
      onSettle={index => updatePage({index})}
      initialSnapIndex={1}
      renderHandle={() => (
        <View style={styles.header1}>
          <View
            style={[
              styles.panelHandle,
              styles.white,
              // isFullScreen ? {opacity: 0} : {opacity: 1},
            ]}

          />

          <Tabs.Container
            renderHeader={() => <ShopIntro shop={context.currShop} />}
            // headerContainerStyle={{paddingBottom: 100}}
            // headerHeight={1000} // optional
            renderTabBar={props => (
              <MaterialTabBar
                {...props}
                activeColor={'#000000'}
                inactiveColor={'#6D6D6D'}
                labelStyle={textStyles.poppinsTitle}
                indicatorStyle={styles.activeTabBar}
              />
            )}
            containerStyle={styles.container}>
            <Tabs.Tab name="Coffee" label={'Coffees'}>
              <View style={{height: '100%', width: 500, paddingTop: 245}}>
              <FlatList
                data={getCoffees()}
                renderItem={({item}) => renderers.renderMenuItem({item})}
                keyExtractor={identity}
                numColumns={2}
                style={styles.list}
              />
              </View>
            </Tabs.Tab>
            <Tabs.Tab name="Drinks" label={'Drinks'}>
              <FlatList
                data={getCoffees()}
                renderItem={({item}) => renderers.renderMenuItem({item})}
                keyExtractor={identity}
                numColumns={2}
                style={styles.list}
              />
            </Tabs.Tab>
            <Tabs.Tab name="Snacks" label={'Snacks'}>
              <FlatList
                data={getCoffees()}
                renderItem={({item}) => renderers.renderMenuItem({item})}
                keyExtractor={identity}
                numColumns={2}
                style={styles.list}
              />
            </Tabs.Tab>
          </Tabs.Container>
        </View>
      )}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  panelHandle: {
    width: '10%',
    height: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    position: 'absolute',
    top: '2%',
    zIndex: 2,
    left: '45%',
  },
  header1: {
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
  },
  contentContainerStyle: {
    backgroundColor: '#EDEBE7',
    width: '100%',
    height: '100%',
  },
  list: {
    backgroundColor: '#EDEBE7',
    paddingHorizontal: 10,
    // marginTop: '50%',
    // height: '100%',
    width: 500,
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
  },
  activeTabBar: {
    backgroundColor: '#046D66',
    height: 3,
  },
  container: {
    display: 'flex',
    minHeight: '100%',
    width: '100%',
    position: 'relative',
  },
});

export default Shit;
