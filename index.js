/**
 * @format
 */
//dvh
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import AddNewCardComponent from "./src/components/PaymentCards/AddNewCardComponent";
import BasketPage from "./src/screens/BasketPage";

AppRegistry.registerComponent(appName, () => App);
