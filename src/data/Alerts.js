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

  LocationAlert: () => {
    Alert.alert(AlertMessage.LOCATION.title, AlertMessage.LOCATION.message, [
      {
        text: 'OK',
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  },

  StorageAlert: tryAgain => {
    Alert.alert(AlertMessage.STORAGE.title, AlertMessage.STORAGE.message, [
      {
        text: 'OK',
        onPress: () => tryAgain,
      },
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  },

  changeShopAlertV1: (switchShop, newShop, openBotttomSheet) => {
    Alert.alert(
      AlertMessage.CHANGE_SHOP.title,
      AlertMessage.CHANGE_SHOP.message,
      [
        {
          text: 'Yes',
          onPress: () => switchShop(newShop),
        },
        {
          text: 'No',
          onPress: () => openBotttomSheet,
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  },

  changeShopAlertV2: (switchShop, newShop, navigation) => {
    Alert.alert(
      AlertMessage.CHANGE_SHOP.title,
      AlertMessage.CHANGE_SHOP.message,
      [
        {
          text: 'Yes',
          onPress: () => switchShop(newShop, navigation),
        },
        {
          text: 'No',
          onPress: () => navigation.navigate('Shop page'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  },

  networkAlert: () => {
    Alert.alert(AlertMessage.NETWORK.title, AlertMessage.NETWORK.message);
  },

  emptyBasketAlert: () => {
    Alert.alert(
      AlertMessage.EMPTY_BASKET.title,
      AlertMessage.EMPTY_BASKET.message,
    );
  },

  orderSentAlert: navigation => {
    Alert.alert(
      AlertMessage.ORDER_SENT.title,
      AlertMessage.ORDER_SENT.message,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Order history'),
        },
      ],
    );
  },

  logoutAlert: logout => {
    Alert.alert(AlertMessage.LOGOUT.title, AlertMessage.LOGOUT.message, [
      {text: 'Yes', onPress: () => logout()},
      {
        text: 'No',
        style: 'cancel',
      },
    ]);
  },
};
