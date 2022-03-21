import React from 'react';
import {FlatList, View, StyleSheet, Text} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';

const Item = ({item}) => {
  return (
    <View>
      <View style={styles.singleElement}>
        <View style={styles.elementDetails}>
          <Text style={textStyles.bluePoppinsSubHeading}>
            {item.quantity} {item.Name}
          </Text>
          <Text style={[textStyles.lightGreyPoppins, styles.options]}>
            {getOptionsText(item)}
          </Text>
        </View>
        <View style={styles.elementPrice}>
          <Text style={textStyles.darkGreyPoppinsSubHeading}>
            £{(item.Price * item.quantity + getOptionsPrice(item)).toFixed(2)}
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

function getOptionsPrice(item) {
  let totalPrice = 0;
  item.options.forEach(option => {
    totalPrice += option.Price;
  });

  return totalPrice;
}

function getOptionsText(item) {
  let optionsText = '';
  item.options.forEach(option => {
    optionsText += option.Name + ' ' + option.Type + ', ';
  });
  return optionsText !== ''
    ? optionsText.substring(0, optionsText.length - 2)
    : optionsText;
}

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

  options: {
    marginRight: '15%',
  },
});

export default OrderItemsList;
