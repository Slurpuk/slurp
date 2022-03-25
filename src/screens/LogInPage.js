/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import FormField from '../sub-components/FormField';
import textStyles from '../../stylesheets/textStyles';
import auth from '@react-native-firebase/auth';
import {getCushyPaddingTop} from '../../stylesheets/StyleFunction';
import CustomButton from '../sub-components/CustomButton';
import WhiteArrowButton from "../sub-components/WhiteArrowButton";
import {GlobalContext} from "../../App";

const LogInPage = ({navigation}) => {
  const context = useContext(GlobalContext);
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

  // const resetFields = () => {
  //   setEmail(' ');
  //   setPassword(' ');
  // };

  const authenticateUser = async () => {
    try {
      await auth()
        .signInWithEmailAndPassword(email, password)
        .then(response => {
          if (response && response.user) {
            context.enterApp();
          } else {
            invalidUserMessage();
          }
        });
    } catch (e) {
      invalidMessage(e.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {context.isFirstTime ? (
          <WhiteArrowButton
            navigation={navigation}
            direction={'left'}
            onPressAction={() => navigation.navigate('Welcome')}
            customStyle={{marginRight: '26%'}}
          />
        ) : null}
        <Text style={[textStyles.blueJosefinHeading]}>Log In</Text>
      </View>
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
          onPress={switchToSignUp}>
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
    textAlign: 'center',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },
});

export default LogInPage;
