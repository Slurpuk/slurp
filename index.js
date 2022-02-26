/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import SignUpPage from "./src/screens/SignUpPage";
import LogInPage from "./src/screens/LogInPage";
import testers from "./src/testers";
import BasketPage from "./src/screens/BasketPage";
import UpdateDetailsPage from "./src/screens/UpdateDetailsPage";
import ChangePasswordPage from "./src/screens/ChangePasswordPage";
import PaymentCardsPage from "./src/screens/PaymentCardsPage";
import AddNewCardPage from "./src/screens/AddNewCardPage";
import OrderPage from "./src/screens/OrderPage";

AppRegistry.registerComponent(appName, () => OrderPage);
