import React, {useState} from 'react';
import {StyleSheet, View, Pressable, Image, Text, Alert, SafeAreaView, FlatList} from 'react-native';
import Header from '../SubComponents/Header'
import PrimaryButton from '../SubComponents/PrimaryButton'
import PaymentCardsData from "../fake-data/PaymentCardsData";
import PaymentCard from "../components/PaymentCards/PaymentCard";

const PaymentCardsPage = () => {

    const [cards, setCards] = useState(PaymentCardsData)

    return (
        <SafeAreaView>
            <Header title={'PAYMENT CARDS'}/>
            <FlatList data={cards} renderItem={({item}) =>
                <PaymentCard card={item}/>
            }/>
            <PrimaryButton text={'Add New Payment Card'}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default PaymentCardsPage;
