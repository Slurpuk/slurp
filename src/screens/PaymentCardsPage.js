import React from 'react';
import {StyleSheet, View, Pressable, Image, Text, Alert, SafeAreaView} from 'react-native';
import Header from '../SubComponents/Header'
import PrimaryButton from '../SubComponents/PrimaryButton'

const PaymentCardsPage = () => {

    return (
        <SafeAreaView>
            <Header title={'PAYMENT CARDS'}></Header>
            <View><Text>Active Cards Here</Text></View>
            <PrimaryButton text={'Add New Payment Card'}></PrimaryButton>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({

});

export default PaymentCardsPage;
