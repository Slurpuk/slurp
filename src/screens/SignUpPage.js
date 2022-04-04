import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import textStyles from '../../stylesheets/textStyles';
import FormField from '../sub-components/FormField';
import {getCushyPaddingTop} from '../../stylesheets/StyleFunction';
import CustomButton from '../sub-components/CustomButton';

import {Alerts} from '../data/Alerts';
import {enterApp} from '../helpers/storageHelpers';
import {createUserAuth, createUserModel} from '../firebase/queries';

const SignUpPage = ({navigation, setLoading}) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const emailRegex = new RegExp(
    '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  );
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$/;

  /**
   * Deal with bad or empty inputs before sending request
   * @returns {boolean} true if it passes basic form validation
   */
  function handleSignUpErrorsFrontEnd() {
    let validity = true;
    if (first_name === '') {
      validity = false;
      Alert.alert('Empty Name', 'Please enter a first name.');
    } else if (last_name == '') {
      validity = false;
      Alert.alert('Empty Name', 'Please enter your surname.');
    } else if (email === '') {
      validity = false;
      Alert.alert('Empty Email', 'Please enter your email.');
    } else if (!emailRegex.test(email)) {
      validity = false;
      Alerts.badEmailAlert();
    } else if (password === '') {
      validity = false;
      Alert.alert('Empty Password', 'Please enter your password.');
    } else if (password_confirmation === '') {
      validity = false;
      Alert.alert('Empty Password', 'Please enter confirm you password.');
    } else if (password_confirmation !== password) {
      validity = false;
      Alert.alert(
        'Passwords do not match',
        "Make sure you've entered your password correctly.",
      );
    } else if (!passwordRegex.test(password)) {
      validity = false;
      Alert.alert(
        'Weak password',
        'Must have a number, a special character and at 6 to 20 characters.',
      );
    }
    return validity;
  }

  /**
   *  Create a new user for authentication and firestore model.
   */
  async function registerUser() {
    if (handleSignUpErrorsFrontEnd()) {
      setLoading(prevState => ({...prevState, user: true}));
      await createUserAuth(email, password);
      await createUserModel(email, first_name, last_name);
      setLoading(prevState => ({...prevState, user: false}));
      await enterApp();
    }
  }

  return (
    <View style={styles.wrapper} testID={'sign_up_page'}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <Text style={[textStyles.blueJosefinHeading]}>Sign Up</Text>
      <View style={styles.formContainer}>
        <View style={styles.namesContainer}>
          <FormField
            style={[styles.subNameContainer, styles.subNameContainerLeft]}
            title={'First Name'}
            placeholder={'Jane'}
            setField={setFirstName}
            type={'name'}
            value={first_name}
            testID={'sign_up_page_first_name'}
          />
          <FormField
            style={[styles.subNameContainer]}
            title={'Last Name'}
            placeholder={'Doe'}
            setField={setLastName}
            type={'name'}
            value={last_name}
            testID={'sign_up_page_last_name'}
          />
        </View>
        <FormField
          style={styles.element}
          title={'Email'}
          placeholder={'janedoe@gmail.com'}
          setField={setEmail}
          type={'email'}
          value={email}
          testID={'sign_up_page_email'}
        />
        <FormField
          style={styles.element}
          title={'Password'}
          placeholder={''}
          setField={setPassword}
          type={'password'}
          value={password}
          testID={'sign_up_page_password'}
        />
        <FormField
          style={styles.element}
          title={'Confirm Password'}
          placeholder={''}
          setField={setPasswordConfirmation}
          type={'password'}
          value={password_confirmation}
          testID={'sign_up_page_confirm_password'}
        />
        <Text
          style={[textStyles.bluePoppinsBody, styles.hyperlink]}
          onPress={() => navigation.navigate('LogIn')}
        >
          Already have an account? Log in
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          text={'Create Account'}
          onPress={registerUser}
          priority={'primary'}
          style={styles.button}
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
  formContainer: {
    flex: 1,
    paddingTop: '5%',
  },

  namesContainer: {
    flexDirection: 'row',
    display: 'flex',
    paddingVertical: '2%',
  },
  subNameContainer: {
    flex: 1,
  },
  subNameContainerLeft: {
    marginRight: '5%',
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: '4%',
  },
  hyperlink: {
    marginVertical: '2%',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },
});

export default SignUpPage;
