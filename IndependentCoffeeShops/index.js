/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import MenuList from './src/components/MenuList';
import Menus from "./src/components/menus";
import TabBar from "./src/components/ScrollableSectionsTab";
import optionsPopup from "./src/components/optionsPopup";

AppRegistry.registerComponent(appName, () => Menus);
