import GreenHeader from '../sub-components/GreenHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CurrentOrders} from '../components/Orders/CurrentOrders';
import {PastOrders} from '../components/Orders/PastOrders';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GlobalContext} from '../../App';
import firestore from '@react-native-firebase/firestore';
import {ScreenOptionsStyles} from '../../stylesheets/ScreenOptionsStyles';
import {
  formatCurrentOrders,
  formatPastOrders,
  separateOrders,
} from '../helpers/screenHelpers';
import {emptyCurrentOrdersText, emptyPastOrdersText} from '../data/Texts';
import LoadingPage from './LoadingPage';

/**
 * Screen displaying bot current and past orders
 * @param navigation The navigation object.
 */
const OrderPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const [pastOrders, setPastOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const Tab = createMaterialTopTabNavigator(); // Stack navigator for the tab screens
  const loading = useRef({current: true, past: true});

  /**
   * Side effect which subscribes to the Orders model and retrieves the current user's orders and formats them.
   */
  useEffect(() => {
    let isActive = true;
    const fetchData = firestore()
      .collection('orders')
      .where('user', '==', context.currentUser.ref)
      .onSnapshot(async querySnapshot => {
        let newOrders = await separateOrders(querySnapshot);
        loading.current.current = true;
        let currOrders = await formatCurrentOrders(newOrders.currentOrders);
        if (isActive) {
          setCurrentOrders(currOrders);
          loading.current.current = false;
        }
        loading.current.past = true;
        let prevOrders = await formatPastOrders(newOrders.pastOrders);
        if (isActive) {
          console.log('fqwdwq');
          setPastOrders(prevOrders);
          loading.current.past = false;
        }
      });
    return () => {
      isActive = false;
      fetchData();
    };
  }, [context.currentUser.ref, loading]);

  return (
    <View style={styles.container}>
      <GreenHeader
        headerText={'ORDERS'}
        navigation={navigation}
        testID={'orders_page'}
      />
      <Tab.Navigator
        style={styles.navigatorContent}
        screenOptions={ScreenOptionsStyles}
      >
        <Tab.Screen name="Current">
          {() =>
            !loading.current.current ? (
              <CurrentOrders
                currentOrders={currentOrders}
                emptyText={emptyCurrentOrdersText}
              />
            ) : (
              <LoadingPage />
            )
          }
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() =>
            !loading.current.past ? (
              <PastOrders
                pastOrders={pastOrders}
                emptyText={emptyPastOrdersText}
              />
            ) : (
              <LoadingPage />
            )
          }
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEBE7',
  },
  navigatorContent: {
    paddingHorizontal: '5%',
    marginTop: '5%',
  },
});

export default OrderPage;
