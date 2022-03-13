import {Dimensions, StyleSheet, Text, View} from 'react-native';
import ShopIntro from './ShopIntro';
import textStyles from '../../../stylesheets/textStyles';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {GlobalContext} from '../../screens/LandingMapPage';
import renderers from '../../renderers';
import MenuTab from '../ShopMenu/MenuTab';
import {Tabs} from 'react-native-collapsible-tab-view';

export const ShopContext = React.createContext();
export default function DraggableShopPage() {
  const context = useContext(GlobalContext);
  const renderItem = renderers.renderMenuItem;
  const bottomSheetRef = useRef(null);
  const listRef = useRef(null);
  const [currRef, setCurrRef] = useState(bottomSheetRef.current);
  // const context = route === undefined ? defaultContext : route.params;
  const shop = context.currShop;
  // const [optionsVisible, setOptionsVisible] = useState(false);
  // const [currItem, setCurrItem] = useState(null);
  const [menuData, setMenuData] = useState(null);

  // const updatePage = ({index}) => {
  //   if (index === 0) {
  //     setVisible(false);
  //     setFullScreen(true);
  //     setCurrRef(bottomSheetRef.current);
  //   } else if (index === 2) {
  //     setIsShopIntro(false);
  //   } else {
  //     setFullScreen(false);
  //     setVisible(true);
  //   }
  // };

  // useEffect(() => {
  //   listRef.current.scrollToLocation({itemIndex: 0, sectionIndex: 0})
  // }, [])

  useEffect(() => {
    setMenuData(filterData());
  }, [context.currShop]);

  const DATA = [0, 1, 2, 3, 4];

  function filterData() {
    let data = [
      {title: 'Coffees', data: [{key: 'Coffees', list: []}], key: 1},
      {title: 'Drinks', data: [{key: 'Cold Drinks', list: []}], key: 2},
      {title: 'Snacks', data: [{key: 'Snacks', list: []}], key: 3},
    ];
    shop.ItemsOffered.forEach(item => {
      console.log(item);
      data[0].data[0].list.push(item);
    });
    return data;
  }

  function getMenuData() {
    return menuData === null ? filterData() : menuData;
  }

  function getCoffees() {
    return filterData()[0].data[0].list;
  }
  function getDrinks() {
    return filterData()[1].data[0].list;
  }
  function getSnacks() {
    return filterData()[2].data[0].list;
  }

  function updatePage({index}) {
    if (index === 0) {
      setCurrRef(listRef.current);
    }
  }

  const Header = () => {
    return (
      <View style={styles.header1}>
        <View
          style={[
            styles.panelHandle,
            styles.white,
            context.isFullScreen ? {opacity: 0} : {opacity: 1},
          ]}
        />
        <ShopIntro shop={context.currShop} />
      </View>
    );
  };

  return (
    <ShopContext.Provider value={{currRef: currRef}}>
      <ScrollBottomSheet
        ref={bottomSheetRef}
        componentType="FlatList"
        snapPoints={['0%', '70%', '100%']}
        onSettle={index => updatePage({index})}
        initialSnapIndex={1}
        renderHandle={() => (
          <Tabs.Container
            renderHeader={Header}
            headerHeight={100} // optional
          >
            <Tabs.Tab name="Coffees">
              <Tabs.FlatList
                data={getCoffees()}
                renderItem={({item}) => renderers.renderMenuItem({item})}
                style={{backgroundColor: 'red'}}
              />
            </Tabs.Tab>
            <Tabs.Tab name="Cold Drinks">
              <Tabs.FlatList data={DATA} renderItem={renderItem} />
            </Tabs.Tab>
          </Tabs.Container>
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </ShopContext.Provider>
  );
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    display: 'flex',
    minHeight: '100%',
    flex: 1,
    width: '100%',
    position: 'relative',
  },
  contentContainerStyle: {
    backgroundColor: '#EDEBE7',
  },
  roundedCorners: {
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
  },
  activeTabBar: {
    borderBottomWidth: 3,
    borderBottomColor: '#087562',
  },

  activeText: {
    color: 'black',
  },

  sleepText: {
    color: '#717171',
  },

  sectionHeader: {
    marginHorizontal: '5%',
    color: 'black',
  },

  tabBar: {
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
    display: 'flex',
    marginTop: 20,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },

  tabContainer: {
    borderBottomColor: '#090909',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: screenWidth / 3,
    paddingVertical: 6,
    backgroundColor: '#F2F2F2',
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
  header1: {
    display: 'flex',
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '30%',
    position: 'relative',
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

  white: {
    backgroundColor: 'white',
  },
  headerText: {
    padding: '4%',
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  map: {
    flex: 1,
  },
});
