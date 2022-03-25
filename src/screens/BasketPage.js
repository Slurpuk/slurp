import firestore from '@react-native-firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';

import {StyleSheet, Text, View, Alert} from 'react-native';
import GreenHeader from '../sub-components/GreenHeader';
import BasketContents from '../components/Basket/BasketContents';
import CustomButton from '../sub-components/CustomButton';

import {GlobalContext} from '../../App';
import {useStripe} from '@stripe/stripe-react-native';
import { StripeProvider } from '@stripe/stripe-react-native/src/components/StripeProvider';

const BasketPage = ({navigation}) => {
  const publishableKey = 'pk_test_51KRjSVGig6SwlicvL06FM1BDNZr1539SwuDNXond8v6Iaigyq1NRZsleWNK5PTPEwo1bAWfTQqYHEfXCJ4OWq348000jVuI6u1';
  const context = useContext(GlobalContext);
  const API_URL = 'http://localhost:8088';
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    let body = {amount: context.total.toFixed(2)};
    console.log(JSON.stringify(body))
    const response = await fetch(`${API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).catch(error => Alert.alert('error', error.message));
    const {paymentIntent, ephemeralKey, customer} = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer} =
      await fetchPaymentSheetParams();
    const {error} = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    if (context.total !== 0) {
      const {error} = await presentPaymentSheet();
      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        confirmOrder().catch(err =>
          Alert.alert(`Error code: ${err.code}`, err.message),
        );
      }
    } else {
      Alert.alert('Empty basket.', 'Please add items to your basket.', [
        {
          text: 'OK',
        },
      ]);
    }
  };

  useEffect(() => {
    if (context.total !== 0) {
      initializePaymentSheet();
    }
  }, []);

  async function confirmOrder() {
    await firestore()
      .collection('Orders')
      .add({
        DateTime: firestore.Timestamp.now(),
        Items: formatBasket(),
        Status: 'incoming',
        ShopID: context.currShop.key,
        UserID: context.userRef,
        Total: Number(context.total.toPrecision(2)),
        IsRequired: true,
      })
      .then(() => {
        context.clearBasket();
        Alert.alert(
          'Order received.',
          'Your order has been sent to the shop! Awaiting response.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Order history'),
            },
          ],
        );
      });
  }

  function formatBasket() {
    let items = context.basketContent.map(item => {
      console.log(item);
      return {
        ItemRef: item.key,
        Quantity: item.count,
        Price: Number(item.Price.toPrecision(2)),
        Type: item.type,
        Options: item.options,
      };
    });
    return items;
  }

  return (
    <StripeProvider publishableKey={publishableKey}>
      <View style={styles.basket}>
        <GreenHeader
          headerText={'My Basket - ' + context.currShop.Name}
          navigation={navigation}
        />
        <View style={styles.main_container}>
          <BasketContents Items={context.basketContent} />
        </View>

        <View style={styles.order_summary}>
          <Text style={styles.total_text}>TOTAL</Text>
          <Text style={styles.total_amount}>£{context.total.toFixed(2)}</Text>
        </View>
        <View style={[styles.lastButton, styles.buttons]}>
          <CustomButton
            priority={'primary'}
            text={'Checkout'}
            onPress={confirmOrder}
          />
        </View>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  safe_header: {
    flex: 0,
    backgroundColor: '#046D66',
  },
  basket: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#E5E5E5',
  },

  main_container: {
    flexShrink: 10,
    marginHorizontal: '5%',
    marginVertical: '3%',
  },
  buttons: {
    display: 'flex',
    marginVertical: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lastButton: {
    marginBottom: '6%',
  },
  basket_content: {
    display: 'flex',
    height: '100%',
  },
  my_order: {
    fontWeight: '700',
    fontSize: 26,
    color: '#212121',
    paddingBottom: '5%',
  },
  items_list: {
    display: 'flex',
    flex: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C0C0C0',
  },
  item_container: {
    flex: 1,
    borderColor: '#C0C0C0',
    borderStyle: 'solid',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  item_information: {
    alignSelf: 'flex-start',
    flex: 1,
  },
  item_name: {
    color: '#173C4F',
    fontSize: 21,
    fontWeight: '600',
    paddingBottom: '2%',
    alignSelf: 'flex-start',
  },
  item_specification_list: {},
  item_specification: {
    color: '#717171',
    fontWeight: '300',
    fontSize: 13,
  },
  price: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    minWidth: 30,
    flex: 0.25,
    display: 'flex',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'right',
    alignSelf: 'flex-start',
    color: '#434343',
  },
  order_summary: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    maxWidth: '100%',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  total_text: {
    fontSize: 21,
    color: '#173C4F',
    fontWeight: '900',
  },
  total_amount: {
    fontSize: 20,
    color: '#173C4F',
    fontWeight: '900',
  },
  amount_selection_container: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#1B947E',
    borderRadius: 3,
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    flex: 0.15,
    marginEnd: '5%',
    justifyContent: 'space-between',
  },
  amount: {
    color: '#F1F1F1',
    fontWeight: '600',
    fontSize: 13,
  },
  change_amount_button: {
    color: '#FFFFFF',
  },
});

export default BasketPage;
