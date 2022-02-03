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
  Text,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

const App = () => {
  // const usersCollection = firestore().collection('Users');
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();

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

  // Display a confirmation message to the user
  const registeredMessage = () => {
    Alert.alert('Congratulations', 'Registered Successfully', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <View>
      <View style={styles.form}>
        <View style={styles.name_container}>
          <View style={(styles.element, styles.sub_name_container)}>
            <Text style={styles.text}>First name</Text>
            <TextInput
              style={styles.input}
              placeholder="John"
              onChangeText={text => setFirstName(text)}
            />
          </View>
          <View style={(styles.element, styles.sub_name_container)}>
            <Text style={styles.text}>Last name</Text>
            <TextInput
              style={styles.input}
              placeholder="Smith"
              onChangeText={text => setLastName(text)}
            />
          </View>
        </View>
        <View style={styles.element}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="johnsmith@gmail.com"
            onChangeText={text => setEmail(text)}
          />
        </View>
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
      <View style={styles.buttons_container}>
        <View style={styles.button_container}>
          <Pressable style={[styles.button, styles.preferences_button]}>
            <Text style={[styles.text, styles.button_text]}>
              Set Coffee Preferences
            </Text>
          </Pressable>
        </View>
        <View style={styles.button_container}>
          <Pressable
            style={[styles.button, styles.account_button]}
            onPress={registerUser}
          >
            <Text style={[styles.text, styles.button_text]}>
              Create Account
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Josefin Sans',
    fontWeight: '700',
    color: '#173C4F',
  },

  form: {
    paddingVertical: '5%',
  },
  name_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: '1%',
  },
  sub_name_container: {
    width: '48%',
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

  // will be replaced by Sean's beautiful buttons
  buttons_container: {
    alignContent: 'flex-end',
  },
  button_container: {
    paddingVertical: '2%',
  },
  button: {
    borderRadius: 13,
    height: 41,
  },
  preferences_button: {
    backgroundColor: '#2D466B',
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

export default App;
