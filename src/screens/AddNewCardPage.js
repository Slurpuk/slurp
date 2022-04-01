import React, {useState, useContext} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {CardField, CardFieldInput} from '@stripe/stripe-react-native';
import GreenHeader from '../sub-components/GreenHeader';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../sub-components/CustomButton';
import {GlobalContext} from '../../App';

const AddNewCardComponent = ({navigation}) => {
  const [card, setCard] = useState(CardFieldInput.Details | null);
  const globalContext = useContext(GlobalContext);

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
          userID: globalContext.currentUser.key, //Must be the current users id
        })
        .then(() => {
          console.log('Card added!');
          Alert.alert('Success', 'Your card has been added!');
        });
    } else {
    }
  };

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
            setCard(cardDetails);
          }}
          onFocus={focusedField => {}}
        />
        <CustomButton
          text={'Add Card'}
          onPress={saveCard}
          priority={'secondary'}
        />
      </View>
    </View>
  );
};

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

export default AddNewCardComponent;
