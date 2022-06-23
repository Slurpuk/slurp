/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import App from './src/App';

const EMULATOR_MODE_ON = false;

if (__DEV__ && EMULATOR_MODE_ON) {
  try {
    auth().useEmulator('http://127.0.0.1:9099');
    firestore().useEmulator('127.0.0.1', 8080);
  } catch (e) {
    console.log(e);
  }
}

AppRegistry.registerComponent(appName, () => App);
