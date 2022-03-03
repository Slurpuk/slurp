/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import textStyles from '../../stylesheets/textStyles';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';

// Redirect the user to the Log In Portal

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const SignUpPage = () => {
  // const usersCollection = firestore().collection('Users');
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  const resetFLEFields = () => {
    setPassword('');
    setPasswordConfirmation('');
  };

  const switchToLogIn = () => {
    Alert.alert(
        'FUTURE NAVIGATION FEATURE',
        'One day, clicking this will take you to the log in portal',
        [
          {
            text: ':)',
          },
        ],
    );
  };

  const warningPassword = () => {
    Alert.alert('Warning!', 'Password should be same as password confirmation!', [
      {
        text: 'OK',
      },
    ]);
  }

  const warningUserAlreadyExists = () => {
    Alert.alert('Warning!', 'This email already exists', [
      {
        text: 'OK',
      },
    ]);
  }


// Display a confirmation message to the user
  const registeredMessage = () => {
    Alert.alert('Congratulations', 'Registered Successfully', [
      {
        text: 'OK',
      },
    ]);
    resetFields();
  };



// Register the user to the database after checking their credentials
  const registerUser = () => {
    if(password == password_confirmation) {
      auth().createUserWithEmailAndPassword(email, password)
          .then((re) => {
            console.log(re);
            console.log(x);
          })
          .catch((re) => {
            console.log(re);
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              warningUserAlreadyExists()
            }})
      registeredMessage(); }

    else{
      warningPassword();
      resetFLEFields();
    }
  };


  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.container}>
        <Text style={[textStyles.blueJosefinHeading]}>Sign Up</Text>
        <View style={styles.formContainer}>
          <View style={styles.namesContainer}>
            <FormField
              style={[
                styles.sub_name_container,
                styles.sub_name_container_left,
              ]}
              title={'First Name'}
              placeholder={'John'}
              setField={setFirstName}
              type={'name'}
            />
            <FormField
              style={[styles.sub_name_container]}
              title={'Last Name'}
              placeholder={'Doe'}
              setField={setLastName}
              type={'name'}
            />
          </View>
          <FormField
            style={styles.element}
            title={'Email'}
            placeholder={'johndoe@gmail.com'}
            setField={setEmail}
            type={'email'}
          />
          <FormField
            style={styles.element}
            title={'Password'}
            setField={setPassword}
            type={'password'}
          />
          <FormField
            style={styles.element}
            title={'Confirm Password'}
            setField={setPasswordConfirmation}
            type={'password'}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <CustomButton
            text={'Set Coffee Preferences'}
            onPress={null}
            priority={'primary'}
            style={styles.button}
          />
          <CustomButton
            text={'Create Account'}
            onPress={registerUser}
            priority={'primary'}
            style={styles.button}
          />
          <Text
            style={[textStyles.bluePoppinsBody, styles.hyperlink]}
            onPress={switchToLogIn}>
            Already have an account? Log in here
          </Text>
        </View>
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
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  formContainer: {
    flex: 1,
    marginTop: 8,
  },

  namesContainer: {
    flexDirection: 'row',
    display: 'flex',
    paddingVertical: '2%',
  },
  sub_name_container: {
    flex: 1,
  },
  sub_name_container_left: {
    marginRight: '5%',
  },

  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    marginVertical: '2%',
  },
  hyperlink: {
    marginVertical: '2%',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },
});

export default SignUpPage;

