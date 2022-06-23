import 'react-native-gesture-handler';
import React, {useContext, useEffect, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HamburgerSlideBarNavigator from './navigation/HamburgerSlideBarNavigator';
import SignUpPage from './screens/SignUpPage';
import LogInPage from './screens/LogInPage';
import WelcomePages from './screens/WelcomePages';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import LoadingPage from './screens/LoadingPage';
import {Alerts} from './data/Alerts';
import {
  formatCurrentOrders,
  formatOrders,
  formatPastOrders,
  getFormattedShops,
  loginUser,
  logoutUser,
  refreshOrders,
  refreshCurrentShop,
} from './helpers/screenHelpers';
import {getIsFirstTime, refreshCurrentBasket} from './helpers/storageHelpers';
import {firebase} from '@react-native-firebase/database';
import {GlobalAction} from './data/actionEnum';
import {GlobalContext} from './contexts';
import {globalReducer} from './reducers';
import {CurrentOrderStatuses, PastOrderStatuses} from './data/OrderStatus';

/**
 * Root component rendered when the application boots.
 */
export default function App() {
  const initialState = useContext(GlobalContext);
  const [globalState, globalDispatch] = useReducer(globalReducer, initialState);
  const LoggedOutStack = createNativeStackNavigator(); // Stack navigator for logged out users.
  const DB_URL =
    'https://slurp-59784-default-rtdb.europe-west1.firebasedatabase.app/';

  /**
   * Side effect that fires when App first renders to determine whether it is the first time the app is used since download
   * Sets the first time state accordingly.
   */
  useEffect(() => {
    async function setIsFirstTime() {
      const isFirstTime = await getIsFirstTime();
      if (!isFirstTime) {
        globalDispatch({type: GlobalAction.USE_APP});
      }
    }

    setIsFirstTime().catch(() => Alerts.elseAlert());
  }, []);

  /**
   * Side effect that tracks the authentication state of the current user.
   * Sets the current user object accordingly.
   */
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        await loginUser(user, globalDispatch);
      } else {
        await logoutUser(globalDispatch);
      }
    });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  /**
   * Side effect that tracks changes in the model instance of the user in the database and updates the state accordingly
   * Sets the current user object accordingly.
   */
  useEffect(() => {
    if (!globalState.isLoadingUser) {
      const subscriber = firestore()
        .collection('users')
        .where('email', '==', auth().currentUser.email)
        .onSnapshot(query => {
          let newUserDoc = query.docs[0];
          let newUser = newUserDoc.data();
          globalDispatch({
            type: GlobalAction.SET_CURRENT_USER,
            user: {...newUser, key: newUserDoc.id, ref: newUserDoc.ref},
          });
        });
      return () => subscriber();
    }
  }, [globalState.isLoadingUser]);

  /**
   * Side effect that tracks changes in the current orders of the logged-in user.
   */
  useEffect(() => {
    if (!globalState.isLoadingUser) {
      const subscriber = firestore()
        .collection('orders')
        .where('is_displayed', '==', true)
        .where('user', '==', globalState.currentUserRef)
        .where('status', 'in', CurrentOrderStatuses)
        .onSnapshot(async query => {
          let currentOrders = await formatCurrentOrders(
            formatOrders(query.docs),
          );
          globalDispatch({
            type: GlobalAction.SET_CURRENT_ORDERS,
            orders: currentOrders,
          });
        });
      return () => subscriber();
    }
  }, [globalState.currentUserRef, globalState.isLoadingUser]);

  /**
   * Side effect that tracks changes in the past orders of the logged-in user.
   */
  useEffect(() => {
    if (!globalState.isLoadingUser) {
      const subscriber = firestore()
        .collection('orders')
        .where('is_displayed', '==', true)
        .where('user', '==', globalState.currentUserRef)
        .where('status', 'in', PastOrderStatuses)
        .onSnapshot(async query => {
          let pastOrders = await formatPastOrders(formatOrders(query.docs));
          globalDispatch({
            type: GlobalAction.SET_PAST_ORDERS,
            orders: pastOrders,
          });
        });
      return () => subscriber();
    }
  }, [globalState.currentUserRef, globalState.isLoadingUser]);

  /**
   * Side effect that tracks any change in the coffee shop model.
   * Retrieves the latest shop data, formats it and updates the current set of shops.
   */
  useEffect(() => {
    if (!globalState.isLoadingUser) {
      const subscriber = firestore()
        .collection('coffee_shops')
        .onSnapshot(async querySnapshot => {
          let formattedShops = await getFormattedShops(querySnapshot);
          globalDispatch({
            type: GlobalAction.SET_LIST_OF_SHOPS,
            shops: formattedShops,
          });
          await refreshCurrentShop(
            formattedShops,
            globalState.currentShopKey,
            globalDispatch,
          );
        });
      // Unsubscribe from events when no longer in use
      return () => subscriber();
    }
  }, [globalState.currentShopKey, globalState.isLoadingUser]);

  /**
   * Side effect that refreshes the logged-in user's data once the App loads.
   */
  useEffect(() => {
    async function refreshUserData() {
      if (!globalState.isLoadingUser) {
        await refreshCurrentBasket(globalDispatch);
        await refreshOrders(globalState.currentUserRef, globalDispatch);
      }
    }

    refreshUserData().then(() => console.log('refreshed'));
  }, [globalState.currentUserRef, globalState.isLoadingUser]);

  /**
   * Side effect that tracks the connection state of the app.
   */
  useEffect(() => {
    if (!globalState.isLoadingUser) {
      const uid = firebase.auth().currentUser.uid;

      const userStatusFirestoreRef = firestore()
        .collection('connection_status')
        .doc(uid);

      const userStatusDatabaseRef = firebase
        .app()
        .database(DB_URL)
        .ref('/status/' + uid);

      const isOfflineForDatabase = {
        status: 'offline',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };
      const isOnlineForDatabase = {
        status: 'online',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      };
      const isOfflineForFirestore = {
        status: 'offline',
        last_changed: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const isOnlineForFirestore = {
        status: 'online',
        last_changed: firebase.firestore.FieldValue.serverTimestamp(),
      };

      firebase
        .app()
        .database(DB_URL)
        .ref('.info/connected')
        .on('value', function (snapshot) {
          if (snapshot.val() === false) {
            userStatusFirestoreRef.set(isOfflineForFirestore);
            return;
          }
          userStatusDatabaseRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(async function () {
              userStatusDatabaseRef.set(isOnlineForDatabase);
              await userStatusFirestoreRef.set(isOnlineForFirestore);
            });
        });

      const subscriber = userStatusFirestoreRef.onSnapshot(function (doc) {
        const isOnline = doc.data().status === 'online';
        isOnline
          ? globalDispatch({type: GlobalAction.CONNECT})
          : globalDispatch({type: GlobalAction.DISCONNECT});
      });

      return () => subscriber();
    }
  }, [globalState.isLoadingUser]);

  return (
    <GlobalContext.Provider value={{globalState, globalDispatch}}>
      <NavigationContainer>
        {!globalState.isLoadingUser ? (
          <HamburgerSlideBarNavigator />
        ) : auth().currentUser ? (
          <LoadingPage />
        ) : (
          <LoggedOutStack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            {!globalState.isFirstTime ? (
              <LoggedOutStack.Screen name="Welcome" component={WelcomePages} />
            ) : null}
            <LoggedOutStack.Screen
              name="LogIn"
              children={props => <LogInPage {...props} />}
            />
            <LoggedOutStack.Screen
              name="SignUp"
              children={props => <SignUpPage {...props} />}
            />
          </LoggedOutStack.Navigator>
        )}
      </NavigationContainer>
    </GlobalContext.Provider>
  );
}
