/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import PaymentPage from "./src/screens/PaymentPage";


AppRegistry.registerComponent(appName, () => PaymentPage);
