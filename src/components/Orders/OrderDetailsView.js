import {View, StyleSheet, Text, ImageBackground, Pressable} from 'react-native';
import React, {useContext} from 'react';
import textStyles from '../../../stylesheets/textStyles';
import {OrderStatus} from '../../data/OrderStatus';
import ShopDetailIcons from '../Shops/ShopDetailIcons';
import {GlobalContext} from '../../../App';
import {ShopIntroStyles} from '../../../stylesheets/ShopStyles';
import {LinearGradient} from 'react-native-svg';
import {menuItemStyles} from '../ShopMenu/shopStyles';

/**
 * Corresponds to the closed version of the order
 * which shows the most essential information
 * @param order Order object
 */
const OrderDetailsView = ({order}) => {
  let currentOrderStatusComponent = getCurrentOrderStatusComponent(order);
  const context = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <View style={styles.orderDetails}>
        <ImageBackground
          source={{uri: order.shop.image}}
          imageStyle={{borderRadius: 7, overflow: 'hidden'}}
          style={styles.picture}
        />
        <View>
          <Text
            style={[textStyles.veryDarkGreyPoppinsSubHeading, styles.textFlex]}>
            {order.shop.name}
          </Text>
          {getStatusAndDateComponent(order)}
          <View style={styles.orderInformation}>
            <Text style={[textStyles.greyPoppins, styles.textFlex]}>
              {getItemsText(order)}
            </Text>
            {order.status === OrderStatus.COLLECTED ||
            order.status === OrderStatus.REJECTED ? null : (
              <View
                style={[
                  styles.ETA,
                  order.ETA < 800
                    ? {backgroundColor: '#C12E48'}
                    : {backgroundColor: '#046D66'},
                ]}>
                <ShopDetailIcons
                  distanceToShop={order.ETA}
                  iconSize={17}
                  iconColor={'#ffe'}
                  fontSize={12}
                />
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.bottomComponent}>{currentOrderStatusComponent}</View>
    </View>
  );
};

/**
 * Displays the amount of items there are in an order
 * if there is more than 1 item
 * @param order Order object
 * @return String
 */
function getItemsText(order) {
  let itemsComponent = '';
  if (order.items.length === 1) {
    let singleItem = order.items[0];
    itemsComponent = singleItem.quantity + ' ' + singleItem.name;
  } else {
    let numberOfItems = 0;
    order.items.forEach(item => (numberOfItems += item.quantity));
    itemsComponent = numberOfItems + ' Items';
  }
  return itemsComponent;
}

/**
 * Returns a component that indicates the date of completion of an order.
 * This can include the current date if the order has not been completed.
 * @param order Order object
 * @return Component
 */
function getStatusAndDateComponent(order) {
  let dateAndTime = order.incoming_time.toDate().toDateString();
  if (
    order.Status === OrderStatus.COLLECTED ||
    order.Status === OrderStatus.REJECTED
  ) {
    return (
      <Text
        style={[
          textStyles.lightGreyPoppins,
          styles.textFlex,
          styles.finishedOrder,
        ]}>
        {order.status} {dateAndTime}
      </Text>
    );
  } else {
    return (
      <Text style={[textStyles.lightGreyPoppins, styles.textFlex]}>
        {dateAndTime}
      </Text>
    );
  }
}

/**
 * Creates a more user-friendly and descriptive version of the order status
 * @param order Order object
 * @return Text-Component
 */
function getCurrentOrderStatusComponent(order) {
  if (order.status === OrderStatus.INCOMING) {
    return <Text style={textStyles.pendingBluePoppins}>Pending</Text>;
  } else if (order.status === OrderStatus.ACCEPTED) {
    return <Text style={textStyles.pendingBluePoppins}>Accepted</Text>;
  } else if (order.status === OrderStatus.READY) {
    return <Text style={textStyles.readyGreenPoppins}>Ready to Collect</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'row',
  },
  picture: {
    borderRadius: 5,
    width: 95,
    height: 74,
    marginRight: 15,
  },

  textFlex: {
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
  orderInformation: {
    display: 'flex',
    flexDirection: 'row',
  },
  ETA: {
    marginLeft: '5%',
    flex: 0,
    paddingRight: '1%',
    paddingTop: '1.2%',
    paddingLeft: '4%',
    borderRadius: 20,
    borderWidth: 0,
    marginRight: '1%',
  },
});
export default OrderDetailsView;
