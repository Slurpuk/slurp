import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import textStyles from '../../stylesheets/textStyles';

/**
 * Custom form field reused throughout the app.
 * @param style
 * @param title
 * @param placeholder
 * @param setField
 * @param value
 * @param type
 * @param testID
 */
const FormField = ({
  style,
  title = 'Title',
  placeholder = '',
  setField,
  value = '',
  type = '',
  testID,
}) => {
  let secureTextEntry = false;
  let autoCapitalize = true;
  let autoCorrect = true;
  let autoCompleteType = 'off';
  let keyboardType = 'default';
  let maxLength = 1235;
  switch (type) {
    case 'name':
      autoCapitalize = 'words';
      autoCorrect = false;
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
        placeholderTextColor={'#D3D3D3'}
        onChangeText={text => setField(text)}
        value={value}
        autoCapitalize={autoCapitalize}
        autoCompleteType={autoCompleteType}
        autoCorrect={autoCorrect}
        keyboardType={keyboardType}
        maxLength={maxLength}
        textContentType={'oneTimeCode'}
        testID={testID}
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
    color: 'black',
  },
});

export default FormField;
