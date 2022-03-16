import {Animated} from 'react-native';

export const fadeOpacityIn = (property, time) => {
  console.log('ran');

  Animated.timing(property, {
    toValue: 1,
    duration: time,
    useNativeDriver: false,
  }).start();
};

export const fadeOpacityOut = (property, time) => {
  Animated.timing(property, {
    toValue: 0,
    duration: time,
    useNativeDriver: false,
  }).start();
};

export default {fadeOpacityOut, fadeOpacityIn};