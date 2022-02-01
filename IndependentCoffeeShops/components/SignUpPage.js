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
                <SignUpForm style={styles.form}></SignUpForm>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    page:{
        backgroundColor: '#EDEBE7',
        flex: 1,
        padding: '5%',
    },
    body: {
        backgroundColor: '#EDEBE7',
        flex: 1,
        marginTop: '15%',
        marginBottom: '15%',
    },
    title: {
        fontSize: 35,
        lineHeight: 35,
        flex: 1,
    },
    form: {
        flex: 4,
    },
    text: {
        fontFamily: 'Josefin Sans',
        fontWeight:'700',
        color: '#173C4F',
    },
});

export default App;
