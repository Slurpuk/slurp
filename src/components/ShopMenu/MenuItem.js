import React, {useContext, useEffect, useState} from 'react';
import textStyles from '../../../stylesheets/textStyles';
import {View, Text, Pressable, ImageBackground} from 'react-native';
import {TouchableOpacity as RNGHTouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ShopContext} from '../../screens/ShopPage';
import {GlobalContext} from '../../../App';
import {menuItemStyles} from './shopStyles';

const MenuItem = ({item}) => {
  const [count, setCount] = useState(0);
  const shopContext = useContext(ShopContext);
  const globalContext = useContext(GlobalContext);

  /*
   * Dynamically update the menuItem counter based on the current basket content.
   */
  useEffect(() => {
    const basket = globalContext.basketContent;
    let newCount = 0;
    if (item.hasOwnProperty('Bean')) {
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
  }, [globalContext.basketContent, item]);

  /*
   * Show current item options.
   */
  const showOptions = () => {
    shopContext.setCurrItem(item);
    shopContext.setOptionsVisible(true);
  };

  /**
   * Add new item to the global context.
   * @param newItem The item to be added.
   */
  function add(newItem) {
    newItem.hasOwnProperty('Bean')
      ? showOptions()
      : globalContext.addToBasket(newItem);
  }

  return (
    <RNGHTouchableOpacity style={menuItemStyles.item} onPress={() => add(item)}>
      <ImageBackground
        source={{uri: item.Image}}
        imageStyle={{borderRadius: 10, overflow: 'hidden'}}
        style={{width: '100%', height: '100%'}}>
        <LinearGradient
          colors={['transparent', 'black']}
          style={menuItemStyles.linearGradient}>
          <View style={menuItemStyles.menuCardTextWrapper}>
            <Text style={[textStyles.headingOne, menuItemStyles.title]}>
              {item.Name}
            </Text>
            <Text style={textStyles.coffeePrice}>
              £{Number(item.Price).toFixed(2)}
            </Text>
          </View>
          <Pressable
            onPress={() => add(item)}
            style={menuItemStyles.menuCardPopupTrigger}>
            <Text
              style={[
                textStyles.iconText,
                {
                  marginLeft: 1,
                  marginTop: 2,
                  color: 'black',
                  textAlign: 'center',
                },
              ]}>
              {' '}
              {count === 0 ? '+' : count}
            </Text>
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    </RNGHTouchableOpacity>
  );
};
export default MenuItem;
