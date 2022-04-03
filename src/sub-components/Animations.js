import {Animated} from 'react-native';

/**
 * Animation to progressively display (fade in) the component
 */
export const fadeOpacityIn = (property, time) => {
  Animated.timing(property, {
    toValue: 1,
    duration: time,
    useNativeDriver: false,
  }).start();
};

/**
 * Animation to progressively make the component fade out.
 */
export const fadeOpacityOut = (property, time) => {
  Animated.timing(property, {
    toValue: 0,
    duration: time,
    useNativeDriver: false,
  }).start();
};

export default {fadeOpacityOut, fadeOpacityIn};
