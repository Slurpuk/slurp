import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import firebase from '@react-native-firebase/app';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';
import {getCushyPaddingTop} from '../../stylesheets/StyleFunction';
import textStyles from '../../stylesheets/textStyles';
import {Alerts} from '../data/Alerts';

const LogInPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  );

  /*
  Send verification email to user to reset their password
   */
  async function forgotPassword() {
    if (!emailRegex.test(email)) {
      Alert.alert(
        'Add Email',
        'Please enter your email correctly in the field above to reset your password.',
      );
    } else {
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => Alerts.resetPasswordAlert())
        .catch(error => {
          if (error.code === 'auth/network-request-failed') {
            Alerts.connectionErrorAlert();
          } else if (error.code === 'auth/invalid-email') {
            Alerts.badEmailAlert();
          } else if (error.code === 'auth/user-not-found') {
            Alerts.resetPasswordAlert();
          } else {
            //Anything else
            Alerts.elseAlert();
          }
        });
    }
  }

  /*
  Deal with bad or empty inputs before sending request
   */
  function handleLogInErrorsFrontEnd() {
    let validity = true;
    if (email === '') {
      Alert.alert('Empty Email', 'Please enter your email.');
      validity = false;
    } else if (!emailRegex.test(email)) {
      Alerts.badEmailAlert();
      validity = false;
    } else if (password === '') {
      Alert.alert('Empty Password', 'Please enter your password.');
      validity = false;
    }
    return validity;
  }

  /*
  Manage response to database failure
   */
  function handleLogInErrorsBackEnd(error) {
    let errorCode = error.code;
    if (
      errorCode === 'auth/wrong-password' ||
      errorCode === 'auth/user-not-found'
    ) {
      Alerts.wrongCredentialsAlert();
    } else if (errorCode === 'auth/invalid-email') {
      Alerts.badEmailAlert();
    } else if (errorCode === 'auth/network-request-failed') {
      Alerts.connectionErrorAlert();
    } else {
      //Anything else
      Alerts.elseAlert();
    }
  }

  async function authenticateUser() {
    if (handleLogInErrorsFrontEnd()) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => handleLogInErrorsBackEnd(error));
    }
  }

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Text style={[textStyles.blueJosefinHeading]}>Log In</Text>
      <View style={styles.form}>
        <FormField
          title={'Email'}
          setField={setEmail}
          type={'email'}
          value={email}
        />
        <FormField
          title={'Password'}
          placeholder={''}
          setField={setPassword}
          type={'password'}
          value={password}
        />
        <Text
          style={[textStyles.bluePoppinsBody, styles.hyperlink]}
          onPress={forgotPassword}>
          Forgot your password?
        </Text>
        <Text
          style={[textStyles.bluePoppinsBody, styles.hyperlink]}
          onPress={() => navigation.navigate('SignUp')}>
          New? Create an account
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text={'Log in'}
          onPress={authenticateUser}
          priority={'primary'}
        />
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
    paddingBottom: '5%',
    paddingHorizontal: '5%',
  },
  form: {
    flex: 3,
    paddingVertical: '5%',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: '4%',
  },
  hyperlink: {
    marginVertical: '2%',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },
});

export default LogInPage;
