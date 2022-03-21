import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import FormField from '../sub-components/FormField';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';
import firebase from '@react-native-firebase/app';
import {GlobalContext} from '../../App';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const UpdateDetailsPage = ({navigation}) => {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [userDoc, setUserDoc] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const context = useContext(GlobalContext);
  const currentUser = context.currentUser;
  const user = context.user;

  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  function changeDetailsConfirm() {
    Alert.alert('Done.', 'Your details have been updated.', [
      {
        text: 'OK',
      },
    ]);
    resetFields();
  }

  function invalidCredentialsMessage() {
    Alert.alert(
      'Cannot Authenticate',
      'Please enter your credentials correctly.',
      [
        {
          text: 'OK',
        },
      ],
    );
  }

  const invalidMessage = error => {
    Alert.alert('Invalid', 'Please enter your blah blah correctly', [
      {
        text: 'OK',
      },
    ]);
  };


  //Update user details in the database
  function changeUserDetails() {
    const updated = {
      FirstName: first_name,
      LastName: last_name,
    };
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('Users')
          .doc(context.userRef)
          .update(updated)
          .then(() => {
            changeDetailsConfirm();
            resetFields();
            navigation.goBack();
          })
          .catch(error => {
            invalidMessage(error);
          });
      })
      .catch(error => {
        invalidCredentialsMessage();
      });
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
            placeholder={currentUser.FirstName}
            type={'name'}
          />
          <FormField
            style={[styles.subDetails, styles.spaceLeft]}
            title={'Last Name'}
            setField={setLastName}
            placeholder={currentUser.LastName}
            type={'name'}
          />
        </View>
        <FormField
          title={'Email'}
          setField={setEmail}
          placeholder={''}
          type={'email'}
        />
        <FormField
          title={'Password'}
          setField={setPassword}
          type={'password'}
          placeholder={''}
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
