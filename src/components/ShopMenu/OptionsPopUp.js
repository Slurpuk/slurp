import CheckboxSectionList from './CheckboxSectionList';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import CustomButton from '../../sub-components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ShopContext} from '../Shops/ShopPage';

const OptionsPopUp = ({data, renderer, product_name, curr_price}) => {
  const context = useContext(ShopContext);
  const [totalPrice, setTotalPrice] = useState(curr_price); // Current total price in pennies
  const [options, setOptions] = useState({}); // List of options currently selected
  const [isVisible, setVisible] = useState(true); // State for tracking if the popup is currently visible
  const updateOptions = (name, price, isAdd) => {
    if (isAdd) {
      setTotalPrice(price + totalPrice);
      setOptions(prevState => ({
        ...prevState,
        [name]: price,
      }));
      console.log(options);
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
      <View style={styles.header}>
        <Text style={[textStyles.headingOne, styles.product_name]}>
          {product_name}
        </Text>
        <TouchableHighlight
          style={styles.icon}
          underlayColor={'white'}
          onPress={() => setVisible(false)}
        >
          <Icon size={30} color="black" name="close" />
        </TouchableHighlight>
      </View>
      <View style={styles.list}>
        <CheckboxSectionList
          updateOptions={updateOptions}
          DATA={data}
          renderItem={renderer}
        />
      </View>
      <CustomButton
        text={`Add To Order  £${(totalPrice / 100).toPrecision(3)}`}
        priority={'primary'}
        width={screenWidth * 0.79}
        onPress={() => setVisible(false)}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '7%',
    width: 0.9128 * screenWidth,
    height: 0.5723 * screenHeight,
    backgroundColor: 'white',
    paddingVertical: '6%',
    position: 'absolute',
    top: '20%',
    bottom: '23%',
    left: '4%',
    right: '4%',
    elevation: 200,
    zIndex: 100,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  product_name: {
    color: 'black',
    marginLeft: '2%',
  },

  list: {
    flex: 1,
    height: '60%',
  },

  icon: {
    marginRight: '7%',
    marginBottom: '2%',
  },
});

export default OptionsPopUp;
