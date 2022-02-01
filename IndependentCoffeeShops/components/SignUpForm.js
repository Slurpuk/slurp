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


const App = () => {
    const[first_name, setFirstName] = useState()
    const[last_name, setLastName] = useState()
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()

    const createAccount = () => {

    }

    return(
        <View style={styles.form}>
            <View style={styles.name}>
                <View style={styles.element, styles.sub_name}>
                    <Text style={styles.text}>First name</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>
                <View style={styles.element, styles.sub_name}>
                    <Text style={styles.text}>Last name</Text>
                    <TextInput style={styles.input}></TextInput>
                </View>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.input}></TextInput>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true}></TextInput>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Password confirmation</Text>
                <TextInput style={styles.input} secureTextEntry={true}></TextInput>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Josefin Sans',
        fontWeight:'700',
        color: '#173C4F',
    },
    name: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    form: {
        flexDirection: 'column',
    },
    preferences_button: {
        backgroundColor: '#2D466B',
    },
    element: {
        marginTop: 10,
        fontSize: 16,
    },
    input: {
        marginTop: 10,
        backgroundColor: '#F9F9F9',
        width: '100%',
        height: 37,
        borderRadius: 5,
    },
    sub_name: {
        width: 180,
    }
});

export default App;
