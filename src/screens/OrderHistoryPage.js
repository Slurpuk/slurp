import React from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import GreenHeader from '../components/GreenHeader';
import CollapsedOrder from '../components/Orders/CollapsableOrder';
import textStyles from '../../stylesheets/textStyles';
import AnimatedCollapsableCard from '../components/Orders/AnimatedCollapsableCard';

const OrderHistoryPage = ({orders}) => {
  return (
    <View style={styles.basket}>
      <GreenHeader headerText={'ORDER HISTORY'} />
      <SectionList
        style={styles.mainContainer}
        sections={orders}
        keyExtractor={(item, index) => item + index}
        renderItem={({order}) => <AnimatedCollapsableCard order={order} />}
        renderSectionHeader={({section: {period}}) => (
          <Text
            style={[textStyles.darkGreyPoppinsSubHeading, styles.periodHeader]}
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
  },
});

export default OrderHistoryPage;
