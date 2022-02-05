import CheckboxSectionList from './CheckboxSectionList';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import textStyles from '../../stylesheets/textStyles';
import PrimaryButton from '../../PrimaryButton';

const OptionsPopUp = ({data, renderer, product_name, curr_price}) => {
  return (
    <View style={styles.container}>
      <Text style={[textStyles.headingOne, styles.product_name]}>
        {product_name}
      </Text>
      <View style={styles.list}>
        <CheckboxSectionList DATA={data} renderItem={renderer} />
      </View>
      <View style={styles.button}>
        <PrimaryButton text={`Add To Order  £${curr_price + '0'}`} />
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    paddingLeft: '3%',
    width: 0.9128 * screenWidth,
    height: 0.5723 * screenHeight,
    backgroundColor: 'white',
    paddingVertical: '4%',
    position: 'relative',
  },

  product_name: {
    color: 'black',
    marginLeft: '2%',
    marginBottom: '1%',
  },

  list: {
    flex: 1,
    height: '60%',
  },

  button: {
    marginLeft: '-3%',
  },
});

export default OptionsPopUp;
