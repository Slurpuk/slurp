import React, {useContext, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import FormField from '../sub-components/FormField';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';
import {GlobalContext} from '../../App';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';
import {Alerts} from '../data/Alerts';

const UpdateDetailsPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const [first_name, setFirstName] = useState(context.currentUser.first_name);
  const [last_name, setLastName] = useState(context.currentUser.last_name);
  const [password, setPassword] = useState('');

  /**
   * Alert raised when details are updated. Returns user to where they came from.
   */
  function changeDetailsConfirm() {
    Alert.alert('Done.', 'Your details have been updated.', [
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
  function handleChangeDetailsErrorsFrontEnd() {
    let validity = true;
    if (first_name === '') {
      validity = false;
      Alert.alert('Empty First Name', 'Please enter your first name.');
    } else if (password === '') {
      validity = false;
      Alert.alert('Empty Password', 'Please enter your password.');
    }
    return validity;
  }

  /**
   * Manage response to database failure
   * @param errorCode firebase auth error code
   */
  function handleChangeDetailsErrorsBackEnd(errorCode) {
    if (errorCode === 'auth/wrong-password') {
      Alerts.wrongCredentialsAlert();
    } else if (errorCode === 'auth/network-request-failed') {
      Alerts.connectionErrorAlert();
    } else {
      //Anything else
      Alerts.elseAlert();
    }
  }

  //Update user details in the database
  async function changeUserDetails() {
    if (handleChangeDetailsErrorsFrontEnd()) {
      let currentUser = auth().currentUser;
      await firebase
        .auth()
        .signInWithEmailAndPassword(currentUser.email, password)
        .then(() => {
          firestore()
            .collection('users')
            .doc(context.currentUser.key)
            .update({
              first_name: first_name,
              last_name: last_name,
            })
            .then(() => {
              changeDetailsConfirm();
              setPassword('');
            })
            .catch(error => {
              console.log(context.currentUser);
              Alerts.elseAlert();
            });
        })
        .catch(error => {
          handleChangeDetailsErrorsBackEnd(error.code);
        });
    }
  }

  return (
    <View style={styles.container} testID={'update_details_page'}>
      <GreenHeader headerText={'CHANGE DETAILS'} navigation={navigation} />
      <View style={styles.form}>
        <View style={styles.DetailsContainer}>
          <FormField
            style={[styles.subDetails, styles.spaceRight]}
            title={'First Name'}
            setField={setFirstName}
            value={first_name}
            type={'name'}
          />
          <FormField
            style={[styles.subDetails, styles.spaceLeft]}
            title={'Last Name'}
            setField={setLastName}
            value={last_name}
            type={'name'}
          />
        </View>
        <FormField
          title={'Password'}
          setField={setPassword}
          type={'password'}
          placeholder={''}
          value={password}
        />
      </View>
      <View style={styles.button}>
        <CustomButton
          text={'Update Details'}
          priority={'secondary'}
          onPress={changeUserDetails}
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
  DetailsContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: '2%',
  },
  subDetails: {
    flex: 1,
  },
  spaceLeft: {
    marginLeft: '2%',
  },
  spaceRight: {
    marginRight: '2%',
  },
});

export default UpdateDetailsPage;
