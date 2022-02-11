import React from 'react';
import {View, FlatList, StyleSheet, Text, Dimensions} from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import SectionList from 'react-native-tabs-section-list';
import textStyles from '../../stylesheets/textStyles';
import MenuItem from './ShopMenu/MenuItem';

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

// const Item = ({name}) => (
//   <TouchableOpacity style={styles.item}>
//     <Text style={styles.title}>{name}</Text>
//   </TouchableOpacity>
// );
const renderItem = ({item}) => <MenuItem name={item.name} />;

const renderSection = ({item}) => {
  return (
    <View style={styles.sectionContainer}>
      <FlatList data={item.list} numColumns={2} renderItem={renderItem} />
    </View>
  );
};

const Menus = () => (
  // <Shadow>
  //   distance={5}
  //   startColor={'#00000010'}
  //   containerViewStyle={{marginVertical: 10}}
  //   radius={8}>
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
  // </Shadow>
);

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
    // color: red
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
    // borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    // minHeight: 50,
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
    // minWidth: ,
    paddingVertical: 6,
    backgroundColor: 'whitesmoke',
    // flex: 1,
    flexGrow: 1,
    // minHeight: 40,
    alignContent: 'stretch',
    alignSelf: 'stretch',
    width: screenWidth / dataLen,
  },
});

export default Menus;
