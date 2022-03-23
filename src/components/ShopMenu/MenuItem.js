import React, {useContext, useEffect, useState} from 'react';
import textStyles from '../../../stylesheets/textStyles';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  ImageBackground,
} from 'react-native';
import {TouchableOpacity as RNGHTouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ShopContext} from '../../screens/ShopPage';
import {GlobalContext} from '../../../App';

const MenuItem = ({item}) => {
  const [count, setCount] = useState(0);
  const shopContext = useContext(ShopContext);
  const globalContext = useContext(GlobalContext);

  // Dynamically update the menuItem counter based on the current basket content.
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
  }, [globalContext.basketContent]);

  const showOptions = () => {
    shopContext.setCurrItem(item);
    shopContext.setOptionsVisible(true);
  };

  function add(newItem) {
    newItem.hasOwnProperty('Bean')
      ? showOptions()
      : globalContext.addToBasket(newItem);
  }

  return (
    <RNGHTouchableOpacity style={styles.item} onPress={() => add(item)}>
      <ImageBackground
        source={{uri: item.Image}}
        imageStyle={{borderRadius: 10, overflow: 'hidden'}}
        style={{width: '100%', height: '100%'}}
      >
        <LinearGradient
          colors={['transparent', 'black']}
          style={styles.linearGradient}
        >
          <View style={styles.menuCardTextWrapper}>
            <Text style={[textStyles.headingOne, styles.title]}>
              {item.Name}
            </Text>
            <Text style={textStyles.coffeePrice}>
              £{Number(item.Price).toFixed(2)}
            </Text>
          </View>
          <Pressable
            onPress={() => add(item)}
            style={styles.menuCardPopupTrigger}
          >
            <Text
              style={[
                textStyles.iconText,
                {
                  marginLeft: 1,
                  marginTop: 2,
                  color: 'black',
                  textAlign: 'center',
                },
              ]}
            >
              {' '}
              {count === 0 ? '+' : count}
            </Text>
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    </RNGHTouchableOpacity>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  item: {
    width: screenWidth * 0.43,
    height: screenWidth * 0.43 * 0.74,
    borderRadius: 11,
    shadowOpacity: 0.2,
    marginVertical: '2.5%',
    borderWidth: 1,
    position: 'relative',
  },

  menuCardTextWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  menuCardPopupTrigger: {
    backgroundColor: 'white',
    position: 'absolute',
    paddingRight: 7,
    paddingLeft: 2,
    borderRadius: 80,
    bottom: 10,
    minWidth: 26,
    height: 26,
    right: 10,
  },

  linearGradient: {
    padding: 10,
    flex: 1,
    zIndex: 1,
    borderRadius: 10,
  },

  title: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
    fontSize: 17,
    justifyContent: 'center',
    marginBottom: 3,
  },
});

export default MenuItem;
