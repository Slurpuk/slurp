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
  let currentOrderStatusComponent = getCurrentOrderStatusComponent(order);
  return (
    <View style={styles.container}>
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
            style={[textStyles.veryDarkGreyPoppinsSubHeading, styles.textFlex]}>
            {order.ShopID.Name}
          </Text>
          {getStatusAndDateComponent(order)}
          <Text style={[textStyles.greyPoppins, styles.textFlex]}>
            {getItemsText(order)}
          </Text>
        </View>
      </View>
      <View style={styles.bottomComponent}>{currentOrderStatusComponent}</View>
    </View>
  );
};

const getItemsText = order => {
  let itemsComponent = '';
  if (order.data.length === 1) {
    let singleItem = order.data[0];
    itemsComponent = singleItem.Quantity + ' ' + singleItem.Coffee.Name;
  } else {
    let numberOfItems = 0;
    order.data.forEach(item => (numberOfItems += item.Quantity));
    itemsComponent = numberOfItems + ' Items';
  }
  return itemsComponent;
};

const getStatusAndDateComponent = order => {
  let dateAndTime = order.DateTime.toDate().toDateString();
  if (order.status === 'collected') {
    return (
      <Text
        style={[
          textStyles.lightGreyPoppins,
          styles.textFlex,
          styles.finishedOrder,
        ]}>
        {order.Status} {dateAndTime}
      </Text>
    );
  } else if (order.status === 'rejected' || order.status === 'cancelled') {
    return (
      <Text
        style={[
          textStyles.lightGreyPoppins,
          styles.textFlex,
          styles.finishedOrder,
          styles.cancelledOrder,
        ]}>
        {order.Status} {dateAndTime}
      </Text>
    );
  } else {
    return (
      <Text style={[textStyles.lightGreyPoppins, styles.textFlex]}>
        {dateAndTime}
      </Text>
    );
  }
};

const getCurrentOrderStatusComponent = order => {
  if (order.Status === 'incoming') {
    return <Text style={textStyles.pendingBluePoppins}>Pending</Text>;
  } else if (order.Status === 'accepted') {
    return <Text style={textStyles.pendingBluePoppins}>Accepted</Text>;
  } else if (order.Status === 'ready') {
    return <Text style={textStyles.readyGreenPoppins}>Ready to Collect</Text>;
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'row',
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
    overflow: 'hidden',
  },
  bottomComponent: {
    marginTop: 8,
    marginLeft: 2,
  },
  finishedOrder: {
    fontStyle: 'italic',
  },
  cancelledOrder: {
    color: '#8C233C',
  },
});
export default OrderDetailsView;
