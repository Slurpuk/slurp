import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text, SectionList} from 'react-native';
import CollapsedOrder from '../components/Orders/CollapsableOrder';
import textStyles from '../../stylesheets/textStyles';
import GreenHeader from '../sub-components/GreenHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import firestore from '@react-native-firebase/firestore';
import {GlobalContext} from '../../App';

const Tab = createMaterialTopTabNavigator();

const OrderPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const [pastOrders, setPastOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [fpastOrders, fsetPastOrders] = useState([]);
  const [fcurrentOrders, fsetCurrentOrders] = useState([]);

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
        });
          fsetCurrentOrders(currentOrdersLocal);
          fsetPastOrders(pastOrdersLocal);
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
    let periods = [];
    if (!isCurrent) {
      formattedOrders.forEach(order => {
        if (!periods.find(x => x.period === order.period)) {
          periods.push(order.period);
        }
      });
    }
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
        } else if (item.Type === 'Drink') {
          await firestore()
            .collection('Drinks')
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
        } else if (item.Type === 'Snack') {
          await firestore()
            .collection('Snacks')
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
          if (isCurrent) {
            newOrders.push(temp);
          } else {
            let curr = newOrders.find(x => x.period === temp.period);
            curr
              ? curr.data.push(temp)
              : newOrders.push({period: temp.period, data: [temp]});
          }
          isCurrent ? setCurrentOrders(newOrders) : setPastOrders(newOrders);
        });
    });
  }

  return (
    <View style={styles.container}>
      <GreenHeader headerText={'ORDERS'} navigation={navigation} />
      <Tab.Navigator
        style={styles.navigatorContent}
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            letterSpacing: 0.3,
            textTransform: 'capitalize',
            transform: [{translateY: -7}],
          },
          tabBarIndicatorStyle: {
            top: 0,
            height: null,
            backgroundColor: '#046D66',
            borderRadius: 13,
          },
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#6D6D6D',
          tabBarStyle: {
            borderRadius: 13,
            height: 42,
            backgroundColor: '#E5E5E5',
            elevation: 0,
            borderColor: '#919191',
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
  );
};

const PastOrders = props => {
  const numOrders = props.pastOrders.length;
  return (
    <>
      {numOrders !== 0 ? (
        <SectionList
          contentContainerStyle={styles.mainContainer}
          sections={props.pastOrders}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <CollapsedOrder order={item} />}
          renderSectionHeader={({section: {period}}) => (
            <Text
              style={[textStyles.darkGreyPoppinsHeading, styles.periodHeader]}>
              {period}
            </Text>
          )}
        />
      ) : (
        <EmptyText />
      )}
    </>
  );
};

const CurrentOrders = props => {
  const numOrders = props.currentOrders.length;
  return (
    <>
      {numOrders !== 0 ? (
        <FlatList
          contentContainerStyle={styles.mainContainer}
          data={props.currentOrders}
          renderItem={({item}) => <CollapsedOrder order={item} />}
        />
      ) : (
        <EmptyText />
      )}
    </>
  );
};

const EmptyText = () => {
  return (
    <Text
      style={[
        styles.mainContainer,
        styles.emptyText,
        textStyles.darkGreyPoppinsSubHeading,
      ]}>
      Looks like you haven't made any orders yet... {'\n \n'} Head over to the
      home page to get started!
    </Text>
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
  periodHeader: {
    marginLeft: 6,
    marginTop: 20,
  },
  mainContainer: {
    backgroundColor: '#EDEBE7',
    flexGrow: 1,
  },

  emptyText: {
    paddingTop: '15%',
    paddingHorizontal: '2%',
    textAlign: 'center',
  },
});

export default OrderPage;
