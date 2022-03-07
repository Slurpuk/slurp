import React from 'react';
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
import currentOrders from '../fake-data/CurrentOrderData';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const OrderPage = ({navigation}) => {
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
        }}
      >
        <Tab.Screen
          name="Current"
          component={CurrentOrders}
          style={styles.mainContainer}
        />
        <Tab.Screen name="Past" component={PastOrders} />
      </Tab.Navigator>
    </View>
  );
};

const PastOrders = () => {
  return (
    <SectionList
      contentContainerStyle={styles.mainContainer}
      sections={pastOrders}
      stickySectionHeadersEnabled={false}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => <CollapsedOrder order={item} />}
      renderSectionHeader={({section: {period}}) => (
        <Text style={[textStyles.darkGreyPoppinsHeading, styles.periodHeader]}>
          {period}
        </Text>
      )}
    />
  );
};

const CurrentOrders = () => {
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
