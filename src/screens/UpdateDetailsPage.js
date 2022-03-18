import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import FormField from '../sub-components/FormField';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';
import firebase from '@react-native-firebase/app';
import { GlobalContext } from "../../App";

const UpdateDetailsPage = ({navigation}) => {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [userDoc, setUserDoc] = useState([]);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const context = useContext(GlobalContext);
  const resetFields = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection('Users')
      .doc(context.use)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setUserDoc(doc.data());
          console.log(userDoc);
        } else {
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }, []);

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
    resetFields();
  }

  function reauthenticate() {
    let user = firebase.auth().currentUser;
    let cred = firebase.auth.EmailAuthProvider.credential(email, password);
    return user.reauthenticateWithCredential(cred);
  }

  //Update user details in the database
  function changeUserDetails() {
    const updated = {
      FirstName: first_name,
      LastName: last_name,
    };
    reauthenticate()
      .then(() => {
        firebase
          .firestore()
          .collection('Users')
          .doc(firebase.auth().currentUser.uid)
          .update(updated)
          .then(() => {
            changeDetailsConfirm();
            resetFields();
            navigation.goBack();
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
            placeholder={userDoc.FirstName}
            type={'name'}
          />
          <FormField
            style={[styles.subDetails, styles.spaceLeft]}
            title={'Last Name'}
            setField={setLastName}
            placeholder={userDoc.LastName}
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
