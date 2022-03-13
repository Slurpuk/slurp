/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import WelcomePages from "./src/screens/WelcomePages";
import MenuTab from "./src/components/ShopMenu/MenuTab";

AppRegistry.registerComponent(appName, () => App);
