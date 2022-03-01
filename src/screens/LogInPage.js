/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
  Platform,
  Button, Dimensions,TouchableOpacity,
} from 'react-native';
import FormField from '../sub-components/FormField';
import textStyles from '../../stylesheets/textStyles';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {emitNotificationDecl} from "react-native/ReactCommon/hermes/inspector/tools/msggen/src/HeaderWriter";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const LogInPage = (navigation) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const switchToLogIn = () => {
    Alert.alert(
        'FUTURE NAVIGATION FEATURE',
        'One day, clicking this will take you to the sign up portal',
        [
          {
            text: ':)',
          },
        ],
    );
  };

// Display a confirmation message to the user
  const authMessage = () => {
    Alert.alert('Success', 'Authenticated Successfully', [
      {
        text: 'OK',
      },
    ]);
  };

  const invalidUserMessage = () => {
    Alert.alert('Invalid', 'Authenticated Denied', [
      {
        text: 'OK',
      },
    ]);
  };

  const invalidMessage = (e) => {
    Alert.alert('Invalid', "Please enter your credentials correctly", [
      {
        text: 'OK',
      },
    ]);
  };

  const resetFields = () => {
    setEmail('');
    setPassword('');
  };

  const navigateToLandingMapPage = () => {
    navigation.navigate('LandingMapPage');
  };

  const authenticateUser = async() => {

    try {
      let response = await auth().signInWithEmailAndPassword(email, password)
      if (response && response.user) {
        authMessage();
        resetFields();
        // navigateToLandingMapPage();
      }
      else{
        invalidUserMessage();
      }
    } catch (e) {
      //console.error(e.message)
      invalidMessage(e.message);
    }

  };



  return (
      <View style={styles.wrapper}>
        <StatusBar translucent={true} backgroundColor="transparent" />
        <View style={styles.safeSpace}>
          <View style={styles.body}>
            <Text style={[textStyles.blueJosefinHeading]}>Log In</Text>
            <View style={styles.form}>
              <FormField
                  title={'Email'}
                  setField={setEmail}
                  type={'email'}
                  value={email}/>
              <FormField
                  title={'Password'}
                  placeholder={''}
                  setField={setPassword}
                  type={'password'}
                  value={password}
              />
              <View>
                <Text
                    style={[textStyles.bluePoppinsBody, styles.footer]}
                    onPress={switchToLogIn}
                >
                  Forgot your password?
                </Text>
              </View>
            </View>
            <View style={styles.buttons_container}>
              <TouchableOpacity
                  onPress={authenticateUser}
                  style={{backgroundColor: '#087562',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height : screenHeight/ 18,
                    width: screenWidth/ 1.1,
                    borderRadius: 13}}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}} >Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  safeSpace: {
    flex: 1,
    backgroundColor: '#EDEBE7',
    paddingTop:
        Platform.OS === 'android'
            ? getStatusBarHeight() / 3
            : getStatusBarHeight(),
  },
  body: {
    backgroundColor: '#EDEBE7',
    flex: 1,
    padding: '5%',
  },
  form: {
    flex: 3,
    paddingVertical: '5%',
  },
  buttons_container: {
    alignContent: 'flex-end',
    marginVertical: '3%',
  },
  footer: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },
});

export default LogInPage;

