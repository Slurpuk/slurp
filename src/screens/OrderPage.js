import GreenHeader from '../sub-components/GreenHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CurrentOrders} from '../components/Orders/CurrentOrders';
import {PastOrders} from '../components/Orders/PastOrders';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {GlobalContext} from '../../App';
import firestore from '@react-native-firebase/firestore';
import {months} from '../data/Months';
import {ScreenOptionsStyles} from '../../stylesheets/ScreenOptionsStyles';
import {OrderStatus} from '../data/OrderStatus';
import {formatOrders} from '../helpers/ScreensFunctions';

const Tab = createMaterialTopTabNavigator();

const OrderPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const [pastOrders, setPastOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const emptyText =
    "Looks like you haven't made any orders yet...\n\n Head over to the " +
    'home page to get started!';

  // load the logged-in user's orders from database
  useEffect(() => {
    const fetchData = firestore()
      .collection('Orders')
      .where('UserID', '==', context.userRef)
      .onSnapshot(querySnapshot => {
        let currentOrdersLocal = [];
        let pastOrdersLocal = [];
        querySnapshot.forEach(documentSnapshot => {
          let firebaseOrder = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };

          firebaseOrder.period =
            months[firebaseOrder.DateTime.toDate().getMonth()] +
            ' ' +
            firebaseOrder.DateTime.toDate().getFullYear();

          if (
            firebaseOrder.Status === OrderStatus.REJECTED ||
            firebaseOrder.Status === OrderStatus.COLLECTED
          ) {
            pastOrdersLocal.push(firebaseOrder);
          } else {
            currentOrdersLocal.push(firebaseOrder);
          }
        });
        formatOrders(currentOrdersLocal, true, setCurrentOrders, setPastOrders);
        formatOrders(pastOrdersLocal, false, setCurrentOrders, setPastOrders);
      });
    return () => fetchData();
  }, [context.userRef]);

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
              emptyText={emptyText}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() => <PastOrders pastOrders={pastOrders} emptyText={emptyText} />}
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
