/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

import testers from './src/testers';
import ShopPage from './src/components/shopPage';

import LandingMapPage from "./src/screens/LandingMapPage";
import MapPage from './src/components/MapPage';

AppRegistry.registerComponent(appName, () =>LandingMapPage);

