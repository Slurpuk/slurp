import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

export default function PrimaryButton(props) {
  const {onPress, text} = props;
  return (
    <Pressable style={buttonStyles.primary} onPress={onPress}>
      <Text style={buttonStyles.primaryText}>{text}</Text>
    </Pressable>
  );
}
const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#087562',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginHorizontal: 10,
    height: 50,
  },

  primaryText: {
    color: '#EFEFEF',
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
    fontSize: 17,
  },
});
