/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

import testers from './src/testers';
import ShopPage from './src/components/shopPage';
import PaymentCardsPage from './src/screens/PaymentCardsPage'

AppRegistry.registerComponent(appName, () => PaymentCardsPage);
