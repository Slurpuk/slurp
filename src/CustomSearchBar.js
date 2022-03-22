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
} from 'react-native';
import {GlobalContext} from '../App';

type SearchBarComponentProps = {};

const CustomSearchBar: React.FunctionComponent<SearchBarComponentProps> = ({
  navigation,
}) => {
  const context = useContext(GlobalContext);
  const [shopsData, setShopsData] = useState(context.shopsData);
  const [query, setQuery] = useState('');
  const [shops, setShops] = useState([]);
  const [searchBarIsUsed, setSearchBarIsUsed] = useState(false);

  useEffect(() => {
    const temp = context.shopsData;
    setShopsData(temp);
    setShops(shopsData.slice());
  }, [context.shopsData, shopsData]);

  const updateQuery = input => {
    if (!searchBarIsUsed) {
      setSearchBarIsUsed(true);
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
    setSearchBarIsUsed(false);
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
      {searchBarIsUsed ? (
        <FlatList
          data={shops}
          extraData={query}
          styles={styles.flatList}
          renderItem={({item}) => (
            <View>
              {filterNames(item) ? (
                <TouchableOpacity onPress={() => selectShop(item)}>
                  <Text style={styles.flatListItem}>{filterNames(item)}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  view: {
    marginRight: '3%',
    ...Platform.select({
      ios: {
        marginTop: '20%',
      },
      android: {
        marginTop: '20%',
      },
    }),
    width: '78%',
    alignSelf: 'flex-end',
  },
  container: {
    borderRadius: 20,
    borderColor: '#046D66',
    borderWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderBottomColor: '#046D66',
    borderTopColor: '#046D66',
    backgroundColor: '#EDEBE7',
    height: 0.07 * screenHeight,
    color: '#046D66',
  },
  inputContainer: {
    borderRadius: 20,
    backgroundColor: '#EDEBE7',
    height: 0.05 * screenHeight,
    color: '#046D66',
  },
  flatListItem: {
    fontSize: 15,
    textAlignVertical: 'center',
    textAlign: 'center',
    paddingVertical: 15,
    borderRadius: 20,
    fontFamily: 'Poppins',
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1,
    backgroundColor: '#EDEBE7',
    color: '#046D66',
  },
  flatList: {
    display: 'flex',
  },
});

export default CustomSearchBar;
