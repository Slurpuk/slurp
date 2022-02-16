import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

export default function PrimaryButton(props) {
  const {text} = props;
  return (
    <View>
      <Animated.View style={[buttonStyles.primary, {transform: [{scale}]}]}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={buttonStyles.primaryText}>{text}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
const animation = new Animated.Value(0);
const inputRange = [0, 1];
const outputRange = [1, 0.8];
const scale = animation.interpolate({inputRange, outputRange});

const onPressIn = () => {
  Animated.spring(animation, {
    toValue: 0.095,
    speed: 100,
    useNativeDriver: true,
  }).start();
};
const onPressOut = () => {
  Animated.spring(animation, {
    toValue: 0,
    speed: 70,
    useNativeDriver: true,
  }).start();
};
const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#087562',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginHorizontal: 10,
    height: 41,
  },

  primaryText: {
    color: '#EFEFEF',
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
    fontSize: 17,
  },
});
