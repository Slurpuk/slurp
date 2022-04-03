import React, {useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import GreenHeader from '../sub-components/GreenHeader';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';
import auth from '@react-native-firebase/auth';
import {Alerts} from '../data/Alerts';
import firebase from '@react-native-firebase/app';

function ChangePasswordPage({navigation}) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

  const resetFields = () => {
    setOldPassword('');
    setNewPassword('');
    setPasswordConfirmation('');
  };

  function successMessage() {
    Alert.alert('Password Updated!', '', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
  }

  /**
   * Deal with bad or empty inputs before sending request
   * @returns {boolean} if a user can pass to performing the operation or not
   */
  function handleChangePasswordErrorsFrontEnd() {
    let validity = true;
    if (oldPassword === '') {
      validity = false;
      Alert.alert('Empty Password', 'Please enter your current password.');
    } else if (newPassword === '') {
      validity = false;
      Alert.alert('Empty Password', 'Please enter your new confirmation.');
    } else if (passwordConfirmation === '') {
      validity = false;
      Alert.alert(
        'Empty Password Confirmation',
        'Please enter your password confirmation.',
      );
    } else if (passwordConfirmation !== newPassword) {
      validity = false;
      Alert.alert('Password Mismatch', 'Please try again.');
    } else if (!passwordRegex.test(newPassword)) {
      validity = false;
      Alert.alert(
        'Weak password',
        'Must have a number, a special character and at 6 to 20 characters.',
      );
    }
    return validity;
  }

  /**
   * Manage response to database failure
   * @param errorCode firebase auth error code
   */
  function handleChangePasswordErrorsBackEnd(errorCode) {
    if (errorCode === 'auth/wrong-password') {
      Alerts.wrongCredentialsAlert();
    } else if (errorCode === 'auth/network-request-failed') {
      Alerts.connectionErrorAlert();
    } else if (errorCode === 'auth/too-many-requests') {
      Alerts.tooManyRequestsAlert();
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
            .catch(() => {
              Alerts.elseAlert();
            });
        })
        .catch(error => {
          handleChangePasswordErrorsBackEnd(error.code);
        });
    }
  }
  return (
    <View style={styles.container} testID={'change_password_page'}>
      <GreenHeader headerText={'CHANGE PASSWORD'} navigation={navigation} />
      <View style={styles.form}>
        <FormField
          title={'Old Password'}
          setField={setOldPassword}
          value={oldPassword}
          type={'password'}
          testID={'change_password_page_old_password'}
        />
        <FormField
          title={'New Password'}
          setField={setNewPassword}
          value={newPassword}
          type={'password'}
          testID={'change_password_page_new_password'}
        />
        <FormField
          title={'Confirm Password'}
          setField={setPasswordConfirmation}
          value={passwordConfirmation}
          type={'password'}
          testID={'change_password_page_new_password_confirmation'}
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
}

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
