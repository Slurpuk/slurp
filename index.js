/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import WelcomePages from "./src/screens/WelcomePages";
import LandingMapPage from "./src/screens/LandingMapPage";
import testers from "./src/testers";
import MapBackground from "./src/components/LandingMap/MapBackground";
import PaymentPage from "./src/screens/PaymentPage";
import PaymentScreen from "./src/components/PaymentCards/PaymentScreen";

AppRegistry.registerComponent(appName, () => PaymentPage);
