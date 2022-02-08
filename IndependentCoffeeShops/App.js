import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
  StyleSheet,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignUpPage from './src/components/UserManagement/SignUpForm';
export default function App(){
  const usersCollection = firestore().collection('Users');
  const[isSignedIn, setIsSignedIn] = useState(false);
  const[email, setEmail] = useState('');
  const[password] = useState('');
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
      <SignUpPage></SignUpPage>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 55,
    flex: 1,
    padding: 10,
  },
});
