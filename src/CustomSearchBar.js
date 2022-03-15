import React, {useContext, useEffect, useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {GlobalContext} from '../App';

type SearchBarComponentProps = {};

const CustomSearchBar: React.FunctionComponent<
  SearchBarComponentProps,
> = () => {
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

  // const formatNames = shop => {
  //   let shopName = shop.Name.charAt(14).toUpperCase() + shop.Name.slice(15);
  //   shopName = shopName.replace(/_/g, ' ');
  //   return shopName;
  // };

  const filterNames = shop => {
    let search = query;
    if (shop.Name.startsWith(search)) {
      console.log('yes ' + shop.Name);
      return shop.Name;
    } else {
      console.log('no ' + shop.Name );
      return null;
    }
  };

  const clear = () => {
    setSearchBarIsUsed(false);
  }

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
      />
      {searchBarIsUsed ?
        (
        <FlatList
          data={shops}
          extraData={query}
          renderItem={({item}) => (
            <View>
              {filterNames(item) ?
              <Text style={styles.flatList}>
                {filterNames(item)}
              </Text> : null}
            </View>
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
  container: {
    borderRadius: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    borderRadius: 20,
    backgroundColor: 'white',
  },
  flatList: {
    paddingLeft: 15,
    marginTop: 15,
    paddingBottom: 15,
    fontSize: 20,
    borderBottomColor: '#26a69a',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
});

export default CustomSearchBar;
