import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Pressable, Image, Text, Alert, SafeAreaView, FlatList} from 'react-native';
import Header from '../SubComponents/Header'
import PrimaryButton from '../SubComponents/PrimaryButton'
import PaymentCardsData from "../fake-data/PaymentCardsData";
import PaymentCard from "../components/PaymentCards/PaymentCard";

export const PaymentCardsContext = React.createContext();

const PaymentCardsPage = () => {

    const [cards, setCards] = useState(PaymentCardsData)

    return (
        <SafeAreaView style={styles.page}>
            <Header title={'PAYMENT CARDS'}/>
            <PaymentCardsContext.Provider
                value={{
                    cards: cards,
                    setCards: setCards,
                }}>
                <FlatList data={cards} renderItem={({item}) =>
                    <PaymentCard card={item}/>
                } style={{padding: '5%'}}/>
            </PaymentCardsContext.Provider>
            <PrimaryButton text={'Add New Payment Card'}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    page:{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#E5E5E5',
    }
});

export default PaymentCardsPage;
