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
  KeyboardAvoidingView, Alert,
} from "react-native";
import FormField from '../components/UserManagement/FormField';
import PrimaryButton from "../SubComponents/PrimaryButton";
import textStyles from "../../stylesheets/textStyles";

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
}
const LogInPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <SafeAreaView style={styles.safeSpace}>
      <View style={styles.body}>
        <Text style={[textStyles.blueJosefinHeading]}>Log In</Text>
        <View style={styles.form}>
          <FormField
            title={'Email'}
            setField={setEmail}
            type={'email'}
          />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeSpace: {
    flex: 1,
    backgroundColor: '#EDEBE7',
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
