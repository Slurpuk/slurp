import React from 'react';
import {StyleSheet, Text, View, SectionList, FlatList} from 'react-native';
import CollapsedOrder from '../components/Orders/CollapsableOrder';
import textStyles from '../../stylesheets/textStyles';
import GreenHeader from '../sub-components/GreenHeader';
import pastOrders from '../fake-data/PastOrderData';
import currentOrders from '../fake-data/CurrentOrderData';

const OrderPage = () => {
  return (
    <View style={styles.basket}>
      <GreenHeader headerText={'ORDERS'} />
      <PastOrders />
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
  return(
    <Text> Hi </Text>
  );
};

// <FlatList
//   contentContainerStyle={styles.mainContainer}
//   sections={currentOrders}
//   keyExtractor={item => item.orderNumber}
//   renderItem={({item}) => <CollapsedOrder order={item} />}
// />

const styles = StyleSheet.create({
  basket: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E5E5E5',
  },
  periodHeader: {
    marginLeft: 7,
    marginTop: 20,
  },
  mainContainer: {
    marginHorizontal: '5%',
    paddingBottom: '5%',
  },
});

export default OrderPage;
