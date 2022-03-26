import {Alert} from 'react-native';
import {AlertMessage} from './AlertMessages';

export const Alerts = {
  databaseErrorAlert: () => {
    Alert.alert(AlertMessage.DATABASE.title, AlertMessage.DATABASE.message);
  },
  connectionErrorAlert: () => {
    Alert.alert(AlertMessage.CONNECTION.title, AlertMessage.CONNECTION.message);
  },
  tooManyRequestsAlert: () => {
    Alert.alert(
      AlertMessage.MANY_REQUESTS.title,
      AlertMessage.MANY_REQUESTS.message,
    );
  },
  wrongCredentialsAlert: () => {
    Alert.alert(
      AlertMessage.WRONG_CREDENTIALS.title,
      AlertMessage.WRONG_CREDENTIALS.message,
    );
  },
  badEmailAlert: () => {
    Alert.alert(AlertMessage.BAD_EMAIL.title, AlertMessage.BAD_EMAIL.message);
  },
  wrongPasswordAlert: () => {
    Alert.alert(
      AlertMessage.WRONG_PASSWORD.title,
      AlertMessage.WRONG_PASSWORD.message,
    );
  },
  resetPasswordAlert: () => {
    Alert.alert(
      AlertMessage.RESET_PASSWORD.title,
      AlertMessage.RESET_PASSWORD.message,
    );
  },
  elseAlert: () => {
    Alert.alert(AlertMessage.ELSE.title, AlertMessage.ELSE.message);
  },
};
