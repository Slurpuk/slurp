import React, {useCallback, useContext, useEffect, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  Dimensions,
  Pressable,
  Keyboard,
} from 'react-native';

import textStyles from '../../../stylesheets/textStyles';
import {GlobalContext, MapContext} from '../../contexts';
import {MapAction} from '../../data/actionEnum';
import {changeShopFromMarker} from '../../helpers/changeShopHelpers';
const screenHeight = Dimensions.get('window').height;

const CustomSearchBar = () => {
  const {globalState, globalDispatch} = useContext(GlobalContext);
  const {mapState, mapDispatch} = useContext(MapContext);
  //Used to store current text in search bar
  const [query, setQuery] = useState('');

  //the filtered list of shops to be shown in search results
  const [shops, setShops] = useState([]);

  //focus the search bar when a letter is typed and update the filtered shops
  const updateQuery = input => {
    if (!mapState.isSearchBarFocused && input !== '') {
      mapDispatch({type: MapAction.FOCUS_SEARCH_BAR});
    } else if (mapState.isSearchBarFocused && input === '') {
      mapDispatch({type: MapAction.UNFOCUS_SEARCH_BAR});
    }
    setQuery(input);
    filterShops();
  };

  //set the shops to be displayed to those which match the search query
  const filterShops = useCallback(() => {
    setShops(
      globalState.listOfShops.filter(shop =>
        shop.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }, [globalState.listOfShops, query]);

  //required to force update of search results to match current state, not previous state.
  useEffect(() => {
    filterShops();
  }, [filterShops, query]);

  //unfocus the search bar (remove search results)
  const clear = () => {
    mapDispatch({type: MapAction.UNFOCUS_SEARCH_BAR});
  };

  //set the bottom sheet to the selected shop
  const selectShop = async shop => {
    mapDispatch({
      type: MapAction.SET_MAP_CENTER,
      location: {
        latitude: shop.location.latitude,
        longitude: shop.location.longitude,
      },
    });
    if (shop.is_open) {
      await changeShopFromMarker(globalState, shop.key, globalDispatch);
      mapDispatch({type: MapAction.UNFOCUS_SEARCH_BAR});
    }
  };

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Type in a coffee shop..."
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
        testID={'search_bar'}
      />
      {/*Only display search results when the search bar is focused*/}
      {mapState.isSearchBarFocused ? (
        <View style={styles.activeElementsWrapper}>
          <View style={styles.cover} />
          {shops.length > 0 ? (
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
                      {display: mapState.isSearchBarFocused ? 'flex' : 'none'},
                    ]}>
                    <Pressable
                      onPressIn={() => {
                        if (item.is_open) {
                          Keyboard.dismiss();
                        }
                      }}
                      onPress={() => selectShop(item)}
                      style={({pressed}) => [
                        {
                          backgroundColor:
                            pressed && item.is_open
                              ? '#087562'
                              : item.is_open
                              ? 'white'
                              : '#C5C5C5',
                        },
                        styles.searchResult,
                      ]}
                      testID={'search_item_' + item.name}>
                      {({pressed}) => (
                        <Text
                          style={[
                            {
                              color:
                                pressed && item.is_open ? 'white' : 'black',
                            },

                            styles.flatListItem,
                          ]}>
                          {item.name}
                        </Text>
                      )}
                    </Pressable>
                  </View>
                );
              }}
            />
          ) : (
            <Text style={[textStyles.greyPoppins, styles.noResultsText]}>
              Sorry! {'\n\n'}
              No shop goes by this name. {'\n'}
              Please try a different one.
            </Text>
          )}
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
  noResultsText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingVertical: 15,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    position: 'relative',
    backgroundColor: 'whitesmoke',
  },
  searchResultContainer: {width: screenWidth * 0.7},

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
    width: screenWidth,
    maxWidth: screenWidth,
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
