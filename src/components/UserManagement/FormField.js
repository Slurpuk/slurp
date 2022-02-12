import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';

const FormField = ({
  style,
  title = 'Title',
  placeholder = '',
  setField,
  type = '',
}) => {
  let secureTextEntry = false;
  let autoCapitalize = true;
  let autoCorrect = true;
  let autoCompleteType = 'off';
  switch (type) {
    case 'name':
      autoCapitalize = 'words';
      autoCompleteType = 'name';
      break;
    case 'email':
      autoCapitalize = 'none';
      autoCorrect = false;
      autoCompleteType = 'email';
      break;
    case 'password':
      secureTextEntry = true;
      autoCapitalize = 'none';
      autoCorrect = false;
      autoCompleteType = 'password';
      break;
  }
  return (
    <View style={style}>
      <Text style={[textStyles.bluePoppinsSubHeading, styles.text]}>
        {title}
      </Text>
      <TextInput
        style={styles.input}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        onChangeText={text => setField(text)}
        autoCapitalize={autoCapitalize}
        autoCompleteType={autoCompleteType}
        autoCorrect={autoCorrect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginBottom: '2.5%',
  },

  input: {
    backgroundColor: '#F9F9F9',
    height: 37,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: '3.5%',
  },
});

export default FormField;
