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

    const[email, setEmail] = useState()
    const[password, setPassword] = useState()

    // Log in the user to the app after checking their credentials
    const loginUser = () =>{
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
            "Logged In Successfully",
            [
                {
                    text: "OK",
                }
            ]
        )
    }

    return(
        <View>
            <View style={styles.form}>
                <View style={styles.element}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput style={styles.input} placeholder="johnsmith@gmail.com" onChangeText={text => setEmail(text)}/>
                </View>
                <View style={styles.element}>
                    <Text style={styles.text}>Password</Text>
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
                </View>
            </View>
            <Pressable
                style={[styles.button, styles.account_button]}
                onPress={loginUser}>
                <Text style={[styles.text, styles.button_text]}>Log In</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Josefin-Sans',
        fontWeight:'700',
        color: '#173C4F',
    },

    form: {
        paddingVertical: '5%',
    },

    element: {
        fontSize: 16,
        paddingVertical: '1%',
    },

    input: {
        backgroundColor: '#F9F9F9',
        width: '100%',
        height: 37,
        borderRadius: 5,
    },

    // will be replaced by Sean's beautiful buttons
    button_container: {
        paddingVertical: '2%',
    },
    button: {
        borderRadius: 13,
        height: 41,
    },
    account_button: {
        backgroundColor: '#087562',
    },
    button_text: {
        color: '#EFEFEF',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
    }
    // -------------------------------------------
});

export default App;
