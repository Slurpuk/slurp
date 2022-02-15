import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TransparentArrowButton = ({direction = 'back', onPress}) => {
  let iconName;
  switch (direction) {
    case 'left':
      iconName = 'md-chevron-back';
      break;
    case 'right':
      iconName = 'md-chevron-forward';
      break;
    case 'up':
      iconName = 'md-chevron-up';
      break;
    case 'down':
      iconName = 'md-chevron-down';
      break;
  }
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          underlayColor: 'gray',
          opacity: pressed ? 0.6 : 1,
        },
      ]}
    >
      <Icon name={iconName} color={'black'} size={26} />
    </Pressable>
  );
};

export default TransparentArrowButton;
