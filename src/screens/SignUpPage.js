/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, Platform, Button, Dimensions, TouchableOpacity} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {SafeAreaView} from 'react-native-safe-area-context';
import textStyles from '../../stylesheets/textStyles';
import FormField from '../sub-components/FormField';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {getCushyPaddingTop} from '../../stylesheets/StyleFunction';
import CustomButton from '../sub-components/CustomButton';

// Redirect the user to the Log In Portal

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SignUpPage = navigation => {
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
    Alert.alert('Warning!', 'Password should be same as password confirmation!', [
      {
        text: 'OK',
      },
    ]);
  }

  const warningUserAlreadyExists = () => {
    Alert.alert('Warning!', 'This email already exists', [
      {
        text: 'OK',
      },
    ]);
  }


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
    if(password == password_confirmation) {
      auth().createUserWithEmailAndPassword(email, password)
          .then((re) => {
            console.log(re);
            console.log(x);
          })
          .catch((re) => {
            console.log(re);
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              warningUserAlreadyExists()
            }})
      registeredMessage(); }

    else{
      warningPassword();
      resetFLEFields();
    }
  };


  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Text style={[textStyles.blueJosefinHeading]}>Sign Up</Text>

      <View style={styles.formContainer}>
        <View style={styles.namesContainer}>
          <FormField
            style={[styles.subNameContainer, styles.subNameContainerLeft]}
            title={'First Name'}
            placeholder={'Jane'}
            setField={setFirstName}
            type={'name'}
            value={first_name}
          />
          <FormField
            style={[styles.subNameContainer]}
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
          placeholder={'janedoe@gmail.com'}
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

      <View style={styles.buttonsContainer}>
        <View style={styles.button}>
          <CustomButton
            text={'Create Account'}
            onPress={registerUser}
            priority={'primary'}
            style={styles.button}
          />
        </View>
        <View>
          <Text
            style={[textStyles.bluePoppinsBody, styles.hyperlink]}
            onPress={switchToLogIn}>
            Already have an account? Log in here
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#EDEBE7',
    paddingTop: getCushyPaddingTop(),
    paddingHorizontal: '5%',
  },
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingTop: '3%',
  },

  namesContainer: {
    flexDirection: 'row',
    display: 'flex',
    paddingVertical: '2%',
  },
  subNameContainer: {
    flex: 1,
  },
  subNameContainerLeft: {
    marginRight: '5%',
  },

  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '4%',
  },
  button: {
    marginVertical: '2%',
  },
  hyperlink: {
    marginVertical: '2%',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },
});

export default SignUpPage;

