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
} from 'react-native';
import FormField from '../components/UserManagement/FormField';

const LogInPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.body}>
        <Text style={[styles.title, styles.text]}>Log In</Text>
        <View style={styles.form}>
          <FormField
            style={styles.element}
            title={'Email'}
            setField={setEmail}
            type={'email'}
          />
          <FormField
            style={styles.element}
            title={'Password'}
            placeholder={''}
            setField={setPassword}
            type={'password'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#EDEBE7',
    flex: 1,
    ...Platform.select({
      ios: {
        padding: '5%',
        paddingBottom: '2%',
      },
      android: {
        paddingHorizontal: '3%',
        paddingVertical: '2%',
      },
    }),
  },
  text: {
    fontFamily: 'Josefin Sans',
    fontWeight: '700',
    color: '#173C4F',
  },
  title: {
    fontSize: 35,
    lineHeight: 35,
    flex: 0.5,
    marginBottom: '10%',
  },
  form: {
    flex: 3,
    paddingVertical: '5%',
  },
});

export default LogInPage;
