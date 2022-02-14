/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

import LandingMapPage from './src/screens/LandingMapPage';
import ShopList from "./src/components/Shops/ShopList";
import testers from "./src/testers";

AppRegistry.registerComponent(appName, () => testers.ShopListTester);
