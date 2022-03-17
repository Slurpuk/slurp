import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import FormField from '../sub-components/FormField';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';
import firebase from '@react-native-firebase/app';

const UpdateDetailsPage = ({navigation}) => {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [placeholder_first, setPlaceholderFirst] = useState();
  const [placeholder_last, setPlaceholderLast] = useState();
  const [placeholder_email, setPlaceholderEmail] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const currentUser = firebase.auth().currentUser.uid;
  const userDocument = firebase
    .firestore()
    .collection('Users')
    .doc(currentUser);

  useEffect(() => {
    userDocument
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setPlaceholderFirst(doc.data().FirstName);
          setPlaceholderLast(doc.data().LastName);
          setPlaceholderEmail(doc.data().Email);
        } else {
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  });

  function changeDetailsConfirm() {
    Alert.alert('Done.', 'Your details have been updated.', [
      {
        text: 'OK',
      },
    ]);
  }

  function invalidCredentialsMessage() {
    Alert.alert(
      'Cannot Authenticate',
      'Please try entering your password again.',
      [
        {
          text: 'OK',
        },
      ],
    );
  }

  function reauthenticate() {
    let user = firebase.auth().currentUser;
    let cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
  }
  //Update user details in the database
  function changeUserDetails() {
    const updated = {
      FirstName: first_name,
      LastName: last_name,
      Email: email,
    };
    reauthenticate()
      .then(() => {
        firebase
          .firestore()
          .collection('Users')
          .doc(currentUser)
          .update(updated)
          .then(() => {
            changeDetailsConfirm();
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
            placeholder={placeholder_first}
            type={'name'}
          />
          <FormField
            style={[styles.subDetails, styles.spaceLeft]}
            title={'Last Name'}
            setField={setLastName}
            placeholder={placeholder_last}
            type={'name'}
          />
        </View>
        <FormField
          title={'Email'}
          setField={setEmail}
          placeholder={placeholder_email}
          type={'email'}
        />
        <FormField
          title={'Password'}
          setField={setPassword}
          type={'password'}
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

// const styles = StyleSheet.create({
//   wrapper: {
//     paddingVertical: '5%',
//   },
//
//   element: {
//     fontSize: 16,
//     paddingVertical: '1%',
//   },
//
//   buttons_container: {
//     flex: 1,
//     alignContent: 'flex-end',
//   },
//   button_container: {
//     paddingVertical: '3%',
//   },
//
//   name_container: {
//     flexDirection: 'row',
//     display: 'flex',
//     justifyContent: 'space-between',
//     paddingVertical: '2%',
//   },
//   sub_name_container: {
//     flex: 1,
//   },
//   sub_name_container_left: {
//     marginRight: '5%',
//   },
// });

export default UpdateDetailsPage;
