/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Example from './components/BottomSheetV2';
import {name as appName} from './app.json';

import testers from './src/testers';
import ShopPage from './src/components/shopPage';
import BottomSheetV2 from './components/BottomSheetV2';

AppRegistry.registerComponent(appName, () => testers.ShopPageTester);
