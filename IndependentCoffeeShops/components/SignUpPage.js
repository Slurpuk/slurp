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
    Text, Alert,
} from 'react-native';
import SignUpForm from "./SignUpForm";


// Redirect the user to the Log In Portal
const switchToLogIn = () => {
    Alert.alert(
        "FUTURE NAVIGATION FEATURE",
        "One day, clicking this will take you to the log in portal",
        [
            {
                text: ":)",
            }
        ]
    )
}


const App = () => {
    return(
        <View style={styles.body}>
            <Text style={[styles.title, styles.text]}>Sign Up</Text>
            <SignUpForm style={styles.form}></SignUpForm>
            <Text style={styles.text, styles.footer} onPress={switchToLogIn}>Already have an account? Log in here</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#EDEBE7',
        padding: '5%',
        flex: 1,
    },
    title: {
        fontSize: 35,
        lineHeight: 35,
        flex: 0.2,
        textAlignVertical: 'center',
    },
    text: {
        fontFamily: 'Josefin Sans',
        fontWeight:'700',
        color: '#173C4F',
    },
    form: {
        flex: 3,
    },
    footer: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        flex: 0.2,
        textAlignVertical: "bottom",
    }
});

export default App;
