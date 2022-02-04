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
import MenuList from './MenuList';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
// import { createStackNavigator, createAppContainer } from 'react-navigation';
import SectionList from 'react-native-tabs-section-list';
import textStyles from "../../stylesheets/textStyles";

// data
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

const Item = ({name}) => (
  <TouchableOpacity
    style={styles.item}
  >
    <Text style={styles.title}>{name}</Text>
  </TouchableOpacity>
);
const renderItem = ({item}) => <Item name={item.name} />;

const renderSection = ({item}) => {
  return (
    <View style={styles.sectionContainer}>
      <FlatList data={item.list} numColumns={2} renderItem={renderItem} />
    </View>

  )
};

const Menus = () => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      stickySectionHeadersEnabled={false}
      scrollToLocationOffset={-20}
      tabBarStyle={styles.tabBar}
      renderItem={({item}) => renderSection({item})}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.sectionHeader}>
          <Text style={textStyles.poppinsTitle}>{title}</Text>
        </View>
      )}
      renderTab={({title, isActive}) => (
        <View
          style={[styles.tabContainer, {borderBottomWidth: isActive ? 1 : 0}]}
        >
          <Text
            style={[
              [textStyles.poppinsTitle],
              { color: isActive ? '#090909' : '#9e9e9e' }]
            }>
            {title}
          </Text>
        </View>
      )}
    />
  </SafeAreaView>
);

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionContainer: {
    marginHorizontal: '3%',
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: '5%',
    marginTop: '8%',
    marginBottom: '2%'
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
    // backgroundColor: 'white',
    height: (screenWidth * 0.43) * 0.74,
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
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // minHeight: 50,
  },
  tabContainer: {
    borderBottomColor: '#090909',
    display: "flex",
    justifyContent: "center",
    alignItems: 'center',
    flexDirection:'row',
    minWidth: screenWidth/3,
    paddingVertical: 6,
  },

});

export default Menus;
