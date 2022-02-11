/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import textStyles from '../../stylesheets/textStyles';
import PrimaryButton from '../SubComponents/PrimaryButton';
import FormField from '../components/UserManagement/FormField';

// Redirect the user to the Log In Portal
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

// Display a confirmation message to the user
const registeredMessage = () => {
  Alert.alert('Congratulations', 'Registered Successfully', [
    {
      text: 'OK',
    },
  ]);
};

// Register the user to the database after checking their credentials
const registerUser = () => {
  //     auth().createUserWithEmailAndPassword(email,password)
  //         .then((re)=>{
  //             console.log(re);
  //             console.log(x);
  //         })
  //         .catch((re)=>{
  //             console.log(re);
  //         })
  registeredMessage();
};

const SignUpPage = () => {
  // const usersCollection = firestore().collection('Users');
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();

  return (
    <>
      <SafeAreaView style={styles.body}>
        <View style={styles.body}>
          <Text style={[textStyles.headingOne, styles.section]}>Sign Up</Text>

          <View style={styles.form}>
            <View style={styles.name_container}>
              <FormField
                style={styles.sub_name_container}
                title={'First Name'}
                placeholder={'Joe'}
                setField={setFirstName}
                isPassword={false}
              />
              <FormField
                style={styles.sub_name_container}
                title={'Last Name'}
                placeholder={'Doe'}
                setField={setLastName}
                isPassword={false}
              />
            </View>
            <FormField
              style={styles.element}
              title={'Email'}
              placeholder={'johnsmith@gmail.com'}
              setField={setEmail}
              isPassword={false}
            />
            <FormField
              style={styles.element}
              title={'Password'}
              placeholder={''}
              setField={setPassword}
              isPassword={true}
            />
            <FormField
              style={styles.element}
              title={'Confirm Password'}
              placeholder={''}
              setField={setPasswordConfirmation}
              isPassword={true}
            />
          </View>

          <View style={styles.buttons_container}>
            <View style={styles.button_container}>
              <PrimaryButton text={'Set Coffee Preferences'} onPress={null} />
            </View>
            <View style={styles.button_container}>
              <PrimaryButton text={'Create Account'} onPress={registerUser} />
            </View>

            <Text style={(styles.text, styles.footer)} onPress={switchToLogIn}>
              Already have an account? Log in here
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safe_header: {
    flex: 0,
    backgroundColor: '#EDEBE7',
  },
  body: {
    backgroundColor: '#EDEBE7',
    flex: 1,
    padding: '5%',
  },
  title: {
    fontSize: 35,
    lineHeight: 35,
    flex: 0.2,
    textAlignVertical: 'center',
  },
  text: {
    fontFamily: 'Josefin Sans',
    fontWeight: '700',
    color: '#173C4F',
  },
  form: {
    flex: 3,
    paddingVertical: '5%',
  },
  footer: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    flex: 0.2,
    textAlignVertical: 'bottom',
  },

  buttons_container: {
    alignContent: 'flex-end',
  },
  button_container: {
    paddingVertical: '2%',
  },

  name_container: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: '1%',
  },
  sub_name_container: {
    flex: 1,
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
});

export default SignUpPage;
