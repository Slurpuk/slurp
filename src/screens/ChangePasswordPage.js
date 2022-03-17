import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import GreenHeader from '../sub-components/GreenHeader';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';
import firebase from '@react-native-firebase/app';

const ChangePasswordPage = ({navigation}) => {
  const [newPassword, setNewPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();

  const resetFLEFields = () => {
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
    resetFLEFields();
  }

  function invalidUpdateMessage() {
    Alert.alert('Invalid', 'Something went wrong! Please try again.', [
      {
        text: 'OK',
      },
    ]);
    resetFLEFields();
  }

  function invalidCredentialsMessage() {
    Alert.alert('Invalid', 'Please enter your old password correctly.', [
      {
        text: 'OK',
      },
    ]);
    resetFLEFields();
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
    resetFLEFields();
  }

  function reauthenticate() {
    let user = firebase.auth().currentUser;
    let cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword,
    );
    return user.reauthenticateWithCredential(cred);
  }

  function changePassword() {
    if (newPassword === passwordConfirmation) {
      reauthenticate()
        .then(() => {
          let user = firebase.auth().currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              successMessage();
              navigation.navigate('Landing map');
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
