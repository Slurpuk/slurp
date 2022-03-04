/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import MapBackground from "./src/components/LandingMap/MapBackground";

AppRegistry.registerComponent(appName, () => App);
