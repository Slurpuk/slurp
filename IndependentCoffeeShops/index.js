/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import testers from './src/testers';

AppRegistry.registerComponent(appName, () => testers.MenuTester);
