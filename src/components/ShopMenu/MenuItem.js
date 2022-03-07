import React, {useContext, useEffect, useState} from 'react';
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
import {ShopContext} from '../../screens/ShopPage';

const MenuItem = ({item}) => {
  const [count, setCount] = useState(0);
  const context = useContext(ShopContext);

  const showOptions = () => {
    context.setCurrItem(item);
    context.setOptionsVisible(true);
  };

  useEffect(() => {});

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
            <Text style={textStyles.coffeePrice}>£{item.Price}</Text>
          </View>

          <Pressable
            onPress={() => {
              showOptions();
              setCount(count + 1);
            }}
            style={styles.menuCardPopupTrigger}
          >
            <Text
              style={[
                textStyles.iconText,
                {
                  marginLeft: 0,
                  marginTop: 2,
                  color: 'black',
                  textAlign: 'center',
                },
              ]}
            >
              {count === 0 ? '+' : count}
            </Text>
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
    height: screenWidth * 0.43 * 0.74,
    borderRadius: 11,
    shadowOpacity: 0.2,
    marginVertical: '2%',
    marginHorizontal: '2%',
    display: 'flex',
    // flex: 1,
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
    paddingLeft: 7,
    // paddingVertical: 7,
    borderRadius: 70,
    bottom: 10,
    minWidth: 26,
    minHeight: 26,
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
