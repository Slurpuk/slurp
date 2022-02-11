import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

const FormField = ({style, title, placeholder, setField, isPassword}) => {
  return (
    <View style={style}>
      <Text style={styles.text}>{title}</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={isPassword}
        placeholder={placeholder}
        onChangeText={text => setField(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Josefin Sans',
    fontWeight: '700',
    color: '#173C4F',
  },

  input: {
    backgroundColor: '#F9F9F9',
    height: 37,
    borderRadius: 5,
  },
});

export default FormField;
