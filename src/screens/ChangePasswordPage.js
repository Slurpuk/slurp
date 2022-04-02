import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import GreenHeader from '../sub-components/GreenHeader';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';
import auth from '@react-native-firebase/auth';
import { Alerts } from "../data/Alerts";
import firebase from '@react-native-firebase/app';



function ChangePasswordPage({navigation}){
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

  const resetFields = () => {
    setOldPassword('');
    setNewPassword('');
    setPasswordConfirmation('');
  };

  function successMessage() {
    Alert.alert('Success!', 'Password Updated', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  }


  /*
Deal with bad or empty inputs before sending request
*/
  function handleChangePasswordErrorsFrontEnd() {
    let validity = true;
    if (passwordConfirmation !== newPassword) {
      validity = false;
      Alert.alert('Password Mismatch', 'Please try again.');
    } else if (oldPassword === '') {
      validity = false;
      Alert.alert('Empty Password', 'Please enter your current password.');
    } else if (newPassword === '') {
      validity = false;
      Alert.alert('Empty Password Confirmation', 'Please enter your password confirmation.');
    }
    else if (!passwordRegex.test(newPassword)) {
      validity = false;
      Alert.alert(
          'Weak password',
          'Must have a number, a special character and at 6 to 20 characters.',
      );
    }
    return validity;
  }

  /*
  Manage response to database failure
   */
  function handleChangePasswordErrorsBackEnd(errorCode) {
    if (
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/user-not-found'
    ) {
      Alerts.wrongCredentialsAlert();
    } else if (errorCode === 'auth/network-request-failed') {
      Alerts.connectionErrorAlert();
    } else {
      //Anything else
      Alerts.elseAlert();
    }
  }

  async function changePassword() {
    if (handleChangePasswordErrorsFrontEnd()) {
      let currentUser = auth().currentUser;
      await firebase
          .auth()
        .signInWithEmailAndPassword(currentUser.email, oldPassword)
        .then(() => {
          currentUser
            .updatePassword(newPassword)
            .then(() => {
              resetFields();
              successMessage();
            })
            .catch(error => {
              handleChangePasswordErrorsBackEnd(error.code);
            });
        })
        .catch(error => {
          handleChangePasswordErrorsBackEnd(error.code);
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
          value={oldPassword}
          type={'password'}
        />
        <FormField
          title={'New Password'}
          setField={setNewPassword}
          value={newPassword}
          type={'password'}
        />
        <FormField
          title={'Confirm Password'}
          setField={setPasswordConfirmation}
          value={passwordConfirmation}
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
