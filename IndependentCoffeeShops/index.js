/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './components/WelcomeSlider';
import {name as appName} from './app.json';
import welcomeSlider from "./components/WelcomeSlider";


AppRegistry.registerComponent(appName, () => welcomeSlider);
