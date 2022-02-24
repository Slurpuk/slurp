import React from 'react';
import { StyleSheet, Text, View, SectionList, StatusBar, ScrollView } from "react-native";
import CollapsedOrder from '../components/Orders/CollapsableOrder';
import textStyles from '../../stylesheets/textStyles';
import GreenHeader from '../sub-components/GreenHeader';
import orders from '../fake-data/OrderData';

const OrderPage = () => {
  return (
    <View style={styles.basket}>
      <GreenHeader headerText={'ORDERS'} />
      <SectionList
        contentContainerStyle={styles.mainContainer}
        sections={orders}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <CollapsedOrder order={item} />}
        renderSectionHeader={({section: {period}}) => (
          <Text
            style={[textStyles.darkGreyPoppinsHeading, styles.periodHeader]}
          >
            {period}
          </Text>
        )}
      />
    </View>
  );
};

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
