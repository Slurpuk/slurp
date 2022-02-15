import React, {useRef, useEffect} from 'react';
import {Animated, Text, View} from 'react-native';
import AnimatedCollapsableCard from "./AnimatedCollapsableCard";

const AnimatableCard = props => {
  const heightAnimation = useRef(new Animated.Value(90)).current; // Initial value for opacity: 0

  const toggleCollapseOrder = () => {
    Animated.timing(heightAnimation, {
      toValue: 200,
      duration: 100,
    }).start();
  };

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        height: heightAnimation, // Bind opacity to animated value
      }}
      on
    >
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <FadeInView
        style={{width: 250, height: 50, backgroundColor: 'powderblue'}}
      >
        <AnimatedCollapsableCard onPress={toggleCollapseOrder()}
      </FadeInView>
    </View>
  );
};
