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

const OrderDetailsView = ({order}) => {
  return (
    <>
      <View style={styles.orderDetails}>
        <View style={styles}>
          <ImageBackground
            source={require('../../assets/images/ShopExterior.png')}
            imageStyle={{borderRadius: 7, overflow: 'hidden'}}
            style={styles.picture}
          ></ImageBackground>
        </View>
        <View style={styles.collapsedOrderSectionLeft}>
          <Text
            style={[textStyles.veryDarkGreyPoppinsSubHeading, styles.textFlex]}
          >
            'BLABAL'
          </Text>
          <Text style={[textStyles.lightGreyPoppins, styles.textFlex]}>
            Date • Time
          </Text>
          <Text style={[textStyles.greyPoppins, styles.textFlex]}>4 Items</Text>
        </View>
      </View>
      <View style={styles.expandedOrderInfo}>
        <Text> HEY</Text>
        <Text> HELLO</Text>
      </View>
      <View style={styles.orderPrice}>
        <Text>£3.20</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  orderDetails: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 3,
    position: 'relative',
  },
  expandedOrderInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    borderColor: 'red',
    borderWidth: 3,
    height: 'auto',
  },
  orderPrice: {
    position: 'absolute',
    bottom: '2%',
    right: '2%',
  },
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
  lightGreyPoppins: {
    fontSize: 15,
    fontFamily: 'Poppins-Light',
    letterSpacing: 0.3,
    color: '#727272',
  },
  greyPoppins: {
    fontSize: 16,
    fontFamily: 'Poppins',
    letterSpacing: 0.3,
    color: '#3D3D3D',
  },
  textFlex: {
    flex: 1,
  },
});
export default OrderDetailsView;
