/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import textStyles from '../../stylesheets/textStyles';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';
import {
  getCushyPaddingTop,
  getPerfectPadding,
} from '../../stylesheets/StyleFunctions';

// Redirect the user to the Log In Portal
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

// Display a confirmation message to the user
const registeredMessage = () => {
  Alert.alert('Congratulations', 'Registered Successfully', [
    {
      text: 'OK',
    },
  ]);
};

// Register the user to the database after checking their credentials
const registerUser = () => {
  registeredMessage();
};

const SignUpPage = () => {
  // const usersCollection = firestore().collection('Users');
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();

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
              />
              <FormField
                style={[styles.sub_name_container]}
                title={'Last Name'}
                placeholder={'Doe'}
                setField={setLastName}
                type={'name'}
              />
            </View>
            <FormField
              style={styles.element}
              title={'Email'}
              placeholder={'johndoe@gmail.com'}
              setField={setEmail}
              type={'email'}
            />
            <FormField
              style={styles.element}
              title={'Password'}
              setField={setPassword}
              type={'password'}
            />
            <FormField
              style={styles.element}
              title={'Confirm Password'}
              setField={setPasswordConfirmation}
              type={'password'}
            />
          </View>

          <View style={styles.buttons_container}>
            <View style={styles.button_container}>
              <CustomButton
                text={'Set Coffee Preferences'}
                onPress={null}
                priority={'primary'}
              />
            </View>
            <View style={styles.button_container}>
              <CustomButton
                text={'Create Account'}
                onPress={registerUser}
                priority={'primary'}
              />
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
    backgroundColor: '#EDEBE7',
    paddingTop: getCushyPaddingTop(),
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
