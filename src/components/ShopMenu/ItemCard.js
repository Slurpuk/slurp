import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import MenuItem from './MenuItem';
import Menu from './Menu';

const ItemCard = ({item}) => {
  return <MenuItem item={item} />;
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
    fontSize: 17,
    justifyContent: 'center',
    alignSelf: 'center',
    color: 'black',
  },

  item: {
    width: screenWidth * 0.43,
    height: screenWidth * 0.43 * 0.74,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 8,
      },
    }),
    marginVertical: '2%',
    marginHorizontal: '2%',
    display: 'flex',
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
  },
});

export default ItemCard;
