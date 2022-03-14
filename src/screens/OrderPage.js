import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  FlatList,
  Dimensions,
} from 'react-native';
import CollapsedOrder from '../components/Orders/CollapsableOrder';
import textStyles from '../../stylesheets/textStyles';
import GreenHeader from '../sub-components/GreenHeader';
//import pastOrders from '../fake-data/PastOrderData';
// import currentOrders from '../fake-data/CurrentOrderData';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const Tab = createMaterialTopTabNavigator();

const OrderPage = ({navigation}) => {
  const [pastOrders, setPastOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      firestore()
        .collection('Orders')
        .onSnapshot(querySnapshot => {
          let currentOrdersLocal = [];
          let pastOrdersLocal = [];
          querySnapshot.forEach(documentSnapshot => {
            let order = {};
            // get order data
            let firebaseOrder = {
              ...documentSnapshot.data(),
              key: documentSnapshot.key,
            };

            order.fire = firebaseOrder;

            // de-reference items
            let items = [];

            // make the structure suitable for section list
            let months = [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ];
            order.period =
              months[firebaseOrder.DateTime.toDate().getMonth()] +
              ' ' +
              firebaseOrder.DateTime.toDate().getFullYear();

            firebaseOrder.Items.forEach(item => {
              let newItem = {};
              newItem.quantity = item.Quantity;
              firestore()
                .doc(item.Coffee)
                .onSnapshot(query => {
                  newItem.coffee = {
                    ...query.data(),
                    key: query.key,
                  };
                });
              items.push(newItem);
            });

            order.data = items;

            // make data suitable for section list
            // order.data = order.Items;
            // delete order.Items;

            // de-reference the shop

            // let shop;
            firestore()
              .doc(firebaseOrder.ShopID)
              .onSnapshot(query => {
                order.shop = {...query.data()};
              });

            // de-reference the user (not yet feasible)
            // sort to current and past
            // currentOrdersLocal.push(order);
            if (firebaseOrder.Status === 'rejected') {
              pastOrdersLocal.push(order);
            } else {
              currentOrdersLocal.push(order);
            }
          });
          // console.log("CURRENT ORDERS")
          // console.log(currentOrdersLocal);
          // console.log("PAST ORDERS")
          // console.log(pastOrdersLocal);
          setCurrentOrders(currentOrdersLocal);
          setPastOrders(pastOrdersLocal);
        });
      console.log('LOOOL', currentOrders);
    };
    fetchData().then(r => console.log('got data'));
  }, []);

  return (
    <NavigationContainer independent={true}>
      <View style={styles.container}>
        <GreenHeader headerText={'ORDERS'} navigation={navigation} />
        <Tab.Navigator
          style={styles.basket}
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 17,
              fontFamily: 'Poppins-SemiBold',
              textTransform: 'capitalize',
            },
            tabBarIndicatorStyle: {
              top: 0,
              height: null,
              backgroundColor: '#046D66',
              borderRadius: 13,
            },
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#6D6D6D',
            tabBarStyle: {
              borderRadius: 13,
              height: 50,
              backgroundColor: '#E5E5E5',
            },
          }}>
          <Tab.Screen name="Current">
            {props => (
              <CurrentOrders {...props} currentOrders={currentOrders} />
            )}
          </Tab.Screen>
          <Tab.Screen name="Past">
            {props => <PastOrders {...props} pastOrders={pastOrders} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};


const PastOrders = pastOrders => {

  // console.log('past data');
  // console.log(pastOrders.pastOrders);
  return (
    // <SectionList
    //   contentContainerStyle={styles.mainContainer}
    //   sections={pastOrders.pastOrders}
    //   stickySectionHeadersEnabled={false}
    //   keyExtractor={(item, index) => item + index}
    //   renderItem={({item}) => <CollapsedOrder order={item} />}
    //   renderSectionHeader={({section: {period}}) => (
    //     <Text style={[textStyles.darkGreyPoppinsHeading, styles.periodHeader]}>
    //       {period}
    //     </Text>
    //   )}
    // />
    <FlatList
      contentContainerStyle={styles.mainContainer}
      data={pastOrders}
      renderItem={({item}) => <CollapsedOrder order={item} />}
    />
  );
};

const CurrentOrders = currentOrders => {
  // console.log('current data');
  // console.log(currentOrders);
  return (
    <FlatList
      contentContainerStyle={styles.mainContainer}
      data={currentOrders}
      renderItem={({item}) => <CollapsedOrder order={item} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  basket: {
    marginHorizontal: '5%',
    marginTop: '5%',
    fontFamily: 'Poppins-SemiBold',
  },
  periodHeader: {
    marginLeft: 7,
    marginTop: 20,
  },
  mainContainer: {
    paddingBottom: '5%',
  },
});

export default OrderPage;
