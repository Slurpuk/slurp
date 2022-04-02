import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import FormField from '../sub-components/FormField';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';
import {GlobalContext} from '../../App';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';


import firestore from '@react-native-firebase/firestore';
import { Alerts } from "../data/Alerts";

const UpdateDetailsPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [password, setPassword] = useState();

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  function changeDetailsConfirm() {
    Alert.alert('Done.', 'Your details have been updated.', [
      {
        text: 'OK',
        onPress: () => navigation.goBack(),
      },
    ]);
    resetFields();
  }



  /*
Deal with bad or empty inputs before sending request
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

  /*
  Manage response to database failure
   */
  function handleChangeDetailsErrorsBackEnd(errorCode) {
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

  //Update user details in the database
  async function changeUserDetails() {
    if (handleChangeDetailsErrorsFrontEnd()) {
      let updated = {
        FirstName: first_name,
        LastName: last_name,
      };

      await firebase
          .auth()
          .signInWithEmailAndPassword(context.currentUser.Email, password)
          .then(() => {
            firestore()
                .collection('Users')
                .doc(context.currentUser.key)
                .update(updated)
                .then(() => {
                  resetFields();
                  changeDetailsConfirm();
                })
                .catch(error => {
                  handleChangeDetailsErrorsBackEnd(error.code);
                });
          })
          .catch(error => {
            handleChangeDetailsErrorsBackEnd(error.code);
          });
    }

  }

  return (
    <View>
      <GreenHeader headerText={'CHANGE DETAILS'} navigation={navigation} />
      <View style={styles.form}>
        <View style={styles.DetailsContainer}>
          <FormField
            style={[styles.subDetails, styles.spaceRight]}
            title={'First Name'}
            setField={setFirstName}
            value={first_name}
            placeholder={context.currentUser.first_name}
            type={'name'}
          />
          <FormField
            style={[styles.subDetails, styles.spaceLeft]}
            title={'Last Name'}
            setField={setLastName}
            value={last_name}
            placeholder={context.currentUser.last_name}
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
