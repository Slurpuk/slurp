import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ChangePasswordForm from '../components/UserManagement/ChangePasswordForm';

const ChangePasswordPage = () => {
  return (
    <View style={styles.body}>
      <Text style={[styles.title, styles.text]}>Change Password</Text>
      <ChangePasswordForm style={styles.form} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#EDEBE7',
    padding: '5%',
    flex: 1,
  },
  title: {
    fontSize: 35,
    lineHeight: 35,
    flex: 0.2,
    textAlignVertical: 'center',
  },
  text: {
    fontFamily: 'Josefin-Sans',
    fontWeight: '700',
    color: '#173C4F',
  },
  form: {
    flex: 3,
  },
});

export default ChangePasswordPage;
