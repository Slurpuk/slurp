import React from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';

const Item = ({item}) => {
  const syrupText = item.syrup ? ' • ' + item.syrup : '';

  return (
    <View>
      <View style={styles.singleElement}>
        <View style={styles.elementDetails}>
          <Text style={textStyles.bluePoppinsSubHeading}>
            {item.quantity} {item.Name}
          </Text>
          <Text style={textStyles.lightGreyPoppins}>
            {item.milk}
            {syrupText}
          </Text>
        </View>
        <View style={styles.elementPrice}>
          <Text style={textStyles.darkGreyPoppinsSubHeading}>
            £{(item.Price * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: '#E2E2E2',
          borderBottomWidth: 1.5,
        }}
      />
    </View>
  );
};

const EmptyItemLine = () => {
  return (
    <View style={styles.bottomLeftTag}>
      <Text style={textStyles.bluePoppinsSubHeading}>Total</Text>
    </View>
  );
};

const OrderItemsList = ({order}) => {
  return (
    <View>
      <FlatList
        data={order.Items}
        renderItem={({item}) => <Item item={item} />}
      />
      <EmptyItemLine />
    </View>
  );
};

const styles = StyleSheet.create({
  singleElement: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  elementDetails: {
    marginVertical: 3,
    display: 'flex',
  },
  elementPrice: {
    marginLeft: 'auto',
  },
  bottomLeftTag: {
    marginTop: 8,
    marginBottom: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OrderItemsList;
