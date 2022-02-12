/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import testers from './src/testers';
import ShopPage from './src/components/shopPage';

AppRegistry.registerComponent(appName, () => testers.ShopPageTester);
