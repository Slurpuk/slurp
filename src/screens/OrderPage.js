import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import CollapsedOrder from '../components/Orders/CollapsableOrder';
import GreenHeader from '../sub-components/GreenHeader';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import firestore from '@react-native-firebase/firestore';

const Tab = createMaterialTopTabNavigator();

const OrderPage = ({navigation}) => {
  // const context = useContext(GlobalContext)
  const [pastOrders, setPastOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [fpastOrders, fsetPastOrders] = useState([]);
  const [fcurrentOrders, fsetCurrentOrders] = useState([]);
  useEffect(() => {
    const fetchData = firestore()
      .collection('Orders')
      // .where('UserID', '==', context.userRef)
      .onSnapshot(querySnapshot => {
        let currentOrdersLocal = [];
        let pastOrdersLocal = [];
        querySnapshot.forEach(documentSnapshot => {
          let firebaseOrder = {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };

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
          firebaseOrder.period =
            months[firebaseOrder.DateTime.toDate().getMonth()] +
            ' ' +
            firebaseOrder.DateTime.toDate().getFullYear();

          if (
            firebaseOrder.Status === 'rejected' ||
            firebaseOrder.Status === 'collected'
          ) {
            pastOrdersLocal.push(firebaseOrder);
          } else {
            currentOrdersLocal.push(firebaseOrder);
          }
          fsetCurrentOrders(currentOrdersLocal);
          fsetPastOrders(pastOrdersLocal);
        });
      });

    return () => fetchData();
  }, []);

  useEffect(() => {
    formatOrders(fcurrentOrders, true);
  }, [fcurrentOrders]);

  useEffect(() => {
    formatOrders(fpastOrders, false);
  }, [fpastOrders]);

  function formatOrders(formattedOrders, isCurrent) {
    let newOrders = [];
    formattedOrders.forEach(async order => {
      let temp = order;
      let newItems = [];
      for (let item of temp.Items) {
        let newItem;
        if (item.Type === 'Coffee') {
          await firestore()
            .collection('Coffees')
            .doc(item.ItemRef)
            .get()
            .then(doc => {
              newItem = {
                ...doc.data(),
                type: item.Type,
                key: doc.id,
                quantity: item.Quantity,
              };
              newItems.push(newItem);
            });
        }
      }
      temp.Items = newItems;
      await firestore()
        .collection('CoffeeShop')
        .doc(order.ShopID)
        .get()
        .then(document => {
          temp.shop = {...document.data()};
          newOrders.push(temp);
          isCurrent ? setCurrentOrders(newOrders): setPastOrders(newOrders);
        });
    });
  }

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
            {props => <CurrentOrders currentOrders={currentOrders} />}
          </Tab.Screen>
          <Tab.Screen name="Past">
            {props => <PastOrders pastOrders={pastOrders} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

const PastOrders = props => {
  return (
    <FlatList
      contentContainerStyle={styles.mainContainer}
      data={props.pastOrders}
      renderItem={({item}) => <CollapsedOrder order={item} />}
    />
  );
};

const CurrentOrders = props => {
  return (
    <FlatList
      contentContainerStyle={styles.mainContainer}
      data={props.currentOrders}
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
