/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import testers from "./src/testers";

AppRegistry.registerComponent(appName, () =>testers.NavigableLandingPage);

