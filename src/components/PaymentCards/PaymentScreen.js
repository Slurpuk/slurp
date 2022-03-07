import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, Platform, Button, Dimensions, TouchableOpacity} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function PaymentScreen() {
    const { confirmPayment } = useStripe();

    return (
        <View style={{alignItems: 'center', backgroundColor: '#EDEBE7',flex: 1}}>
            <Text style={{fontSize: 20, color: 'black'}}>Payment Page</Text>

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
            onCardChange={(cardDetails) => {
                console.log('cardDetails', cardDetails);
            }}
            onFocus={(focusedField) => {
                console.log('focusField', focusedField);
            }}
        />
            <TouchableOpacity
                style={{backgroundColor: '#087562',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height : screenHeight/ 18,
                    width: screenWidth/ 1.1,
                    borderRadius: 13}}
            >
                <Text>Pay Now</Text>
            </TouchableOpacity>
            </View>
    );
}
