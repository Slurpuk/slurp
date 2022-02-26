import React, {useState} from 'react';
import {BottomSheet} from 'react-native-bottomsheet-reanimated';
import type {Node} from 'react';
//import Inputs from 'DesignMap/src/screens/inputs.js'
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import SignUpPage from './src/screens/SignUpPage';
import LoginPage from './src/screens/LogInPage';
import LandingMapPage from './src/screens/LandingMapPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChangeDetailsPage from './src/components/UserManagement/ChangeDetailsPage';
// import ChangePassword from './src/components/UserManagement/ChangePassword';
import PaymentCardsPage from './src/screens/PaymentCardsPage';
import HamburgerSlideBarNavigator from './src/navigation/HamburgerSlideBarNavigator';
import { ShopListStackNavigator } from "./src/navigation/StackNavigator";

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
    // <View style = {styles.mainContainer}>
    //   <TextInput placeholder="email" value={email} onChangeText={text => setEmail(text)}/>
    //   <TextInput placeholder="password" value={password} secureTextEntry={true} onChangeText={text => setPassword(text)}/>
    //   <Button
    //     title='Registerlol'
    //     onPress={registerUser}
    //   />
    // </View>
    //  <LoginPage></LoginPage>

    <NavigationContainer>
      <HamburgerSlideBarNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 55,
    flex: 1,
    padding: 10,
  },
});
