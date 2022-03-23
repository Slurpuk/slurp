import React, {useContext, useEffect, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Dimensions,
  Pressable,
} from 'react-native';
import {GlobalContext} from '../../../App';

type SearchBarComponentProps = {};

const CustomSearchBar: React.FunctionComponent<SearchBarComponentProps> = ({
  navigation,
  searchBarFocused,
  setSearchBarFocussed,
}) => {
  const context = useContext(GlobalContext);
  const [shopsData, setShopsData] = useState(context.shopsData);
  const [query, setQuery] = useState('');
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const temp = context.shopsData;
    setShopsData(temp);
    setShops(shopsData.slice());
  }, [context.shopsData, shopsData]);

  const updateQuery = input => {
    if (!searchBarFocused) {
      setSearchBarFocussed(true);
    }
    setQuery(input);
    setShops(shopsData.slice());
  };

  const filterNames = shop => {
    let search = query;
    if (search.length === 0) {
      clear();
    }
    if (shop.Name.toLowerCase().includes(search.toLowerCase())) {
      let open;
      shop.IsOpen ? (open = 'Open') : (open = 'Closed');
      return `${shop.Name} - ${open}`;
    } else {
      return null;
    }
  };

  const clear = () => {
    setSearchBarFocussed(false);
  };

  const selectShop = shop => {
    if (shop.IsOpen) {
      context.switchShop(shop);
    }
  };

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Where to..."
        onChangeText={updateQuery}
        value={query}
        lightTheme={true}
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        onClear={clear}
        placeholderTextColor={'#046D66'}
        inputStyle={{color: '#046D66'}}
        leftIconContainerStyle={{color: '#046D66'}}
        rightIconContainerStyle={{color: '#046D66'}}
        searchIcon={false}
      />
      {searchBarFocused ? (
        <View style={styles.activeElementsWrapper}>
          <View style={styles.cover} />
          <FlatList
            data={shops}
            extraData={query}
            styles={styles.flatList}
            renderItem={({item}) => (
              <View
                style={[
                  styles.searchResultContainer,
                  {display: searchBarFocused ? 'flex' : 'none'},
                ]}>
                {filterNames(item) ? (
                  <Pressable
                    onPress={() => selectShop(item)}
                    style={({pressed}) => [
                      {backgroundColor: item.IsOpen ? 'white' : 'lightgrey'},
                      {
                        backgroundColor:
                          pressed && item.IsOpen
                            ? 'teal'
                            : item.IsOpen
                            ? 'white'
                            : 'grey',
                      },

                      styles.searchResult,
                    ]}>
                    {({pressed}) => (
                      <Text
                        style={[
                          {color: pressed && item.IsOpen ? 'white' : 'black'},

                          styles.flatListItem,
                        ]}>
                        {filterNames(item)}
                      </Text>
                    )}
                  </Pressable>
                ) : null}
              </View>
            )}
          />
        </View>
      ) : null}
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    marginRight: 0,
    ...Platform.select({
      ios: {
        marginTop: '0%',
      },
      android: {
        marginTop: '0%',
      },
    }),
    alignSelf: 'flex-end',
    flex: 1,
  },

  searchResultContainer: {
    width: screenWidth * 0.7,
  },

  container: {
    borderRadius: 20,
    borderColor: '#046D66',
    borderWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderBottomColor: '#046D66',
    borderTopColor: '#046D66',
    backgroundColor: 'whitesmoke',
    height: 0.07 * screenHeight,
    color: '#046D66',
    overflow: 'visible',
    marginLeft: '3%',
    marginRight: '3%',
    zIndex: 0,
  },

  activeElementsWrapper:{
    marginLeft: (-screenHeight * 0.1),
  },

  searchResult: {
    width: screenWidth * 1.1,
  },

  cover: {
    backgroundColor: 'white',
    opacity: 0.8,
    width: screenWidth * 1.1,
    height: screenHeight * 0.15,
    position: 'absolute',
    top: -screenHeight * 0.15,
    zIndex: -1,
  },

  inputContainer: {
    borderRadius: 20,
    backgroundColor: 'whitesmoke',
    height: 0.05 * screenHeight,
    color: '#046D66',
  },
  flatListItem: {
    width: screenWidth * 1,
    maxWidth: screenWidth * 1,
    fontSize: 16,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingVertical: 15,
    borderRadius: 0,
    fontFamily: 'Poppins',
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1,
    position: 'relative',
    height: 60,
  },
  flatList: {
    display: 'flex',
    overflow: 'visible',
  },
});

export default CustomSearchBar;
