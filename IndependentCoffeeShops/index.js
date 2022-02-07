/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import ShopPage from './src/components/shopPage';
import ShopIntro from './src/components/shopIntro';

AppRegistry.registerComponent(appName, () => ShopPage);
