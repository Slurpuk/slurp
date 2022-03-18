import React, { useContext, useState } from "react";
import {Alert, StyleSheet, View} from 'react-native';
import GreenHeader from '../sub-components/GreenHeader';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';
import firebase from '@react-native-firebase/app';
import { GlobalContext } from "../../App";
import auth from '@react-native-firebase/auth';

const ChangePasswordPage = ({navigation}) => {
  const [newPassword, setNewPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const context = useContext(GlobalContext);

  const resetFields = () => {
    setOldPassword('');
    setNewPassword('');
    setPasswordConfirmation('');
  };

  function successMessage() {
    Alert.alert('Success!', 'Password Updated', [
      {
        text: 'OK',
      },
    ]);
    resetFields();
  }

  function invalidUpdateMessage() {
    Alert.alert('Invalid', 'Something went wrong! Please try again.', [
      {
        text: 'OK',
      },
    ]);
    resetFields();
  }

  function invalidCredentialsMessage() {
    Alert.alert('Invalid', 'Please enter your old password correctly.', [
      {
        text: 'OK',
      },
    ]);
    resetFields();
  }

  function invalidPassMatchMessage() {
    Alert.alert(
      'Invalid',
      'Your confirmation does not match the new password.',
      [
        {
          text: 'OK',
        },
      ],
    );
    resetFields();
  }


  function changePassword() {
    if (newPassword === passwordConfirmation) {
      auth()
        .signInWithEmailAndPassword(context.user.email, oldPassword)
        .then(() => {
          context.user
            .updatePassword(newPassword)
            .then(() => {
              successMessage();
              navigation.goBack();
            })
            .catch(error => {
              invalidUpdateMessage();
            });
        })
        .catch(error => {
          invalidCredentialsMessage();
        });
    } else {
      invalidPassMatchMessage();
    }
  }
  return (
    <View style={styles.container}>
      <GreenHeader headerText={'CHANGE PASSWORD'} navigation={navigation} />
      <View style={styles.form}>
        <FormField
          title={'Old Password'}
          setField={setOldPassword}
          type={'password'}
        />
        <FormField
          title={'New Password'}
          setField={setNewPassword}
          type={'password'}
        />
        <FormField
          title={'Confirm Password'}
          setField={setPasswordConfirmation}
          type={'password'}
        />
      </View>
      <View style={styles.button}>
        <CustomButton
          text={'Update Password'}
          priority={'secondary'}
          onPress={changePassword}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEBE7',
    flex: 1,
  },
  form: {
    margin: '5%',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChangePasswordPage;
