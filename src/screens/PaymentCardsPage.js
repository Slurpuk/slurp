import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PaymentCard from '../components/PaymentCards/PaymentCard';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import firestore from '@react-native-firebase/firestore';
import {GlobalContext} from "../../App";

export const PaymentCardsContext = React.createContext();

const PaymentCardsPage = ({navigation}) => {
  const [cards, setCards] = useState();
  const setVisible = useContext(VisibleContext);
  const [brand, setBrand] = useState();
  const [expiryMonth, setExpiryMonth] = useState();
  const [expiryYear, setExpiryYear] = useState();
  const [isDefault, setIsDefault] = useState();
  const [last4, setLast4] = useState();
  const [postalCode, setPostalCode] = useState();
  const [defaultCard, setDefaultCard] = useState(null);
  const globalContext = useContext(GlobalContext);

  /*
  Function to order the cards to have the default card first.
   */
  function orderCardsFirstDefault(localCards) {
    return localCards.sort(function (x, y) {
      return x.isDefault === y.isDefault ? 0 : x.isDefault ? -1 : 1;
    });
  }

  function goToAddNewCard() {
    navigation.navigate('Add new card');
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('Cards')
      .where('userID', '==', globalContext.userRef)
      .onSnapshot(querySnapshot => {
        const cards = [];
        querySnapshot.forEach(documentSnapshot => {
          cards.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
          if (documentSnapshot._data.isDefault) {
            setDefaultCard({
              ...documentSnapshot._data,
              key: documentSnapshot.id,
            });
          }
        });
        setCards(orderCardsFirstDefault(cards));
      });
    return () => subscriber();
  }, []);

  return (
    <View style={styles.container}>
      <GreenHeader headerText={'PAYMENT CARDS'} navigation={navigation} />
      <View style={styles.content}>
        <PaymentCardsContext.Provider
          value={{
            cards: cards,
            setCards: setCards,
          }}>
          <FlatList
            data={cards}
            renderItem={({item}) => (
              <PaymentCard
                card={item}
                setDefault={setDefaultCard}
                defaultCard={defaultCard}
              />
            )}
            style={styles.list}
          />
        </PaymentCardsContext.Provider>
        <View style={styles.button}>
          <CustomButton
            onPress={goToAddNewCard}
            text={'Add New Payment Card'}
            priority={'secondary'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEBE7',
  },
  content: {
    flex: 1,
    marginHorizontal: '5%',
  },
  button: {
    marginBottom: '8%',
  },

  list: {
    marginVertical: '5%',
    flex: 1,
  },
});

export default PaymentCardsPage;
