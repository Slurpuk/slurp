import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {BottomSheet} from 'react-native-bottomsheet-reanimated';
import type {Node} from 'react';
//import Inputs from 'DesignMap/src/screens/inputs.js'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import PrimaryButton from './PrimaryButton';
import {authentication} from './firestore/firebase-config';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {rgbaColor} from 'react-native-reanimated/src/reanimated2/Colors';

export default function App() {
  const usersCollection = firestore().collection('Users');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [x, setX] = useState(usersCollection);

  const registerUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(re => {
        console.log(re);
        console.log(x);
      })
      .catch(re => {
        console.log(re);
      });
  };

  return (
    <View style={styles.mainContainer}>
      <PrimaryButton text="Create Account" />
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      {/*<PrimaryButton title="Registerlol" onPress={registerUser} />*/}
      <Text style={styles.textStyle}>Most recent text</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 55,
    flex: 1,
    padding: 10,
  },
  primaryButton: {
    backgroundColor: 'teal',
    borderColor: 'white',
    borderWidth: 3,
    borderStyle: 'solid',
    color: '#388888',
    borderRadius: 20,
  },
  textStyle: {
    color: 'grey',
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: 'white',
  },
});
