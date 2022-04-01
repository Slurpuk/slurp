import {StyleSheet, Text, View} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import React from 'react';
import {getItemFullPrice} from '../../helpers/screenHelpers';

/**
 * Retrieves the optional add-ons for a specific item if any
 * @param item Order item
 * @return A string containing the add-ons if any
 */
function getOptionsText(item) {
  if (item.has_options) {
    let text = item.options.reduce(function (acc, option) {
      return acc + option.name + ' ' + option.type + ', ';
    }, '');
    return text.substring(0, text.length - 2);
  } else {
    return '';
  }
}

/**
 * Component corresponding to the details of an order
 * item, including a separation line for styling purposes
 * @param item Each item for a specific order
 */
const Item = ({item}) => {
  return (
    <View>
      <View style={styles.singleElement}>
        <View style={styles.elementDetails}>
          <Text style={textStyles.bluePoppinsSubHeading}>
            {item.quantity} {item.name}
          </Text>
          <Text style={[textStyles.lightGreyPoppins, styles.options]}>
            {getOptionsText(item)}
          </Text>
        </View>
        <View style={styles.elementPrice}>
          <Text style={textStyles.darkGreyPoppinsSubHeading}>
            £{getItemFullPrice(item).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.greyBottomLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  singleElement: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  elementDetails: {
    marginVertical: 3,
    display: 'flex',
  },
  elementPrice: {
    marginLeft: 'auto',
  },
  options: {
    marginRight: '15%',
  },
  greyBottomLine: {
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1.5,
  },
});

export default Item;
