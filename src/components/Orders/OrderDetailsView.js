import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import textStyles from '../../../stylesheets/textStyles';

const OrderDetailsView = ({order}) => {
  const itemsComponent = getItemsComponent(order);
  return (
    <View style={styles.orderDetails}>
      <View>
        <ImageBackground
          source={require('../../assets/images/ShopExterior.png')}
          imageStyle={{borderRadius: 7, overflow: 'hidden'}}
          style={styles.picture}
        />
      </View>
      <View>
        <Text
          style={[textStyles.veryDarkGreyPoppinsSubHeading, styles.textFlex]}
        >
          {order.coffeeShopName}
        </Text>
        <Text style={[textStyles.lightGreyPoppins, styles.textFlex]}>
          {order.date} • {order.time}
        </Text>
        <Text style={[textStyles.greyPoppins, styles.textFlex]}>{itemsComponent}</Text>
      </View>
    </View>
  );
};

const getItemsComponent = order => {
  let itemsComponent = '';
  if (order.items.length === 1) {
    let singleItem = order.items[0];
    itemsComponent = singleItem.quantity + ' ' + singleItem.name;
  } else {
    let numberOfItems = 0;
    order.items.forEach(item => (numberOfItems += item.quantity));
    itemsComponent = numberOfItems + ' Items';
  };
  return itemsComponent;
}

const styles = StyleSheet.create({
  orderDetails: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
  orderPrice: {
    position: 'absolute',
    bottom: '2%',
    right: '2%',
  },
  picture: {
    borderRadius: 5,
    width: 95,
    height: 74,
    marginRight: 15,
  },

  textFlex: {
    flex: 1,
  },
});
export default OrderDetailsView;
