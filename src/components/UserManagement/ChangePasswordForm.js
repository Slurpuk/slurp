import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import CustomButton from '../../sub-components/CustomButton';

const ChangePasswordForm = () => {
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();

  const setNewPassword = () => {
    confirmationMessage();
  };

  const confirmationMessage = () => {
    Alert.alert('Congratulations', 'Password Changed Successfully', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <View>
      <View style={styles.form}>
        <View style={styles.element}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.element}>
          <Text style={styles.text}>Password confirmation</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={text => setPasswordConfirmation(text)}
          />
        </View>
      </View>

      <View style={styles.button_container}>
        {/*<Pressable*/}
        {/*  style={[styles.button, styles.account_button]}*/}
        {/*  onPress={setNewPassword}>*/}
        {/*  <Text style={[styles.text, styles.button_text]}>*/}
        {/*    Confirm new password*/}
        {/*  </Text>*/}
        {/*</Pressable>*/}

        <CustomButton
          priority={'secondary'}
          text={'Confirm new password'}
          inheritedFunction={setNewPassword}
        />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Josefin-Sans',
    fontWeight: '700',
    color: '#173C4F',
  },

  form: {
    paddingVertical: '5%',
  },

  element: {
    fontSize: 16,
    paddingVertical: '1%',
  },

  input: {
    backgroundColor: '#F9F9F9',
    width: '100%',
    height: 37,
    borderRadius: 5,
  },

  button_container: {
    paddingVertical: '2%',
  },
  button: {
    borderRadius: 13,
    height: 41,
  },
  account_button: {
    backgroundColor: '#087562',
  },
  button_text: {
    color: '#EFEFEF',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
  },
  // -------------------------------------------
});

export default ChangePasswordForm;
