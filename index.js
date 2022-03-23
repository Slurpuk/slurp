/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const EMULATOR_MODE_ON = false;

if (__DEV__ && EMULATOR_MODE_ON) {
  auth().useEmulator('http://localhost:9099');
  firestore().useEmulator('localhost', 8080);
}

const db = firestore(); //I'm 99% certain we don't need this line.

AppRegistry.registerComponent(appName, () => App);
