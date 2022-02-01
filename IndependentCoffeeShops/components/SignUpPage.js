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
    Pressable,
    TextInput,
} from 'react-native';
import { create } from 'react-test-renderer';
import SignUpForm from "./SignUpForm";


const App = () => {

    const createAccount = () => {

    }

    return(
        <View style={styles.page}>
            <View style={styles.body}>
                <Text style={[styles.title, styles.text]}>Sign Up</Text>
                <SignUpForm></SignUpForm>
                <View style={styles.buttons}>
                    <Pressable style={[styles.button, styles.preferences_button]}>
                        <Text style={[styles.text, styles.buttons]}>Set Coffee Preferences</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.account_button]}
                        onPress={createAccount}>
                        <Text style={[styles.text, styles.buttons]}>Create Account</Text>
                    </Pressable>
                </View>
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
    name: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        borderRadius: 13,
        height: 41,
        marginTop: 20,
    },
    account_button: {
        backgroundColor: '#087562',
    },
    buttons: {
        color: '#EFEFEF',
        textAlign: 'center',
        flexDirection: 'column',

    },
    preferences_button: {
        backgroundColor: '#2D466B',
    },
});

export default App;
