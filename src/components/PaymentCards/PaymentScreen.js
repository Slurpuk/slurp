import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  StatusBar,
  Platform,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  CardField,
  useStripe,
  CardFieldInput,
} from '@stripe/stripe-react-native';
import GreenHeader from '../../sub-components/GreenHeader';
import firestore from "@react-native-firebase/firestore";
import firebase from "@react-native-firebase/app";
import menuSection from "../ShopMenu/MenuSection";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function PaymentScreen() {
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const {confirmPayment} = useStripe();
  const API_URL = 'http://localhost:8000';
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
    const {error} = await presentPaymentSheet({clientSecret});
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  const saveCard = () => {
    firestore()
        .collection('Cards')
        .add({
          brand: card.brand,
          complete: card.complete,
          expiryMonth: card.expiryMonth,
          expiryYear: card.expiryYear,
          last4: card.last4,
          postalCode: card.postalCode,
          userID: "userIDIDIDID",
          validCVC: card.validCVC,
          validExpiryDate: card.validExpiryDate,
          validNumber: card.validNumber,
        })
        .then(() => {
          console.log('Order added!');
        });
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.container}>
      <GreenHeader headerText={'PAYMENT PAGE'} />
      <View style={{alignItems: 'center', backgroundColor: '#EDEBE7', flex: 1}}>
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#EDEBE7',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            console.log('cardDetails', cardDetails);
            setCard(cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#087562',
            justifyContent: 'center',
            alignItems: 'center',
            height: screenHeight / 18,
            width: screenWidth / 1.1,
            borderRadius: 13,
          }}
          onPress={saveCard}
          >
          <Text style={{color: 'white', fontWeight: 'bold'}}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  basket: {
    marginHorizontal: '5%',
    marginTop: '5%',
    fontFamily: 'Poppins-SemiBold',
  },
  periodHeader: {
    marginLeft: 7,
    marginTop: 20,
  },
  mainContainer: {
    paddingBottom: '5%',
  },
});
