import React, {useCallback, useContext, useEffect, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  Pressable, Keyboard,
} from 'react-native';

import {GlobalContext} from '../../../App';
const screenHeight = Dimensions.get('window').height;

const CustomSearchBar = ({searchBarFocused, setSearchBarFocussed}) => {
  const context = useContext(GlobalContext);

  //Used to store current text in search bar
  const [query, setQuery] = useState('');

  //the filtered list of shops to be shown in search results
  const [shops, setShops] = useState(context.shopsData);

  //focus the search bar when a letter is typed and update the filtered shops
  const updateQuery = input => {
    if (!searchBarFocused && input !== '') {
      setSearchBarFocussed(true);
    }
    setQuery(input);
    filterShops();
  };

  //set the shops to be displayed to those which match the search query
  const filterShops = useCallback(() => {
    setShops(
      context.shopsData.filter(shop =>
        shop.Name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [context.shopsData, query]);

  //required to force update of search results to match current state, not previous state.
  useEffect(() => {
    filterShops();
  }, [filterShops, query]);

  //unfocus the search bar (remove search results)
  const clear = () => {
    setSearchBarFocussed(false);
  };

  //set the bottom sheet to the selected shop
  const selectShop = shop => {
    if (shop.IsOpen) {
      context.switchShop(shop);
      setSearchBarFocussed(false);
    }

  };

  return (
    <View style={styles.view}>
      <SearchBar
          testID="search-bar"
        placeholder="Where to..."
        // Function to run when a letter is pressed
        onChangeText={updateQuery}
        value={query}
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        // function to run when the x in search bar is pressed
        onClear={clear}
        placeholderTextColor={'#046D66'}
        inputStyle={{color: '#046D66'}}
        leftIconContainerStyle={{color: '#046D66'}}
        rightIconContainerStyle={{color: '#046D66'}}
        searchIcon={false}
      />
      {/*Only display search results when the search bar is focused*/}
      {searchBarFocused ? (
        <View style={styles.activeElementsWrapper}>
          <View style={styles.cover} />
          <FlatList
            // Only display the filtered shops in the results
            keyboardShouldPersistTaps="handled"
            data={shops}
            styles={styles.flatList}
            renderItem={({item}) => {
              return (
                <View
                  style={[
                    styles.searchResultContainer,
                    {display: searchBarFocused ? 'flex' : 'none'},
                  ]}>
                  <Pressable
                    onPressIn={() => {
                      if (item.IsOpen) Keyboard.dismiss();
                    }}
                    onPress={() => selectShop(item)}
                    style={({pressed}) => [
                      {
                        backgroundColor:
                          pressed && item.IsOpen
                            ? '#087562'
                            : item.IsOpen
                            ? 'white'
                            : '#C5C5C5',
                      },
                      styles.searchResult,
                    ]}>
                    {({pressed}) => (
                      <Text
                        style={[
                          {color: pressed && item.IsOpen ? 'white' : 'black'},

                          styles.flatListItem,
                        ]}>
                        {item.Name}
                      </Text>
                    )}
                  </Pressable>
                </View>
              );
            }}
          />
        </View>
      ) : null}
    </View>
  );
};
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

  activeElementsWrapper: {
    marginLeft: -screenHeight * 0.1,
    maxHeight: screenHeight * 0.52,
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
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    position: 'relative',
    height: 54,
  },
  flatList: {
    display: 'flex',
    overflow: 'visible',
  },
});

export default CustomSearchBar;
