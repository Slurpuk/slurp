//to do
import React, {Component} from 'react';
import textStyles from '../../../stylesheets/textStyles';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const MenuItem = ({name}) => (
  <TouchableOpacity style={styles.item}>
    {/*<Image*/}
    {/*  style={{width: '100%', height: 100, zIndex: -1}}*/}
    {/*  source={require('../assets/images/coffeeUnsplash1.jpg')}*/}
    {/*/>*/}

    <ImageBackground
      source={require('../../assets/images/coffeeUnsplash1.jpg')}
      imageStyle={{borderRadius: 10, overflow: 'hidden'}}
      style={{width: '100%', height: '100%'}}>
      <LinearGradient
        colors={['transparent', 'black']}
        style={styles.linearGradient}>
        <View style={styles.menuCardTextWrapper}>
          <Text style={[textStyles.headingOne, styles.title]}>{name}</Text>
          <Text style={textStyles.coffeePrice}>£3.10</Text>
        </View>

        <Pressable style={styles.menuCardPopupTrigger}>
          <Text style={[textStyles.iconText, {marginLeft: 0}]}>+</Text>
        </Pressable>
      </LinearGradient>
    </ImageBackground>
  </TouchableOpacity>
);

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
