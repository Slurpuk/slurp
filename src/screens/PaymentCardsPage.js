import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PaymentCardsData from '../fake-data/PaymentCardsData';
import PaymentCard from '../components/PaymentCards/PaymentCard';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

export const PaymentCardsContext = React.createContext();

const PaymentCardsPage = ({navigation}) => {
  const [cards, setCards] = useState();
  const setVisible = useContext(VisibleContext);
  const [currentCards, setCurrentCards] = useState();

  /*useEffect(() => {
        const subscriber = firestore()
            .collection('Cards')
            .onSnapshot(querySnapshot => {
                const card = querySnapshot;
                setCards(card.data);
            });
        return () => subscriber();
    }, []);*/

    const subscriber = firestore()
            .doc('Cards/xtbTvSVGSxzv7CtKyXHc')
            .onSnapshot(querySnapshot => {
                const card = querySnapshot;
                console.log(card._data);
                setCards(card)
            });

/*
  const subscriber = firestore()
    .collection('Cards')
    .onSnapshot(querySnapshot => {
      const currentCards = [];
      const cards = [];
      querySnapshot.forEach(documentSnapshot => {
        //const orderCoffeeShopId=documentSnapshot.data().CoffeeShopId;
        //console.log(orderCoffeeShopId);
        // if(orderCoffeeShopId.includes('3ktdgIGsHcFkVLdQzSYx')){
        //console.log(documentSnapshot.data().CoffeeShopId);
        currentCards.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
        cards.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
        //console.log(orders.map(u => u.CoffeeShopId));
        //   }
      });
      setCurrentCards(currentCards);
      setCards(cards);
    });
*/
  return (
    <View style={styles.page}>
      <GreenHeader headerText={'PAYMENT CARDS'} navigation={navigation} />
      <PaymentCardsContext.Provider
        value={{
          cards: cards,
          setCards: setCards,
        }}>
        <FlatList
          data={cards}
          renderItem={({item}) => <PaymentCard card={item} />}
          style={styles.list}
        />
      </PaymentCardsContext.Provider>
      <View style={styles.button}>
        <CustomButton text={'Add New Payment Card'} priority={'secondary'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'flex-start',
    backgroundColor: '#E5E5E5',
    flex: 1,
  },
  button: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },

  list: {
    padding: '5%',
    flexGrow: 0,
  },
});

export default PaymentCardsPage;
