import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import GreenHeader from '../sub-components/GreenHeader';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';

const ChangePasswordPage = ({navigation}) => {
  const [newPassword, setNewPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
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
        <CustomButton text={'Update Password'} priority={'secondary'} />
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
