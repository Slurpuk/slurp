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
    Alert,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';


const App = () => {
    // const usersCollection = firestore().collection('Users');
    const[first_name, setFirstName] = useState()
    const[last_name, setLastName] = useState()
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()
    const[password_confirmation, setPasswordConfirmation] = useState()

    // Register the user to the database after checking their credentials
    const registerUser = () =>{
    //     auth().createUserWithEmailAndPassword(email,password)
    //         .then((re)=>{
    //             console.log(re);
    //             console.log(x);
    //         })
    //         .catch((re)=>{
    //             console.log(re);
    //         })
        registeredMessage()
    }

    // Display a confirmation message to the user
    const registeredMessage = () => {
        Alert.alert(
            "Congratulations",
            "Registered Successfully",
            [
                {
                    text: "OK",
                }
            ]
        )
    }

    return(
        <View>
            <View style={styles.name}>
                <View style={styles.element, styles.sub_name}>
                    <Text style={styles.text}>First name</Text>
                    <TextInput style={styles.input} placeholder="John" onChangeText={text => setFirstName(text)}/>
                </View>
                <View style={styles.element, styles.sub_name}>
                    <Text style={styles.text}>Last name</Text>
                    <TextInput style={styles.input} placeholder="Smith" onChangeText={text => setLastName(text)}/>
                </View>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Email</Text>
                <TextInput style={styles.input} placeholder="johnsmith@gmail.com" onChangeText={text => setEmail(text)}/>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
            </View>
            <View style={styles.element}>
                <Text style={styles.text}>Password confirmation</Text>
                <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => setPasswordConfirmation(text)}/>
            </View>
            <View style={styles.buttons}>
                <Pressable style={[styles.button, styles.preferences_button]}>
                    <Text style={[styles.text, styles.buttons]}>Set Coffee Preferences</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.account_button]}
                    onPress={registerUser}>
                    <Text style={[styles.text, styles.buttons]}>Create Account</Text>
                </Pressable>
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
