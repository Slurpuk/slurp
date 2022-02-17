/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import AnimatedCard from "./src/sub-components/AnimatedCard";

AppRegistry.registerComponent(appName, () => AnimatedCard);