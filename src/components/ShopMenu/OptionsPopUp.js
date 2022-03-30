import CheckboxSectionList from './CheckboxSectionList';
import React, {useContext, useMemo, useState} from 'react';
import {Alert, Text, TouchableHighlight, View} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import CustomButton from '../../sub-components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ShopContext} from '../../screens/ShopPage';
import {OptionPopUpStyles, screenWidth} from '../../../stylesheets/ShopStyles';
import {addToBasket} from '../../helpers/screenHelpers';
import {GlobalContext} from '../../../App';

export const OptionsContext = React.createContext();

export default function OptionsPopUp({data, renderer, item}) {
  const shopContext = useContext(ShopContext);
  const globalContext = useContext(GlobalContext);
  const [totalPrice, setTotalPrice] = useState(item.Price);
  const [milk, setMilk] = useState(shopContext.menuData.defaultMilk);
  const [syrups, setSyrups] = useState([]);

  /**
   * If an option is selected, calculate a new total and reflect this
   * in the item's options field.
   * @param option
   * @param isAdd
   */
  function updateOptions(option, isAdd) {
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
  }

  /**
   * Ensures a milk option is selected, along with any number of syrups
   * and will update the items customisation and total.
   */
  async function addToCurrentBasket() {
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
      shopContext.setOptionsVisible(false);
      shopContext.setCurrItem(null);
      await addToBasket(
        newItem,
        globalContext.currShop,
        globalContext.currBasket.setContent,
      );
    }
  }

  return (
    <OptionsContext.Provider value={{milk: milk}}>
      <View style={OptionPopUpStyles.container}>
        <View style={OptionPopUpStyles.header}>
          <Text style={[textStyles.headingOne, OptionPopUpStyles.product_name]}>
            {item.Name}
          </Text>
          <TouchableHighlight
            style={OptionPopUpStyles.icon}
            underlayColor={'white'}
            onPress={() => shopContext.setOptionsVisible(false)}
          >
            <Icon size={30} color="black" name="close" />
          </TouchableHighlight>
        </View>
        <View style={OptionPopUpStyles.list}>
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
          onPress={() => addToCurrentBasket()}
        />
      </View>
    </OptionsContext.Provider>
  );
}
