import React, {useContext, useState} from 'react';
import textStyles from '../../../stylesheets/textStyles';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ShopContext} from '../Shops/ShopPage';

const MenuItem = ({item}) => {
  const [count, setCount] = useState(0);
  const context = useContext(ShopContext);

  const showOptions = () => {
    context.setCurrItem(item);
    context.setOptionsVisible(true);
  };

  return (
    <TouchableOpacity style={styles.item} onPress={() => showOptions()}>
      <ImageBackground
        source={require('../../assets/images/coffeeUnsplash1.jpg')}
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
            <Text style={textStyles.coffeePrice}>{item.Price}</Text>
          </View>

          <Pressable
            onPress={() => {
              setCount(count + 1);
              console.log(count);
            }}
            style={styles.menuCardPopupTrigger}
          >
            <Text style={[textStyles.iconText, {marginLeft: 0}]}>{count}</Text>
          </Pressable>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  item: {
    width: screenWidth * 0.43,
    // backgroundColor: 'white',
    height: screenWidth * 0.43 * 0.74,
    borderRadius: 11,
    shadowOpacity: 0.2,
    marginVertical: '2%',
    marginHorizontal: '2%',
    display: 'flex',
    flex: 1,
    // backgroundColor: 'white',
    borderWidth: 1,
    position: 'relative',
  },

  menuCardTextWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  menuCardPopupTrigger: {
    backgroundColor: '#046D66',
    position: 'absolute',
    paddingHorizontal: 17,
    paddingVertical: 7,
    borderRadius: 5,
    bottom: 10,
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
    // alignSelf: 'center',
  },
});

export default MenuItem;
