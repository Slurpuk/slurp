import {FlatList, View, StyleSheet} from 'react-native';
import React from 'react';

const MenuSection = ({section, renderItem}) => {
  return (
    <View style={[styles.sectionContainer]}>
      <FlatList data={section.list} numColumns={2} renderItem={renderItem} nestedScrollEnabled={true}/>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginHorizontal: '3%',
  },
});
export default MenuSection;
