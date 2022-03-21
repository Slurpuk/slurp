import CheckboxSectionList from './CheckboxSectionList';
import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
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

export const OptionsContext = React.createContext();
const OptionsPopUp = ({data, renderer, item}) => {
  const context = useContext(ShopContext);
  const globalContext = useContext(GlobalContext);
  const [totalPrice, setTotalPrice] = useState(item.Price);
  const [milk, setMilk] = useState(context.getDefault()); // List of options currently selected
  const [syrups, setSyrups] = useState([]);

  const updateOptions = (option, isAdd) => {
    if (isAdd) {
      const newPrice = totalPrice + option.Price;
      setTotalPrice(newPrice);
      if (option.Type === 'Milk') {
        setMilk(option);
      } else {
        let temp = syrups;
        temp.push(option);
        setSyrups(temp);
      }
    } else {
      const newPrice = totalPrice - option.Price;
      setTotalPrice(newPrice);
      if (option.Type === 'Milk') {
        milk === option ? setMilk(null) : setMilk(milk);
      } else {
        const index = syrups.findIndex(obj => obj.key === option.key);
        let newState = syrups;
        newState.splice(index, 1);
        setSyrups(newState);
      }
    }
  };

  function addToBasket() {
    if (milk === null) {
      Alert.alert(
        'No milk selected.',
        'Please select a milk',
        [
          {
            text: 'OK',
          },
        ],
        {cancelable: false},
      );
    } else {
      // Sort syrups by alphabetical order
      syrups.sort((a, b) => a.Name.localeCompare(b.Name));
      // Add the selected at the start of the array
      syrups.unshift(milk);
      let newItem = {
        ...item,
        options: syrups,
        Price: totalPrice,
      };
      globalContext.addToBasket(newItem);
      context.setOptionsVisible(false);
      context.setCurrItem(null);
    }
  }

  return (
    <OptionsContext.Provider value={{milk: milk}}>
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
          text={`Add To Order  £${totalPrice.toPrecision(3)}`}
          priority={'primary'}
          width={screenWidth * 0.79}
          onPress={() => addToBasket()}
        />
      </View>
    </OptionsContext.Provider>
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
    height: 0.6 * screenHeight,
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
