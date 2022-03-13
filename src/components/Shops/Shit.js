import React, {useContext, useRef} from 'react';
import { View, StyleSheet, ListRenderItem, Dimensions, Text } from "react-native";
import {GlobalContext} from '../../screens/LandingMapPage';
import renderers from '../../renderers';
import textStyles from '../../../stylesheets/textStyles';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import {FlatList} from 'react-native-gesture-handler';
import ShopIntro from './ShopIntro';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

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
    return <ShopIntro />;
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
          <ShopIntro shop={shop} />
          <Tab.Navigator
            style={styles.navigatorContent}
            screenOptions={{
              tabBarLabelStyle: {
                fontSize: 18,
                fontFamily: 'Poppins-SemiBold',
                letterSpacing: 0.3,
                textTransform: 'capitalize',
                transform: [{translateY: -7}],
              },
              tabBarActiveTintColor: '#000000',
              tabBarInactiveTintColor: '#6D6D6D',
              tabBarIndicatorStyle: {
                backgroundColor: '#046D66',
                height: 3,
              },
              tabBarStyle: {
                height: 39,
                backgroundColor: '#FFFFFF',
                elevation: 0,
              },
            }}
            containerStyle={styles.container}>
            <Tab.Screen
              name="Coffee"
              component={() => (
                <FlatList
                  data={getCoffees()}
                  renderItem={({item}) => renderers.renderMenuItem({item})}
                  keyExtractor={identity}
                  numColumns={2}
                  contentContainerStyle={styles.content}
                />
              )}
            />
            <Tab.Screen
              name="Drinks"
              component={() => (
                <FlatList
                  data={getCoffees()}
                  renderItem={({item}) => renderers.renderMenuItem({item})}
                  keyExtractor={identity}
                  numColumns={2}
                  contentContainerStyle={styles.content}
                />
              )}
            />
            <Tab.Screen
              name="Snacks"
              component={() => (
                <FlatList
                  data={getCoffees()}
                  renderItem={({item}) => renderers.renderMenuItem({item})}
                  keyExtractor={identity}
                  numColumns={2}
                  contentContainerStyle={styles.content}
                />
              )}
            />
          </Tab.Navigator>
        </View>
      )}
      contentContainerStyle={styles.contentContainerStyle}
    />
  );
};

// An unusual bug causes the app to crash using a ScrollBottomSheet if no numerical width is used.
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
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
    display: 'flex',
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
  },
  contentContainerStyle: {
    backgroundColor: '#EDEBE7',
    width: '100%',
    height: '100%',
    flex: 1,
  },

  content: {
    flexGrow: 1,
    alignItems: 'center',
  },

  container: {
    flex: 1,
    minHeight: '100%',
    width: '100%',
    position: 'relative',
  },

  navigatorContent: {
    width: '100%',
    flex: 1,
  },
});

export default Shit;
