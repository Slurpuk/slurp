import {Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useContext, useEffect, useState} from 'react';
import {OptionsContext} from './OptionsPopUp';
import {OptionStyles} from '../../../stylesheets/ShopStyles';
import textStyles from '../../../stylesheets/textStyles';

export default function Option({option, updateOptions}) {
  const context = useContext(OptionsContext);
  const [toggleCheckBox, setToggleCheckBox] = useState(option.name === 'Dairy');
  const isDisabled = false;

  /**
   * useEffect tracking the choice of milk to ensure only 1 milk is selected at any one time.
   */
  useEffect(() => {
    if (option.type === 'Milk' && context.milk !== option && toggleCheckBox) {
      setToggleCheckBox(false);
      updateOptions(option, !toggleCheckBox);
    }
  }, [context.milk, option, toggleCheckBox, updateOptions]);

  /**
   * Update option checkbox.
   * @param newValue
   */
  function update(newValue) {
    setToggleCheckBox(newValue);
    updateOptions(option, !toggleCheckBox);
  }

  return (
    <View style={OptionStyles.container}>
      <View
        style={[
          toggleCheckBox
            ? OptionStyles.checkedCheckBoxView
            : OptionStyles.checkBoxView,
        ]}
      >
        <CheckBox
          hideBox
          style={OptionStyles.checkBox}
          disabled={isDisabled}
          value={toggleCheckBox}
          onValueChange={newValue => update(newValue)}
          boxType="square"
          onCheckColor="white"
          animationDuration={0.2}
        />
      </View>
      <View style={[OptionStyles.container]}>
        <Text
          style={
            toggleCheckBox ? textStyles.optionsTextBold : textStyles.optionsText
          }
        >
          {option.name}
        </Text>
        {option.price !== 0 && (
          <Text
            style={
              toggleCheckBox
                ? textStyles.optionsTextBold
                : textStyles.optionsText
            }
          >
            {' '}
            +{option.price < 1 ? option.price * 100 : option.price}p
          </Text>
        )}
      </View>
    </View>
  );
}
