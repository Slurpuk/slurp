import GreenHeader from '../sub-components/GreenHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CurrentOrders} from '../components/Orders/CurrentOrders';
import {PastOrders} from '../components/Orders/PastOrders';
import React, {useContext, useEffect, useState} from 'react';
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

/**
 * Screen displaying bot current and past orders
 * @param navigation The navigation object.
 */
const OrderPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const [pastOrders, setPastOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const Tab = createMaterialTopTabNavigator(); // Stack navigator for the tab screens

  /**
   * Side effect which subscribes to the Orders model and retrieves the current user's orders and formats them.
   */
  useEffect(() => {
    const fetchData = firestore()
      .collection('orders')
      .where('user', '==', context.currentUser.ref)
      .onSnapshot(async querySnapshot => {
        let newOrders = await separateOrders(querySnapshot);
        await formatCurrentOrders(newOrders.currentOrders, setCurrentOrders);
        await formatPastOrders(newOrders.pastOrders, setPastOrders);
      });
    return () => fetchData();
  }, [context.currentUser.ref]);

  return (
    <View style={styles.container}>
      <GreenHeader headerText={'ORDERS'} navigation={navigation} />
      <Tab.Navigator
        style={styles.navigatorContent}
        screenOptions={ScreenOptionsStyles}
      >
        <Tab.Screen name="Current">
          {() => (
            <CurrentOrders
              currentOrders={currentOrders}
              emptyText={emptyCurrentOrdersText}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() => (
            <PastOrders
              pastOrders={pastOrders}
              emptyText={emptyPastOrdersText}
            />
          )}
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
