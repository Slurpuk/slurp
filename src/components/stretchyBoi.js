import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Text, Dimensions} from 'react-native';
import textStyles from '../../stylesheets/textStyles';

const stretchyBoi = () => {
  return (
    <>
      <View style={stretchStyles.parent}>
        <View style={stretchStyles.child}>
          <Text style={textStyles.poppinsTitle}>Coffee</Text>
        </View>
        <View style={stretchStyles.child}>
          <Text style={textStyles.poppinsTitle}>ColdDrinks</Text>
        </View>
        <View style={stretchStyles.child}>
          <Text style={textStyles.poppinsTitle}>Snacks</Text>
        </View>
      </View>

      {/*<Text style={textStyles.headingOne}>Random Heading</Text>*/}
    </>
  );
};

const stretchStyles = StyleSheet.create({
  parent: {
    display: 'flex',
    flexDirection: 'row',
    // width: 380,
    // marginHorizontal: 10,
  },

  child: {
    flex: 1,
    // alignContent: 'stretch',
    // justifyContent: 'flex-end',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'grey',
  },

  active: {
    borderBottomColor: 'teal',
    borderBottomWidth: 5,
    backgroundColor: 'purple',
  },

  text: {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
  },
});

export default stretchyBoi;
