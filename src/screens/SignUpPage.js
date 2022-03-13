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
  Alert,
  StatusBar,
  Platform,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {SafeAreaView} from 'react-native-safe-area-context';
import textStyles from '../../stylesheets/textStyles';
import FormField from '../sub-components/FormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// Redirect the user to the Log In Portal

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SignUpPage = () => {
  // const usersCollection = firestore().collection('Users');
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const resetFLEFields = () => {
    setPassword('');
    setPasswordConfirmation('');
  };

  const switchToLogIn = () => {
    Alert.alert(
      'FUTURE NAVIGATION FEATURE',
      'One day, clicking this will take you to the log in portal',
      [
        {
          text: ':)',
        },
      ],
    );
  };

  const warningPassword = () => {
    Alert.alert(
      'Warning!',
      'Password should be same as password confirmation!',
      [
        {
          text: 'OK',
        },
      ],
    );
  };

  const warningUserAlreadyExists = () => {
    Alert.alert('Warning!', 'This email already exists', [
      {
        text: 'OK',
      },
    ]);
  };

  // Display a confirmation message to the user
  const registeredMessage = () => {
    Alert.alert('Congratulations', 'Registered Successfully', [
      {
        text: 'OK',
      },
    ]);
    resetFields();
  };

  // Register the user to the database after checking their credentials
  const registerUser = () => {
    if (password == password_confirmation) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(re => {
          console.log(re);
          console.log(x);
        })
        .catch(re => {
          console.log(re);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            warningUserAlreadyExists();
          }
        });
      registeredMessage();
    } else {
      warningPassword();
      resetFLEFields();
    }
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.safeSpace}>
        <View style={styles.body}>
          <Text style={[textStyles.blueJosefinHeading]}>Sign Up</Text>

          <View style={styles.form}>
            <View style={styles.name_container}>
              <FormField
                style={[
                  styles.sub_name_container,
                  styles.sub_name_container_left,
                ]}
                title={'First Name'}
                placeholder={'John'}
                setField={setFirstName}
                type={'name'}
                value={first_name}
              />
              <FormField
                style={[styles.sub_name_container]}
                title={'Last Name'}
                placeholder={'Doe'}
                setField={setLastName}
                type={'name'}
                value={last_name}
              />
            </View>
            <FormField
              style={styles.element}
              title={'Email'}
              placeholder={'johndoe@gmail.com'}
              setField={setEmail}
              type={'email'}
              value={email}
            />
            <FormField
              style={styles.element}
              title={'Password'}
              setField={setPassword}
              type={'password'}
              value={password}
            />
            <FormField
              style={styles.element}
              title={'Confirm Password'}
              setField={setPasswordConfirmation}
              type={'password'}
              value={password_confirmation}
            />
          </View>

          <View style={styles.buttons_container}>
            <View style={styles.button_container}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#2D466B',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: screenHeight / 18,
                  width: screenWidth / 1.1,
                  borderRadius: 13,
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Set Coffee Preferances
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button_container}>
              <TouchableOpacity
                onPress={registerUser}
                style={{
                  backgroundColor: '#087562',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: screenHeight / 18,
                  width: screenWidth / 1.1,
                  borderRadius: 13,
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={[textStyles.bluePoppinsBody, styles.footer]}
                onPress={switchToLogIn}
              >
                Already have an account? Log in here
              </Text>
            </View>
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
    flex: 1,
    padding: '5%',
  },
  form: {
    flex: 3,
    paddingVertical: '5%',
  },
  footer: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },

  buttons_container: {
    flex: 1,
    alignContent: 'flex-end',
  },
  button_container: {
    paddingVertical: '3%',
  },

  name_container: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: '2%',
  },
  sub_name_container: {
    flex: 1,
  },
  sub_name_container_left: {
    marginRight: '5%',
  },
  input: {
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: 37,
    borderRadius: 5,
  },
});

export default SignUpPage;
