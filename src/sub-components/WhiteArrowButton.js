import React from 'react';
import {Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

/**
 * Custom arrow button reused throughout the app for navigation.
 * @param direction
 * @param navigation
 * @param onPressAction
 * @param customStyle
 */
const WhiteArrowButton = ({
  direction = 'back',
  navigation,
  onPressAction = null,
  customStyle = {},
}) => {
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

  function handleBackButtonClick() {
    if (onPressAction !== null) {
      onPressAction();
    } else {
      navigation.navigate('Landing map');
    }
  }

  return (
    <Pressable
      underlayColor={'transparent'}
      onPress={handleBackButtonClick}
      style={({pressed}) => [
        {
          underlayColor: 'gray',
          opacity: pressed ? 0.6 : 1,
        },
        customStyle,
      ]}
    >
      <Icon name={iconName} color={'white'} size={34} />
    </Pressable>
  );
};

export default WhiteArrowButton;
