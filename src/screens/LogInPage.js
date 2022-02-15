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
} from 'react-native';
import FormField from '../components/UserManagement/FormField';
import PrimaryButton from '../SubComponents/PrimaryButton';
import textStyles from '../../stylesheets/textStyles';
import {getStatusBarHeight} from 'react-native-status-bar-height';

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
const registeredMessage = () => {
  Alert.alert('Congratulations', 'Authenticated Successfully', [
    {
      text: 'OK',
    },
  ]);
};

const authenticateUser = () => {
  registeredMessage();
};
const LogInPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.safeSpace}>
        <View style={styles.body}>
          <Text style={[textStyles.blueJosefinHeading]}>Log In</Text>
          <View style={styles.form}>
            <FormField title={'Email'} setField={setEmail} type={'email'} />
            <FormField
              title={'Password'}
              placeholder={''}
              setField={setPassword}
              type={'password'}
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
            <PrimaryButton text={'Log In'} onPress={authenticateUser} />
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
