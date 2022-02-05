import {StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';

const Option = ({name, price, currency}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
      />
      <View style={[styles.container]}>
        <Text style={toggleCheckBox ? styles.bold : styles.text_info}>
          {name}
        </Text>
        {price !== 0 && (
          <Text style={toggleCheckBox ? styles.bold : styles.text_info}>
            {' '}
            +{price}
            {currency}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  text_info: {
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#717171',
  },

  bold: {
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#717171',
  },
});

export default Option;
