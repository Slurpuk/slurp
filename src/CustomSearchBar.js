import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';

type SearchBarComponentProps = {};

const CustomSearchBar: React.FunctionComponent<
  SearchBarComponentProps,
> = () => {
  const [search, setSearch] = useState('');

  const updateSearch = search => {
    setSearch(search);
  };

  return (
    <View style={styles.view}>
      <SearchBar
        placeholder="Where to..."
        onChangeText={updateSearch}
        value={search}
        lightTheme={true}
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
      />
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
  }
});

export default CustomSearchBar;
