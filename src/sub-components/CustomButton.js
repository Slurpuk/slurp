import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

export default function CustomButton(props) {
  const {priority, text, optionalNumber = null} = props;
  return (
    <View>
      <Animated.View style={{transform: [{scale}]}}>
        <TouchableOpacity
          style={[buttonStyles.outer, buttonStyles[priority]]}
          activeOpacity={1}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={props.onPress}
        >
          <Text style={buttonStyles.buttonText}>{text}</Text>
          {optionalNumber == null ? (
            <></>
          ) : (
            <Text
              style={[
                buttonStyles.optionalNumber,
                buttonStyles[`bubble${priority}`],
              ]}
            >
              {optionalNumber}
            </Text>
          )}
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
const screenWidth = Dimensions.get('window').width;

const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#087562',
  },

  secondary: {
    backgroundColor: '#2D466B',
  },

  optionalNumber: {
    borderRadius: 30,
    width: 20,
    height: 20,
    textAlign: 'center',
    marginBottom: 15,
    marginLeft: 8,
  },

  bubbleprimary: {
    backgroundColor: '#183342',
  },

  bubblesecondary: {
    backgroundColor: 'whitesmoke',
    color: '#555555',
  },

  buttonText: {
    color: '#EFEFEF',
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
    fontSize: 17,
  },

  outer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    marginHorizontal: 10,
    height: 43,
    width: screenWidth * 0.91,
    // borderWidth: 2,
  },
});
