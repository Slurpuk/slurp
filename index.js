/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import testers from "./src/testers";
import WelcomePages from "./src/screens/WelcomePages";

AppRegistry.registerComponent(appName, () =>WelcomePages);

