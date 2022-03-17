import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PaymentCard from '../components/PaymentCards/PaymentCard';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';
import firestore from '@react-native-firebase/firestore';

export const PaymentCardsContext = React.createContext();

const PaymentCardsPage = ({navigation}) => {
  const [cards, setCards] = useState();
  const [defaultCard, setDefaultCard] = useState(null);

  /*
  Function to order the cards to have the default card first.
   */
  function orderCardsFirstDefault(localCards) {
    return localCards.sort(function (x, y) {
      return x.isDefault === y.isDefault ? 0 : x.isDefault ? -1 : 1;
    });
  }

  function assignNewDefualt(){
    console.log(defaultCard);
  }

  function goToAddNewCard() {
    navigation.navigate('Add new card');
  }

  useEffect(() => {
    const subscriber = firestore()
      .collection('Cards')
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
                assignNewDefault={assignNewDefualt}
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
