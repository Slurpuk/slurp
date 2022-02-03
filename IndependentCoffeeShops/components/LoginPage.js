/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LoginForm from './LoginForm';

const LogInPage = () => {
  return (
    <View style={styles.page}>
      <View style={styles.body}>
        <Text style={[styles.title, styles.text]}>Log In</Text>
        <LoginForm style={styles.form}></LoginForm>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#EDEBE7',
    flex: 1,
    padding: '5%',
  },
  body: {
    backgroundColor: '#EDEBE7',
    flex: 1,
    padding: '5%',
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
    flex: 4,
  },
});

export default LogInPage;
