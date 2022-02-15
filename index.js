/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';


import UpdateDetailsForm from './src/components/UserManagement/UpdateDetailsForm';

AppRegistry.registerComponent(appName, () => UpdateDetailsForm);

