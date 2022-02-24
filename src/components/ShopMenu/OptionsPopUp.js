import CheckboxSectionList from './CheckboxSectionList';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import CustomButton from '../../sub-components/CustomButton';
import {OptionsContext} from '../../screens/LandingMapPage';

const OptionsPopUp = ({data, renderer, product_name, curr_price}) => {
  const context = useContext(OptionsContext);
  const [totalPrice, setTotalPrice] = useState(curr_price); // Current total price in pennies
  const [options, setOptions] = useState({}); // List of options currently selected
  const [isVisible, setVisible] = useState(true);
  const updateOptions = (name, price, isAdd) => {
    if (isAdd) {
      setTotalPrice(price + totalPrice);
      setOptions(prevState => ({
        ...prevState,
        [name]: price,
      }));
    } else {
      setTotalPrice(totalPrice - price);
      let newState = options;
      delete newState[name];
      setOptions(newState);
    }
  };

  useEffect(() => {
    if (isVisible === false) {
      context.setOptionsVisible(isVisible);
    }
  }, [isVisible]);

  return (
    <View style={styles.container}>
      <Text style={[textStyles.headingOne, styles.product_name]}>
        {product_name}
      </Text>
      <View style={styles.list}>
        <CheckboxSectionList
          updateOptions={updateOptions}
          DATA={data}
          renderItem={renderer}
        />
      </View>
      <View style={styles.button}>
        <CustomButton
          text={`Add To Order  £${(totalPrice / 100).toPrecision(3)}`}
          priority={'primary'}
          width={screenWidth * 0.805}
          onPress={() => setVisible(false)}
        />
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '3%',
    width: 0.9128 * screenWidth,
    height: 0.5723 * screenHeight,
    backgroundColor: 'white',
    paddingVertical: '4%',
    position: 'absolute',
    top: '20%',
    bottom: '23%',
    left: '4%',
    right: '4%',
    elevation: 200,
    zIndex: 100,
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
    paddingRight: '3%',
  },
});

export default OptionsPopUp;
