import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  Alert,
  SafeAreaView,
  FlatList,
} from 'react-native';
import Header from '../sub-components/Header';
import PrimaryButton from '../sub-components/PrimaryButton';
import PaymentCardsData from '../fake-data/PaymentCardsData';
import PaymentCard from '../components/PaymentCards/PaymentCard';
import GreenHeader from '../components/General/GreenHeader';

export const PaymentCardsContext = React.createContext();

const PaymentCardsPage = ({navigation}) => {
  const [cards, setCards] = useState(PaymentCardsData);

  return (
    <SafeAreaView style={styles.page}>
      <GreenHeader headerText={'PAYMENT CARDS'} navigation={navigation} />
      <PaymentCardsContext.Provider
        value={{
          cards: cards,
          setCards: setCards,
        }}
      >
        <FlatList
          data={cards}
          renderItem={({item}) => <PaymentCard card={item} />}
          style={{padding: '5%'}}
        />
      </PaymentCardsContext.Provider>
      <PrimaryButton text={'Add New Payment Card'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5',
  },
});

export default PaymentCardsPage;
