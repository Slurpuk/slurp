/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, Platform, Button, Dimensions, TouchableOpacity} from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import AddNewCardComponent from "../components/PaymentCards/AddNewCardComponent";


const AddNewCardPage = () => {

//    const [publishableKey, setPublishableKey] = useState('');

//    const fetchPublishableKey = async () => {
//        const key = "pk_test_51KRjSVGig6SwlicvL06FM1BDNZr1539SwuDNXond8v6Iaigyq1NRZsleWNK5PTPEwo1bAWfTQqYHEfXCJ4OWq348000jVuI6u1" // fetch key from your server here
//        setPublishableKey(key);
//    };

//    useEffect(() => {
//        fetchPublishableKey();
//    }, []);

    const publishableKey = "pk_test_51KRjSVGig6SwlicvL06FM1BDNZr1539SwuDNXond8v6Iaigyq1NRZsleWNK5PTPEwo1bAWfTQqYHEfXCJ4OWq348000jVuI6u1";

    return (
        <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier"
        >
            <AddNewCardComponent />
        </StripeProvider>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },

});

export default AddNewCardPage;

