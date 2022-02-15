import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Text,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import TransparentArrowButton from '../../SubComponents/TransparentArrowButton';
import textStyles from '../../../stylesheets/textStyles';
import OrderDetailsView from './OrderDetailsView';
import orders from '../../fake-data/OrderData';

const CollapsableOrder = ({order}) => {
  const [collapsed, setCollapsed] = useState(true);

  if (collapsed) {
    return (
      <Pressable
        style={[styles.collapsedOrder, styles.order]}
        onPress={() => setCollapsed(!collapsed)}
      >
        <View style={styles.collapsedOrderContainer}>
          <OrderDetailsView order={order} />
          <View style={styles.collapsedOrderSectionRight}>
            <View style={styles.collapsedOrderSectionRightTop}>
              <TransparentArrowButton direction={'down'} />
            </View>
            <View style={styles.collapsedOrderSectionRightBottom}>
              <Text style={textStyles.darkGreyPoppinsSubHeading}>£2.20</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        style={[styles.expandedOrder, styles.order]}
        onPress={() => {
          setCollapsed(!collapsed);
          console.log();
        }}
      >
        <View style={styles.collapsedOrderContainer}>
          <OrderDetailsView order={order} />
          <View style={styles.collapsedOrderSectionRight}>
            <View style={styles.collapsedOrderSectionRightTop}>
              <TransparentArrowButton direction={'up'} />
            </View>
            <View style={styles.collapsedOrderSectionRightBottom}>
              <Text style={textStyles.lightGreyPoppins}>{orders[1]}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  order: {
    backgroundColor: '#F2F2F2',
    width: '100%',
    marginTop: 15,
    borderRadius: 10,
    padding: 8,
    paddingRight: 12,
  },
  collapsedOrder: {
    height: 90,
  },
  expandedOrder: {
    height: 200,
  },

  picture: {
    borderRadius: 5,
    width: 95,
    height: 74,
    marginRight: 15,
  },

  collapsedOrderContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  collapsedOrderSectionLeft: {
    flex: 2,
    display: 'flex',
  },
  collapsedOrderSectionRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  collapsedOrderSectionRightTop: {
    flex: 1,
  },

  textFlex: {
    flex: 1,
  },
});
export default CollapsableOrder;
