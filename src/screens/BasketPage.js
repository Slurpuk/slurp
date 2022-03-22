import firestore from '@react-native-firebase/firestore';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import GreenHeader from '../sub-components/GreenHeader';
import BasketContents from '../components/Basket/BasketContents';
import CustomButton from '../sub-components/CustomButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  useStripe,
} from '@stripe/stripe-react-native';

import {GlobalContext} from '../../App';
export const BasketContext = React.createContext();

const BasketPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const {confirmPayment} = useStripe();
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const [Items] = useState([
    {
      key: 1,
      name: 'Latte',
      amount: 0,
      price: '2.40',
      specifications: ['Oat Milk'],
    },
    {
      key: 2,
      name: 'Cappuccino',
      amount: 0,
      price: '2.30',
      specifications: ['Dairy', 'Caramel Syrup'],
    },
    {
      key: 3,
      name: 'Americano',
      amount: 0,
      price: '2.10',
      specifications: [],
    },
    {
      key: 4,
      name: 'Cappuccino',
      amount: 0,
      price: '2.30',
      specifications: ['Dairy', 'Caramel Syrup'],
    },
    {
      key: 5,
      name: 'Cappuccino',
      amount: 0,
      price: '2.30',
      specifications: ['Dairy', 'Caramel Syrup'],
    },
  ]);

  async function confirmOrder() {
    if (context.basketSize === 0) {
      Alert.alert('Empty basket.', 'Please add items to your basket.', [
        {
          text: 'OK',
        },
      ]);
    } else {
      await firestore()
          .collection('Orders')
          .add({
            DateTime: firestore.Timestamp.now(),
            Items: formatBasket(),
            Status: 'incoming',
            ShopID: context.currShop.key,
            UserID: context.userRef,
            Total: Number(context.total.toPrecision(2)),
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

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      'http://localhost:8000/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const {paymentIntent, ephemeralKey, customer} = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const {error} = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
      await confirmOrder();
    }
  };

  useEffect(() => {
    initializePaymentSheet().then(r => console.log('Working!!'));
  }, [initializePaymentSheet]);

  return (
    <BasketContext.Provider
      value={{
        setPayMethVisible: setPayMethVisible,
        navigation: navigation,
      }}>
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
        <TouchableOpacity style={styles.buttons}>
          <CustomButton
            priority="primary"
            style={styles.button}
            text={'Apple/Google Pay'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPressIn={openPaymentSheet}
          style={[styles.lastButton, styles.buttons]}>
          <CustomButton
            priority="primary"
            style={styles.button}
            text={'Checkout with card'}
          />
        </TouchableOpacity>
      </View>
    </BasketContext.Provider>
  );
};

const styles = StyleSheet.create({
  safe_header: {
    flex: 0,
    backgroundColor: '#046D66',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 20,
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
  button: {
    flex: 1,
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
