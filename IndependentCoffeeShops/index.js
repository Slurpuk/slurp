/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import App from './App';
import {name as appName} from './app.json';
import testers from './src/testers';
import SlideBar from "./src/SlideBar";
import SlideBarHeader from "./src/SlideBarHeader";

AppRegistry.registerComponent(appName, () => SlideBarHeader);
