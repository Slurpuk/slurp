import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import CustomButton from '../../sub-components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import UncollapsedPayMethCard from './UncollapsedPayMethCard';
import CollapsedPayMethCard from './CollapsedPayMethCard';
import AnimatedCard from '../../sub-components/AnimatedCard';
import PayMethPaymentCard from './PayMethPaymentCard';
import {GlobalContext} from '../../../App';
import {BasketContext} from '../../screens/BasketPage';
import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';

const PaymentMethodPopUp = ({navigation}) => {
  const [cards, setCards] = useState([]);
  const [defaultCard, setDefaultCard] = useState([]);
  const globalContext = useContext(GlobalContext);
  const basketContext = useContext(BasketContext);
  const {confirmPayment} = useStripe();
  const API_URL = 'http://localhost:8000';
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState('');
  /*
  //comment
  useEffect(() => {
    fetch('http://localhost:8000/create-payment-intent', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        res.paymentIntent.amount = globalContext.total; //Test
        res.paymentIntent.amount_capturable = globalContext.total; //Test
        res.paymentIntent.amount_received = globalContext.total; //Test
        res.paymentIntent.description = 'Test Payment';
        console.log('payment intent:' + res.paymentIntent);
        console.log('intent', res);
        console.log('amount', res.paymentIntent.amount);
        setKey(res.clientSecret);
      })
      .catch(e => Alert.alert(e.message));
  }, []);*/
///////////////////////////////New Added///////////////////////////
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
    }
  };

  useEffect(() => {
    initializePaymentSheet().then(r => console.log('Working!!'));
  }, [initializePaymentSheet]);

  //////////////////////////////New Added//////////////////////////////

  const handleConfirmation = async () => {
    if (key) {
      console.log('Handle');
      const {paymentIntent, error} = await confirmPayment(key, {
        type: 'Card',
        billingDetails: {
          email: 'ardan@gmail.com',
        },
        data: {
          object: 'payment_intent',
          amount: globalContext.total,
        },
        event: {
          object: 'payment_intent',
          amount: globalContext.total,
        },
        eventData: {
          object: 'payment_intent',
          amount: globalContext.total,
        },
      });

      if (!error) {
        paymentIntent.amount = globalContext.total; //Added as a test
        console.log(paymentIntent.amount); //Added as a test
        Alert.alert('Received payment', `Billed for ${paymentIntent?.amount}`);
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const publishableKey =
    'pk_test_51KRjSVGig6SwlicvL06FM1BDNZr1539SwuDNXond8v6Iaigyq1NRZsleWNK5PTPEwo1bAWfTQqYHEfXCJ4OWq348000jVuI6u1';

  async function getCards() {
    await firestore()
      .collection('Cards')
      .where('userID', '==', globalContext.userRef)
      .get()
      .then(coll => {
        //console.log(coll._docs.map(x => x._data ));
        const myDefaultCard = coll._docs
          .map(x => (x._data.isDefault ? x._data : null))
          .filter(element => {
            return element !== null;
          });
        const myOtherCards = coll._docs
          .map(x => (!x._data.isDefault ? x._data : null))
          .filter(element => {
            return element !== null;
          });
        console.log(myDefaultCard);
        console.log(myOtherCards);
        setCards(myOtherCards);
        setDefaultCard(myDefaultCard);
      });
  }

  useEffect(() => {
    getCards().then(() => console.log('Updated cards'));
  }, []);

  /*  useEffect(() => {
    fetch('http://localhost:8000/checkout', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => {
        console.log('intent', res);
        setKey(res.clientSecret);
      })
      .catch(e => Alert.alert(e.message));
  }, []);*/

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.8];
  const scale = animation.interpolate({inputRange, outputRange});
  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 0.095,
      speed: 100,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      speed: 70,
      useNativeDriver: true,
    }).start();
  };
  const addNewCardRedirection = () => {
    basketContext.navigation.navigate('Add new card');
  };

  return (
    <StripeProvider
      publishableKey={publishableKey}
      merchantIdentifier={'merchant.identifier'}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[textStyles.headingOne, styles.product_name]}>
            PAYMENT METHOD
          </Text>
          <TouchableHighlight
            style={styles.icon}
            underlayColor={'white'}
            onPress={() => basketContext.setPayMethVisible(false)}>
            <Icon size={30} color="black" name="close" />
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          {cards.length !== 0 ? (
            <FlatList
              data={defaultCard}
              renderItem={({item}) => (
                <AnimatedCard
                  initialHeight={100}
                  collapsableContent={
                    <CollapsedPayMethCard defaultCard={item} />
                  } //this is the collapsed part
                  hidableContent={<UncollapsedPayMethCard cards={cards} />} //this is the uncollapsed part
                />
              )}
              style={styles.items_list}
            />
          ) : (
            <PayMethPaymentCard isFirst={true} />
          )}
          <Animated.View style={{transform: [{scale}], flex: 10}}>
            <TouchableOpacity
              style={[textStyles.smallLightGreyPoppins, styles.text]}
              activeOpacity={1}
              onPress={addNewCardRedirection}
              onPressIn={onPressIn}
              onPressOut={onPressOut}>
              <Text style={[textStyles.smallLightGreyPoppins, styles.text]}>
                +New Payment Card
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={{
              width: '100%',
              height: 50,
              marginVertical: 30,
            }}
            onCardChange={cardDetails => {
              console.log('cardDetails', cardDetails);
            }}
            onFocus={focusedField => {
              console.log('focusField', focusedField);
            }}
          />

          <CustomButton
            text={`Place Order  £${globalContext.total.toFixed(2)}`}
            priority={'primary'}
            width={screenWidth * 0.79}
            style={styles.button}
            onPress={openPaymentSheet}
          />
        </View>
      </View>
    </StripeProvider>
  );
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    paddingLeft: '7%',
    width: 0.9128 * screenWidth,
    height: 0.4723 * screenHeight,
    backgroundColor: 'white',
    paddingVertical: '6%',
    position: 'absolute',
    top: '30%',
    bottom: '23%',
    left: '4%',
    right: '4%',
    elevation: 200,
    zIndex: 100,
  },
  product_name: {
    color: 'black',
    marginLeft: '1%',
  },
  items_list: {
    flex: 0,
    maxHeight: '70%',
  },

  text: {
    flex: 600,
    paddingTop: '1.5%',
    color: '#2D466B',
  },

  button: {
    flex: 1,
    paddingTop: '10%',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '4%',
  },

  body: {
    display: 'flex',
    flex: 1,
    marginRight: '6%',
  },

  icon: {
    marginRight: '7%',
    marginBottom: '2%',
  },
});

export default PaymentMethodPopUp;
