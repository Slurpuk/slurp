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
  const [pastOrders2, setPastOrders] = useState();
  let [currentOrders, setCurrentOrders] = useState();

  useEffect(() => {

    const fetchData = async () => {
      firestore()
        .collection('Orders')
        .onSnapshot(querySnapshot => {
          const currentOrders = [];
          const pastOrders = [];
          querySnapshot.forEach(documentSnapshot => {
            // get order data
            let order = {
              ...documentSnapshot.data(),
              key: documentSnapshot.key,
            };

            // de-reference items
            let items = [];

            order.Items.forEach(item => {
              firestore()
                .doc(item.Coffee)
                .onSnapshot(querySnapshot => {
                  item.Coffee = {
                    ...querySnapshot.data(),
                    key: querySnapshot.key,
                  };
                  items.push(item);
                  order.Items = items;
                });
            });

            // de-reference the shop

            let shop;
            firestore()
              .doc(order.ShopID)
              .onSnapshot(querySnapshot => {
                shop = {...querySnapshot.data()};
                order.ShopID = shop;
              });

            // de-reference the user (not yet feasible)
            // sort to current and past
            if (order.Status === 'incoming' || order.Status === 'accepted') {
              currentOrders.push(order);
            } else {
              pastOrders.push(order);
            }
          });
          setCurrentOrders(currentOrders);
          setPastOrders(pastOrders);
        });
    }
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
          {/*<Tab.Screen name="Past" component={PastOrders} />*/}
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};

// const PastOrders = () => {
//   return (
//     <SectionList
//       contentContainerStyle={styles.mainContainer}
//       sections={pastOrders}
//       stickySectionHeadersEnabled={false}
//       keyExtractor={(item, index) => item + index}
//       renderItem={({item}) => <CollapsedOrder order={item} />}
//       renderSectionHeader={({section: {period}}) => (
//         <Text style={[textStyles.darkGreyPoppinsHeading, styles.periodHeader]}>
//           {period}
//         </Text>
//       )}
//     />
//   );
// };

const CurrentOrders = currentOrders => {
  return (
    <FlatList
      contentContainerStyle={styles.mainContainer}
      data={currentOrders.currentOrders}
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
