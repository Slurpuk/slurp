import {FlatList, View} from 'react-native';
import React from 'react';
import {menuSectionStyles} from './shopStyles';

const MenuSection = ({section, renderItem}) => {
  return (
    <View style={[menuSectionStyles.sectionContainer]}>
      <FlatList data={section.list} numColumns={2} renderItem={renderItem} />
    </View>
  );
};

export default MenuSection;
