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
import {GlobalContext} from '../App';

type SearchBarComponentProps = {};

const CustomSearchBar: React.FunctionComponent<SearchBarComponentProps> = ({
  navigation, searchBarFocused, setSearchBarFocussed
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
    if (shop.Name.toLowerCase().startsWith(search.toLowerCase())) {
      return shop.Name;
    } else {
      return null;
    }
  };

  const clear = () => {
    setSearchBarFocussed(false);
  };

  const selectShop = shop => {
    context.switchShop(shop);
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
        <>
          <View style={styles.cover}></View>
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
                      {backgroundColor: pressed ? 'teal' : 'white'},
                      styles.searchResult,
                    ]}>
                    {({pressed}) => (
                      <Text
                        style={[
                          {color: pressed ? 'white' : 'black'},
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
        </>
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
        marginTop: '15%',
      },
      android: {
        marginTop: '15%',
      },
    }),
    width: '100%',
    alignSelf: 'flex-end',
  },

  searchResultContainer: {
    width: screenWidth,
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
    marginLeft: screenWidth * 0.17,
    marginRight: '3%',
    zIndex: 0,
  },

  searchResult: {
    width: screenWidth * 1,
  },

  cover: {
    backgroundColor: 'white',
    opacity: 0.8,
    width: screenWidth,
    height: screenHeight * 0.17,
    position: 'absolute',
    top: -screenHeight * 0.1,
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