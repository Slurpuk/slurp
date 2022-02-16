import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WhiteArrowButton = ({direction = 'back', onPress}) => {
  let iconName;
  switch (direction) {
    case 'left':
      iconName = 'md-chevron-back-circle';
      break;
    case 'right':
      iconName = 'md-chevron-forward-circle';
      break;
    case 'up':
      iconName = 'md-chevron-up-circle';
      break;
    case 'down':
      iconName = 'md-chevron-down-circle';
      break;
  }
  return (
    <Pressable
      underlayColor={'transparent'}
      onPress={onPress}
      style={({pressed}) => [
        {
          underlayColor: 'gray',
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <Icon name={iconName} color={'white'} size={34} />
    </Pressable>
  );
};

export default WhiteArrowButton;
