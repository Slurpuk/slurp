import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Text, SectionList} from 'react-native';
import CollapsedOrder from '../components/Orders/CollapsableOrder';
import textStyles from '../../stylesheets/textStyles';
import GreenHeader from '../sub-components/GreenHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import firestore from '@react-native-firebase/firestore';
import {GlobalContext} from '../../App';
import EmptyListText from '../sub-components/EmptyListText';

const Tab = createMaterialTopTabNavigator();

const OrderPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const [pastOrders, setPastOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const emptyText =
    "Looks like you haven't made any orders yet...\n\nHead over to the " +
    'home page to get started!';

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
        formatOrders(currentOrdersLocal, true);
        formatOrders(pastOrdersLocal, false);
      });
    return () => fetchData();
  }, [context.userRef]);

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
        await firestore()
          .collection(item.Type + 's')
          .doc(item.ItemRef)
          .get()
          .then(doc => {
            newItem = {
              ...doc.data(),
              type: item.Type,
              key: doc.id,
              quantity: item.Quantity,
              options: item.Options,
            };
            newItems.push(newItem);
          })
          .catch(error => console.log(error));
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
        })
        .catch(error => console.log(error));
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
          {props => (
            <CurrentOrders
              currentOrders={currentOrders}
              emptyText={emptyText}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {props => (
            <PastOrders pastOrders={pastOrders} emptyText={emptyText} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const PastOrders = props => {
  return (
    <>
      <SectionList
        contentContainerStyle={styles.mainContainer}
        sections={props.pastOrders}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <CollapsedOrder order={item} />}
        ListEmptyComponent={EmptyListText(props.emptyText)}
        renderSectionHeader={({section: {period}}) => (
          <Text
            style={[textStyles.darkGreyPoppinsHeading, styles.periodHeader]}>
            {period}
          </Text>
        )}
      />
    </>
  );
};

const CurrentOrders = props => {
  return (
    <>
      <FlatList
        contentContainerStyle={styles.mainContainer}
        data={props.currentOrders}
        renderItem={({item}) => <CollapsedOrder order={item} />}
        ListEmptyComponent={EmptyListText(props.emptyText)}
      />
    </>
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
});

export default OrderPage;
