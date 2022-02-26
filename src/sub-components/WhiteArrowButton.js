import React, {useEffect} from 'react';
import {BackHandler, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WhiteArrowButton = ({
  direction = 'back',
  navigation,
  onPressAction = null,
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
    if (onPressAction != null) onPressAction();
    else navigation.goBack();
  }
  //
  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
  //   return () => {
  //     BackHandler.removeEventListener(
  //       'hardwareBackPress',
  //       handleBackButtonClick,
  //     );
  //   };
  // }, []);



  return (
    <Pressable
      underlayColor={'transparent'}
      onPress={handleBackButtonClick}
      style={({pressed}) => [
        {
          underlayColor: 'gray',
          opacity: pressed ? 0.6 : 1,
        },
      ]}>
      <Icon name={iconName} color={'white'} size={34} />
    </Pressable>
  );
};

export default WhiteArrowButton;
