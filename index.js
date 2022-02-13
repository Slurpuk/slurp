/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

import testers from './src/testers';
import ShopCard from './src/components/Shops/ShopCard';

AppRegistry.registerComponent(appName, () => testers.ShopPageTester);
