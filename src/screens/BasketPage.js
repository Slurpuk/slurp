import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import GreenHeader from '../sub-components/GreenHeader';
import BasketContents from '../components/Basket/BasketContents';
import CustomButton from '../sub-components/CustomButton';
import {GlobalContext} from '../../App';
import {useStripe} from '@stripe/stripe-react-native';
import {StripeProvider} from '@stripe/stripe-react-native/src/components/StripeProvider';
import {
  addToBasket,
  formatBasket,
  removeFromBasket,
} from '../helpers/screenHelpers';
import {initializePayment, openPaymentSheet} from '../helpers/paymentHelpers';
import {Alerts} from '../data/Alerts';
import {sendOrder} from '../firebase/queries';
import { defaultLocation } from "../data/Locations";

export const BasketContext = React.createContext();

/**
 * Screen to display the basket contents.
 */
const BasketPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const [contents, setContents] = useState(context.currBasket.data);
  const [total, setTotal] = useState(getTotal());
  const [readyForPayment, setReadyForPayment] = useState(false); // Is the payment server ready
  const {initPaymentSheet, presentPaymentSheet} = useStripe(); // Stripe hook payment methods
  const publishableKey =
    'pk_test_51KRjSVGig6SwlicvL06FM1BDNZr1539SwuDNXond8v6Iaigyq1NRZsleWNK5PTPEwo1bAWfTQqYHEfXCJ4OWq348000jVuI6u1';

  /**
   * Callback for initializing the stripe payment sheet.
   * If initialization is successful, set ready to true.
   */
  const initialize = useCallback(async () => {
    const ready = await initializePayment(initPaymentSheet, total);
    setReadyForPayment(ready);
  }, [initPaymentSheet, total]);

  /**
   * Side effect that dynamically initializes the payment sheet if the basket is not empty.
   */
  useEffect(() => {
    if (contents.length !== 0) {
      initialize().catch(error => Alerts.elseAlert());
    }
  }, [contents.length, initialize]);

  /**
   * Return a string formatted version of the basket's total amount.
   * @param newBasket An optional newBasket possibly different from the current one.
   */
  function getTotal(newBasket = null) {
    let basket = newBasket ? newBasket : context.currBasket.data;
    return basket
      .reduce(function (acc, item) {
        return acc + item.Price * item.count;
      }, 0)
      .toFixed(2);
  }

  /**
   * Checkout. If the server is ready and the basket is not empty, proceed to payment.
   */
  async function checkout() {
    if(context.currentUser.Location.longitude === defaultLocation.longitude && context.currentUser.Location.latitude === defaultLocation.latitude){
      Alerts.LocationAlert();
    }else {
      contents.length === 0
        ? Alerts.emptyBasketAlert()
        : readyForPayment
          ? await proceedToPayment()
          : Alerts.initPaymentAlert(initialize);
    }
  }

  /**
   * Proceed to payment. Open the payment sheet if no error occurs.
   */
  async function proceedToPayment() {
    const successful = await openPaymentSheet(presentPaymentSheet);
    if (successful) {
      await confirmOrder();
    } else {
      Alerts.initPaymentAlert(initialize);
    }
  }

  /**
   * Create and send a new order based on the current basket. Clear the basket and inform the user.
   */
  async function confirmOrder() {
    await sendOrder(
      formatBasket(),
      context.currShop.key,
      context.currentUser.key,
      Number(getTotal()),
    );
    await context.currBasket.clear();
    Alerts.orderSentAlert();
  }

  /**
   * Add given item from current basket and storage basket.
   * @param item The item to add
   */
  async function addToCurrentBasket(item) {
    let newBasket = await addToBasket(
      item,
      context.currShop,
      context.currBasket.setContent,
    );
    setContents(newBasket);
    setTotal(getTotal(newBasket));
  }

  /**
   * Remove given item from current basket and storage basket.
   * @param item The item to remove
   */
  async function removeFromCurrentBasket(item) {
    let newBasket = await removeFromBasket(item, context.currBasket.setContent);
    setContents(newBasket);
    setTotal(getTotal(newBasket));
  }

  return (
    <StripeProvider publishableKey={publishableKey}>
      <BasketContext.Provider
        value={{
          addToBasket: addToCurrentBasket,
          removeFromBasket: removeFromCurrentBasket,
        }}
      >
        <View style={styles.basket}>
          <GreenHeader
            headerText={'My Basket - ' + context.currShop.Name}
            navigation={navigation}
          />
          <View style={styles.main_container}>
            <BasketContents Items={contents} />
          </View>

          <View style={styles.order_summary}>
            <Text style={styles.total_text}>TOTAL</Text>
            <Text style={styles.total_amount}>£{total}</Text>
          </View>
          <View style={[styles.lastButton, styles.buttons]}>
            <CustomButton
              priority={'primary'}
              text={'Checkout'}
              onPress={checkout}
            />
          </View>
        </View>
      </BasketContext.Provider>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
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
});

export default BasketPage;
