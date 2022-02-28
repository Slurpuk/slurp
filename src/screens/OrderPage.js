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
import pastOrders from '../fake-data/PastOrderData';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";

const Tab = createMaterialTopTabNavigator();

const OrderPage = () => {


  return (
    <NavigationContainer independent={true}>
      <View style={styles.container}>
        <GreenHeader headerText={'ORDERS'} />
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
          <Tab.Screen name="Current" component={CurrentOrders} />
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

const CurrentOrders = () => {

    const [currentOrders, setCurrentOrders] = useState([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Orders')
            .onSnapshot(querySnapshot => {
                const orders = []

                querySnapshot.forEach(documentSnapshot => {
                    ref=documentSnapshot.data().Items[0].path;
                    orders.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                //setCurrentOrders(orders);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


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
