import GreenHeader from '../sub-components/GreenHeader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CurrentOrders} from '../components/Orders/CurrentOrders';
import {PastOrders} from '../components/Orders/PastOrders';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScreenOptionsStyles} from '../../stylesheets/ScreenOptionsStyles';
import {emptyCurrentOrdersText, emptyPastOrdersText} from '../data/Texts';
import {GlobalContext} from '../contexts';

/**
 * Screen displaying bot current and past orders
 * @param navigation The navigation object.
 */
const OrderPage = ({navigation}) => {
  const {globalState} = useContext(GlobalContext);
  const Tab = createMaterialTopTabNavigator(); // Stack navigator for the tab screens

  return (
    <View style={styles.container} testID={'orders_page'}>
      <GreenHeader
        headerText={'ORDERS'}
        navigation={navigation}
        testID={'orders_page'}
      />
      <Tab.Navigator
        style={styles.navigatorContent}
        screenOptions={ScreenOptionsStyles}>
        <Tab.Screen name="Current">
          {() => (
            <CurrentOrders
              currentOrders={globalState.currentOrders}
              emptyText={emptyCurrentOrdersText}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Past">
          {() => (
            <PastOrders
              pastOrders={globalState.pastOrders}
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
