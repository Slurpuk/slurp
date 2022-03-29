/*
Mock firebase-react-native
*/
import * as ReactNative from 'react-native';

jest.doMock('react-native', () => {
  return Object.setPrototypeOf(
    {
      Platform: {
        OS: 'android',
        select: () => {},
      },
      NativeModules: {
        ...ReactNative.NativeModules,
        RNFBAnalyticsModule: {
          logEvent: jest.fn(),
        },
        RNFBAppModule: {
          NATIVE_FIREBASE_APPS: [
            {
              appConfig: {
                name: '[DEFAULT]',
              },
              options: {},
            },

            {
              appConfig: {
                name: 'secondaryFromNative',
              },
              options: {},
            },
          ],
          FIREBASE_RAW_JSON: '{}',
          addListener: jest.fn(),
          eventsAddListener: jest.fn(),
          eventsNotifyReady: jest.fn(),
          removeListeners: jest.fn(),
        },
        RNFBAuthModule: {
          APP_LANGUAGE: {
            '[DEFAULT]': 'en-US',
          },
          APP_USER: {
            '[DEFAULT]': 'jestUser',
          },
          addAuthStateListener: jest.fn(),
          addIdTokenListener: jest.fn(),
          useEmulator: jest.fn(),
        },
        RNFBCrashlyticsModule: {},
        RNFBDatabaseModule: {
          on: jest.fn(),
          useEmulator: jest.fn(),
        },
        RNFBFirestoreModule: {
          settings: jest.fn(),
          documentSet: jest.fn(),
        },
        RNFBMessagingModule: {
          onMessage: jest.fn(),
        },
        RNFBPerfModule: {},
        RNFBStorageModule: {
          useEmulator: jest.fn(),
        },
      },
    },
    ReactNative,
  );
});

// jest.mock('react-native-maps', () => {
//   return class MockMapView extends React.Component {
//     static Marker = props => React.createElement('Marker', props, props.children);
//     static propTypes = { children: React.PropTypes.any };
//
//     render() {
//       return React.createElement('MapView', this.props, this.props.children);
//     }
//   }
// });

jest.mock('react-native-maps', () => {
  const React = jest.requireActual('react');
  const MapView = jest.requireActual('react-native-maps');



  class MockCallout extends React.Component {
    render() {
      return React.createElement('Callout', this.props, this.props.children);
    }
  }

  class MockMarker extends React.Component {



    render() {
      return React.createElement('Marker', this.props, this.props.children);
    }
  }

  class MockMapView extends React.Component {
    render() {
      return React.createElement('MapView', this.props, this.props.children);
    }
  }

  MockCallout.propTypes = MapView.Callout.propTypes;
  MockMarker.propTypes = MapView.Marker.propTypes;
  MockMapView.propTypes = MapView.propTypes;
  MockMapView.Marker = MockMarker;
  MockMapView.Callout = MockCallout;
  return MockMapView;
});

jest.doMock('@react-native-firebase/firestore', () => {
  return () => ({
    collection: jest.fn(),
  });
});

/*
Mock stripe
 */
jest.mock('@stripe/stripe-react-native', () => ({
  StripeProvider: jest.fn(({children}) => children),
  CardField: jest.fn(() => null),
  presentPaymentSheet: jest.fn(),
  initPaymentSheet: jest.fn(),
  useStripe: jest.fn(() => mockHooks),
}));

/*
Mock stripe
 */
jest.mock('@stripe/stripe-react-native/src/components/StripeProvider', () => ({
  StripeProvider: jest.fn(({children}) => children),
  CardField: jest.fn(() => null),
  presentPaymentSheet: jest.fn(),
  initPaymentSheet: jest.fn(),
  useStripe: jest.fn(() => mockHooks),
}));

const mockFunctions = {
  createPaymentMethod: jest.fn(async () => ({
    paymentMethod: {},
    error: null,
  })),
  createToken: jest.fn(async () => ({
    token: {},
    error: null,
  })),
  retrievePaymentIntent: jest.fn(async () => ({
    paymentIntent: {},
    error: null,
  })),
  retrieveSetupIntent: jest.fn(async () => ({
    setupIntent: {},
    error: null,
  })),
  confirmPayment: jest.fn(async () => ({
    paymentMethod: {},
    error: null,
  })),
  isApplePaySupported: jest.fn(async () => true),
  presentApplePay: jest.fn(async () => ({
    error: null,
  })),
  updateApplePaySummaryItems: jest.fn(async () => ({})),
  confirmApplePayPayment: jest.fn(async () => ({})),
  handleNextAction: jest.fn(async () => ({
    paymentIntent: {},
    error: null,
  })),
  confirmSetupIntent: jest.fn(async () => ({
    setupIntent: {},
    error: null,
  })),
  createTokenForCVCUpdate: jest.fn(async () => ({
    tokenId: '123',
    error: null,
  })),
  handleURLCallback: jest.fn(async () => true),
  presentPaymentSheet: jest.fn(async () => ({
    paymentOption: {},
    error: null,
  })),
  confirmPaymentSheetPayment: jest.fn(async () => ({
    error: null,
  })),
  initGooglePay: jest.fn(async () => ({
    error: null,
  })),
  presentGooglePay: jest.fn(async () => ({
    error: null,
  })),
  createGooglePayPayment: jest.fn(async () => ({
    paymentMethod: {},
    error: null,
  })),
  openApplePaySetup: jest.fn(async () => ({
    error: null,
  })),
  initPaymentSheet: jest.fn(async () => ({
    paymentOption: {},
    error: null,
  })),
};

const mockHooks = {
  useConfirmPayment: jest.fn(() => ({
    confirmPayment: jest.fn(() => ({
      ...mockFunctions.confirmPayment(),
    })),
  })),
  useConfirmSetupIntent: jest.fn(() => ({
    confirmSetupIntent: jest.fn(() => ({
      ...mockFunctions.confirmSetupIntent(),
    })),
  })),
  useGooglePay: jest.fn(() => ({
    loading: false,
    initGooglePay: jest.fn(async () => ({
      ...mockFunctions.initGooglePay(),
    })),
    presentGooglePay: jest.fn(async () => ({
      ...mockFunctions.presentGooglePay(),
    })),
    createGooglePayPaymentMethod: jest.fn(async () => ({
      ...mockFunctions.createGooglePayPayment(),
    })),
  })),
  useApplePay: jest.fn(() => ({
    loading: false,
    isApplePaySupported: true,
    presentApplePay: jest.fn(async () => ({
      ...mockFunctions.presentApplePay(),
    })),
    confirmApplePayPayment: jest.fn(async () => ({
      ...mockFunctions.confirmApplePayPayment(),
    })),
    openApplePaySetup: jest.fn(async () => ({
      ...mockFunctions.openApplePaySetup(),
    })),
  })),
  usePaymentSheet: jest.fn(() => ({
    loading: false,
    initPaymentSheet: jest.fn(async () => ({
      ...mockFunctions.initPaymentSheet(),
    })),
    presentPaymentSheet: jest.fn(async () => ({
      ...mockFunctions.presentPaymentSheet(),
    })),
    confirmPaymentSheetPayment: jest.fn(async () => ({
      ...mockFunctions.confirmPaymentSheetPayment(),
    })),
  })),
};

module.exports = {
  ...mockFunctions,
  ...mockHooks,
  StripeProvider: () => 'StripeProvider',
  CardField: () => 'CardField',
  ApplePayButton: () => 'ApplePayButton',
  AuBECSDebitForm: () => 'AuBECSDebitForm',
  GooglePayButton: () => 'GooglePayButton',
  useStripe: jest.fn(() => mockHooks),
};

/*
Mock for NativeEventEmitter library
 */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

/*
Mock for Device-Info library
 */
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
jest.mock('react-native-device-info', () => mockRNDeviceInfo);

/*
Mock for RNReanimated
 */
global.__reanimatedWorkletInit = jest.fn();

/*
Mock for RNNavigation
 */
import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

/*
Mock for RNAsync-Storage
 */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

//mock for location permission
jest.mock("react-native-permissions", () =>
    require("react-native-permissions/mock")
)

/*
Simulates timers used for animations etc.
 */
jest.useFakeTimers();
