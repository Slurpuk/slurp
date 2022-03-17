/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import FormField from '../sub-components/FormField';
import textStyles from '../../stylesheets/textStyles';
import auth from '@react-native-firebase/auth';
import {getCushyPaddingTop} from '../../stylesheets/StyleFunction';
import CustomButton from '../sub-components/CustomButton';

const LogInPage = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const invalidUserMessage = () => {
    Alert.alert('Invalid', 'Authenticated Denied', [
      {
        text: 'OK',
      },
    ]);
  };

  const invalidMessage = e => {
    Alert.alert('Invalid', 'Please enter your credentials correctly', [
      {
        text: 'OK',
      },
    ]);
  };

  const resetFields = () => {
    setEmail('');
    setPassword('');
  };

  const authenticateUser = async () => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password);
      if (response && response.user) {
        resetFields();
      } else {
        invalidUserMessage();
      }
    } catch (e) {
      invalidMessage(e.message);
    }
  };

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
        <View>
          <Text
            style={[textStyles.bluePoppinsBody, styles.footer]}
            onPress={null}>
            Forgot your password?
          </Text>
        </View>
        <View>
          <Text
            style={[textStyles.bluePoppinsBody, styles.footer]}
            onPress={switchToSignUp}
          >
            New? Create an account
          </Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
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
    paddingHorizontal: '5%',
  },
  form: {
    flex: 3,
    paddingVertical: '5%',
  },
  buttonsContainer: {
    justifyContent: 'flex-end',
    marginBottom: '4%',
  },
  footer: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },
});

export default LogInPage;
