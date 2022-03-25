import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const EMULATOR_MODE_ON = true;

/*
Set up emulated DB
 */
// if (__DEV__) {
//   auth().useEmulator('http://localhost:9099');
//   firestore().useEmulator('localhost', 8080);
// }
//
// const db = firestore();

/*
Workaround for NativeEventEmitter library
 */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

/*
Workaround for Device-Info library
 */
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
jest.mock('react-native-device-info', () => mockRNDeviceInfo);

/*
Workaround for RNReanimated
 */
global.__reanimatedWorkletInit = jest.fn();

/*
Workaround for RNNavigation
 */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


/*
Workaround for RNAsync-Storage
 */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
