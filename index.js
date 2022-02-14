/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

import LandingMapPage from './src/screens/LandingMapPage';
import ShopList from "./src/components/Shops/ShopList";
import testers from "./src/testers";
import SlideBar from "./src/components/LandingMap/SlideBar";

AppRegistry.registerComponent(appName, () => SlideBar);
