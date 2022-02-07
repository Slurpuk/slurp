import {Platform, StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useState} from 'react';

const Option = ({name, price, currency, updateOptions}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const update = newValue => {
    setToggleCheckBox(newValue);
    updateOptions(name, price, !toggleCheckBox);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          toggleCheckBox ? styles.checkedCheckBoxView : styles.checkBoxView,
        ]}>
        <CheckBox
          hideBox
          style={styles.checkBox}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => update(newValue)}
          boxType="square"
          onCheckColor="white"
          animationDuration={0.2}
        />
      </View>
      <View style={[styles.container]}>
        <Text style={toggleCheckBox ? styles.bold : styles.text_info}>
          {name}
        </Text>
        {price !== 0 && (
          <Text style={toggleCheckBox ? styles.bold : styles.text_info}>
            {' '}
            +{currency === 'p' ? price : price / 100}
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
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 13,
    color: 'black',
  },

  checkBoxView: {
    ...Platform.select({
      ios: {
        borderColor: '#717171',
        borderRadius: 2,
        borderWidth: 2,
        height: 18,
        width: 18,
        marginVertical: '1.5%',
        marginHorizontal: '2%',
      },
      android: {},
    }),
  },

  checkedCheckBoxView: {
    ...Platform.select({
      ios: {
        borderColor: '#087562',
        backgroundColor: '#087562',
        borderRadius: 2,
        borderWidth: 2,
        height: 18,
        width: 18,
        marginVertical: '1.5%',
        marginHorizontal: '2%',
      },
      android: {},
    }),
  },

  checkBox: {
    ...Platform.select({
      ios: {
        height: 14,
      },
      android: {},
    }),
  },
});

export default Option;
