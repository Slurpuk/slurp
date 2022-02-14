/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import testers from './src/testers';
import ShopPage from './src/components/shopPage';
import SignUpPage from "./src/screens/SignUpPage";
import AddNewCardPage from "./src/screens/AddNewCardPage";

AppRegistry.registerComponent(appName, () => AddNewCardPage);
