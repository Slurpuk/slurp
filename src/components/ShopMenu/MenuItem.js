import React, {useContext, useEffect, useState} from 'react';
import textStyles from '../../../stylesheets/textStyles';
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ShopContext} from '../../screens/ShopPage';
import {menuItemStyles} from './shopStyles';
import {addToBasket} from '../../helpers/screenHelpers';
import {GlobalContext} from '../../../App';

/**
 * Menu item component displayed in a shop's menu.
 */
const MenuItem = ({item}) => {
  const [count, setCount] = useState(0);
  const shopContext = useContext(ShopContext);
  const globalContext = useContext(GlobalContext);

  /**
   * Side effect to dynamically update the menuItem counter based on the current basket content.
   */
  useEffect(() => {
    const basket = globalContext.currBasket.data;
    let newCount = 0;
    if (item.has_options) {
      for (let it of basket) {
        if (it.key === item.key) {
          newCount += it.count;
        }
      }
    } else {
      for (let it of basket) {
        if (it.key === item.key) {
          newCount = it.count;
          break;
        }
      }
    }
    setCount(newCount);
  }, [globalContext.currBasket.data, item]);

  /**
   * Show current item options on a popup.
   */
  const showOptions = () => {
    shopContext.setCurrItem(item);
    shopContext.setOptionsVisible(true);
  };

  /**
   * Add new item to the global context.
   * @param newItem The item to be added.
   */
  async function add(newItem) {
    if (newItem.has_options) {
      showOptions();
    } else {
      await addToBasket(
        newItem,
        globalContext.currShop,
        globalContext.currBasket.data,
        globalContext.currBasket.setContent,
      );
    }
  }

  return (
    <TouchableOpacity
        testID={'overallButtonMenuItem'}
        style={menuItemStyles.item} onPress={() => add(item)}>
      <ImageBackground
        testID={'menuItemImage'}
        source={{uri: item.image}}
        imageStyle={menuItemStyles.image}
        style={menuItemStyles.imageContainer}
      >
        <LinearGradient
          colors={['transparent', 'black']}
          style={menuItemStyles.linearGradient}
        >
          <View style={menuItemStyles.menuCardTextWrapper}>
            <Text
                testID={'menuItemName'}
                style={[textStyles.headingOne, menuItemStyles.title]}>
              {item.name}
            </Text>
            <Text
                testID={'menuItemPrice'}
                style={textStyles.coffeePrice}>£{item.price.toFixed(2)}</Text>
          </View>
          <Pressable
            testID={'buttonMenuItem'}
            onPress={() => add(item)}
            style={menuItemStyles.menuCardPopupTrigger}
          >
            <Text
                testID={'menuItemAddIcon'}
                style={[textStyles.iconText, menuItemStyles.counter]}>
              {' '}
              {count === 0 ? '+' : count}
            </Text>
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};
export default MenuItem;
