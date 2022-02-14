import React, {Component} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
// import { createStackNavigator, createAppContainer } from 'react-navigation';
import SectionList from 'react-native-tabs-section-list';
import textStyles from '../../stylesheets/textStyles';
import MenuItem from './ShopMenu/MenuItem';
import CustomButton from '../SubComponents/CustomButton';
import LinearGradient from 'react-native-linear-gradient';

// data

const NumItemsContext = React.createContext(0);

const DATA = [
  {
    title: 'Coffees',
    data: [
      {
        key: 'Coffees',
        list: [
          {
            name: 'Carrot',
          },
          {
            name: 'Cabbage',
          },
          {
            name: 'lol',
          },
          {
            name: 'lol1',
          },
          {
            name: 'lol2',
          },
          {
            name: 'lol3',
          },
        ],
      },
    ],
    key: 1,
  },
  {
    title: 'Cold Drinks',
    data: [
      {
        key: 'Cold Drinks',
        list: [
          {
            name: 'Carrot',
          },
          {
            name: 'Cabbage',
          },
          {
            name: 'lol',
          },
          {
            name: 'lol1',
          },
          {
            name: 'lol2',
          },
          {
            name: 'lol3',
          },
        ],
      },
    ],
    key: 2,
  },
  {
    title: 'Snacks',
    data: [
      {
        key: 'Cold Drinks',
        list: [
          {
            name: 'Carrot',
          },
          {
            name: 'Carrot',
          },
          {
            name: 'Carrot',
          },
          {
            name: 'Carrot',
          },
          {
            name: 'Carrot',
          },
          {
            name: 'Carrot',
          },
          {
            name: 'Carrot',
          },
          {
            name: 'Cabbage',
          },
          {
            name: 'lol',
          },
          {
            name: 'lol1',
          },
          {
            name: 'lol2',
          },
          {
            name: 'lol3',
          },
        ],
      },
    ],
    key: 3,
  },
];
const renderItem = ({item}) => <MenuItem name={item.name} />;

const renderSection = ({item}) => {
  return (
    <View style={styles.sectionContainer}>
      <FlatList data={item.list} numColumns={2} renderItem={renderItem} />
    </View>
  );
};

const Menus = () => {
  return (
    <>
      <NumItemsContext.Provider value="0">
        <SafeAreaView style={styles.container}>
          <SectionList
            sections={DATA}
            stickySectionHeadersEnabled={false}
            scrollToLocationOffset={-20}
            tabBarStyle={styles.tabBar}
            renderItem={({item}) => renderSection({item})}
            renderSectionHeader={({section: {title}}) => (
              <View style={styles.sectionHeader}>
                <Text style={[textStyles.poppinsTitle, {color: 'black'}]}>
                  {title}
                </Text>
              </View>
            )}
            renderSectionFooter={() => <View style={styles.footerSpacing} />}
            renderTab={({title, isActive}) => (
              <View
                style={[
                  styles.tabContainer,
                  {
                    borderBottomWidth: isActive ? 3 : 0,
                    borderBottomColor: '#046D66',
                  },
                ]}
              >
                <Text
                  style={[
                    [textStyles.poppinsTitle],
                    {color: isActive ? '#090909' : '#9e9e9e'},
                  ]}
                >
                  {title}
                </Text>
              </View>
            )}
          />
        </SafeAreaView>

        <View style={styles.absoluteArea}>
          <LinearGradient
            colors={['transparent', '#EDEBE7', '#EDEBE7']}
            style={styles.linearGradient}
          >
            <NumItemsContext.Consumer>
              {value => {
                return (
                  <CustomButton
                    text="View Basket"
                    priority="primary"
                    optionalNumber={value}
                  />
                );
              }}
            </NumItemsContext.Consumer>
          </LinearGradient>
        </View>
      </NumItemsContext.Provider>
    </>
  );
};

const screenWidth = Dimensions.get('window').width;
const dataLen = DATA.length;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EDEBE7',
    paddingBottom: 0,
  },

  footerSpacing: {
    height: 70,
  },

  linearGradient: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },

  absoluteArea: {
    position: 'absolute',
    height: 100,
    backgroundColor: '',
    bottom: 0,
    // borderWidth: 2,
    width: '100%',
  },

  sectionContainer: {
    marginHorizontal: '3%',
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: '8%',
    marginBottom: '2%',
  },

  coffeeTitle: {
    fontSize: 20,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  item: {
    width: screenWidth * 0.43,
    height: screenWidth * 0.43 * 0.74,
    borderRadius: 10,
    shadowOpacity: 0.2,
    marginVertical: '2%',
    marginHorizontal: '2%',
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
    fontSize: 17,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  tabBar: {
    borderBottomColor: '#f4',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    shadowColor: '#393939',
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 3,
  },
  tabContainer: {
    borderBottomColor: '#090909',
    borderBottomWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 6,
    backgroundColor: 'whitesmoke',
    flexGrow: 1,
    alignContent: 'stretch',
    alignSelf: 'stretch',
    width: screenWidth / dataLen,
  },
});

export default Menus;
