import {Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {hasNotch} from 'react-native-device-info';

export const getPerfectPadding = () => {
  return Platform.OS === 'android' || hasNotch()
    ? getStatusBarHeight()
    : getStatusBarHeight() + 10;
};
