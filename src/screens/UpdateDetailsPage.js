import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import FormField from '../sub-components/FormField';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';
import {GlobalContext} from '../../App';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
    Alert.alert(
      'Invalid',
      'Something went wrong. Please renter your credentials.',
      [
        {
          text: 'OK',
        },
      ],
    );
  };

  //Update user details in the database
  function changeUserDetails() {
    const updated = {
      FirstName: first_name,
      LastName: last_name,
    };
    auth()
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
            value={first_name}
            placeholder={context.currentUser.FirstName}
            type={'name'}
          />
          <FormField
            style={[styles.subDetails, styles.spaceLeft]}
            title={'Last Name'}
            setField={setLastName}
            value={last_name}
            placeholder={context.currentUser.LastName}
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
