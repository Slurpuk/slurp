import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

/*
Set up emulated DB
 */
if (__DEV__) {
  auth().useEmulator('http://localhost:9099');
  firestore().useEmulator('localhost', 8080);
}
const db = firestore();

/*
Workaround for NativeEventEmitter library
 */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');


/*
Workaround for Device-Info library
 */
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
jest.mock('react-native-device-info', () => mockRNDeviceInfo);

