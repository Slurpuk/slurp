/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import testers from "./src/testers";
import RegisterEmailPassword from "./src/firebase/authentication/registerEmailPassword";
import LandingMapPage from "./src/screens/LandingMapPage";
import MapBackground from "./src/components/LandingMap/MapBackground";
// import Query from "./src/firebase/firestore/basicQuery";

// AppRegistry.registerComponent(appName, () => testers.NavigableLandingPage);
AppRegistry.registerComponent(appName, () => MapBackground);
