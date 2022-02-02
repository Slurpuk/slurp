import React, {useState} from 'react';
import {BottomSheet} from 'react-native-bottomsheet-reanimated';
import type {Node} from 'react';
//import Inputs from 'DesignMap/src/screens/inputs.js'
import { View, Text, TouchableOpacity, TextInput, StyleSheet,Button } from 'react-native'
import {authentication} from './firestore/firebase-config'
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage";
import BasketPage from "./components/BasketPage";




export default function App(){
  const usersCollection = firestore().collection('Users');
  const[isSignedIn, setIsSignedIn] = useState(false);
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[x, setX] = useState(usersCollection);



  const registerUser = () =>{
    auth().createUserWithEmailAndPassword(email,password)
      .then((re)=>{
        console.log(re);
        console.log(x);
      })
      .catch((re)=>{
        console.log(re);
      })
  }


  return(
    // <View style = {styles.mainContainer}>
    //   <TextInput placeholder="email" value={email} onChangeText={text => setEmail(text)}/>
    //   <TextInput placeholder="password" value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
    //   <Button
    //     title='Registerlol'
    //     onPress={registerUser}
    //   />
    // </View>

        <BasketPage></BasketPage>

      // <SignUpPage></SignUpPage>
      //  <LoginPage></LoginPage>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 55,
    flex: 1,
    padding: 10
  },
})
