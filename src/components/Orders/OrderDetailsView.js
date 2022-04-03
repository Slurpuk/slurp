import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import React, { useContext } from "react";
import textStyles from '../../../stylesheets/textStyles';
import {OrderStatus} from '../../data/OrderStatus';
import ShopDetailIcons from "../Shops/ShopDetailIcons";
import { calculateDistance } from "../../helpers/screenHelpers";
import { GlobalContext } from "../../../App";

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
        <View>
          <ImageBackground
            source={{uri: order.shop.image}}
            imageStyle={{borderRadius: 7, overflow: 'hidden'}}
            style={styles.picture}
          />
        </View>
        <View>
            <Text
              style={[textStyles.veryDarkGreyPoppinsSubHeading, styles.textFlex]}
            >
              {order.shop.name}
            </Text>
          {getStatusAndDateComponent(order)}
          <Text style={[textStyles.greyPoppins, styles.textFlex]}>
            {getItemsText(order)}
          </Text>
        </View>
      </View>
      <View style={styles.orderInformation}>
        <View style={styles.bottomComponent}>{currentOrderStatusComponent}</View>
        <View style={styles.ETA}>
          <ShopDetailIcons distanceToShop={
            calculateDistance(order.shop.location, {
              latitude: context.currentUser.location._latitude,
              longitude: context.currentUser.location._longitude,
            })
          } iconSize={17} iconColor={'black'} fontSize={12}/>
        </View>
      </View>
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
        ]}
      >
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
  orderInformation: {
    flexDirection: 'row',
  },
  ETA: {
    alignSelf: 'center',
    marginTop: '2%',
    marginLeft: '13%'
  }
});
export default OrderDetailsView;
