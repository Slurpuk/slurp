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
import {ShopContext} from '../../screens/ShopPage';
import {GlobalContext} from '../../../App';

const OptionsPopUp = ({data, renderer, item}) => {
  const context = useContext(ShopContext);
  const globalContext = useContext(GlobalContext);
  const [totalPrice, setTotalPrice] = useState(item.Price);
  const [options, setOptions] = useState([]); // List of options currently selected

  const updateOptions = (option, isAdd) => {
    if (isAdd) {
      const newPrice = totalPrice + option.Price;
      setTotalPrice(newPrice);
      let temp = options;
      temp.push(option);
      setOptions(temp);
    } else {
      const newPrice = totalPrice - option.Price;
      setTotalPrice(newPrice);
      const index = options.findIndex(obj => obj.key === option.key);
      let newState = options;
      newState.splice(index, 1)
      setOptions(newState);
    }
  };

  function addToBasket() {
    item.options = options;
    item.Price = totalPrice;
    globalContext.addToBasket(item);
    context.setOptionsVisible(false);
    context.setCurrItem(null);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[textStyles.headingOne, styles.product_name]}>
          {item.Name}
        </Text>
        <TouchableHighlight
          style={styles.icon}
          underlayColor={'white'}
          onPress={() => context.setOptionsVisible(false)}
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
        text={`Add To Order  £${
          totalPrice.toPrecision(3)
        }`}
        priority={'primary'}
        width={screenWidth * 0.79}
        onPress={() => addToBasket()}
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
