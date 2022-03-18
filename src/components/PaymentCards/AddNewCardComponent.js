import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {
  CardField,
  useStripe,
  CardFieldInput,
} from '@stripe/stripe-react-native';
import GreenHeader from '../../sub-components/GreenHeader';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import CustomButton from '../../sub-components/CustomButton';
import {GlobalContext} from '../../../App';

export default function AddNewCardComponent({navigation}) {
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const {confirmPayment} = useStripe();
  const API_URL = 'http://localhost:8000';
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);
  const globalContext = useContext(GlobalContext);

  //const user = firebase.auth().currentUser;

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
    if (card.complete) {
      firestore()
        .collection('Cards')
        .add({
          isDefault: false,
          brand: card.brand,
          expiryMonth: card.expiryMonth,
          expiryYear: card.expiryYear,
          last4: card.last4,
          postalCode: card.postalCode,
          userID: globalContext.userRef, //Must be the current users id
        })
        .then(() => {
          console.log('Card added!');
          Alert.alert('Success', 'Your card has been added!');
        });
    } else {
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <View style={styles.container}>
      <GreenHeader headerText={'ADD NEW CARD'} navigation={navigation} />
      <View style={styles.content}>
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
            //console.log('cardDetails', cardDetails);
            setCard(cardDetails);
          }}
          onFocus={focusedField => {
            //console.log('focusField', focusedField);
          }}
        />
        <CustomButton
          text={'Add Card'}
          onPress={saveCard}
          priority={'secondary'}
        />
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
  content: {
    alignItems: 'center',
    backgroundColor: '#EDEBE7',
    display: 'flex',
    flex: 1,
  },
  periodHeader: {
    marginLeft: 7,
    marginTop: 20,
  },
  mainContainer: {
    paddingBottom: '5%',
  },
});
