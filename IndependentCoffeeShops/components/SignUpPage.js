/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import SignUpForm from "./SignUpForm";


const App = () => {
    return(
        <View style={styles.page}>
            <View style={styles.body}>
                <Text style={[styles.title, styles.text]}>Sign Up</Text>
                <SignUpForm></SignUpForm>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page:{
        backgroundColor: '#EDEBE7',
        height: '100%',
        width: '100%',
        padding: 17,
    },
    body: {
        backgroundColor: '#EDEBE7',
        height: '100%',
        width: '100%',
        marginTop: 48,
        marginBottom: 48,
    },
    title: {
        fontSize: 35,
        lineHeight: 35,
        marginBottom: '20%',
    },
    text: {
        fontFamily: 'Josefin Sans',
        fontWeight:'700',
        color: '#173C4F',
    },
});

export default App;
