import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import FormField from '../sub-components/FormField';
import GreenHeader from '../sub-components/GreenHeader';
import CustomButton from '../sub-components/CustomButton';

const changeDetailsConfirm = () => {
  Alert.alert('Done.', 'Your details have been updated.', [
    {
      text: 'OK',
    },
  ]);
};

//Update user details in the database
const changeUserDetails = () => {
  changeDetailsConfirm();
};

const UpdateDetailsPage = ({navigation}) => {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View>
      <GreenHeader headerText={'CHANGE DETAILS'} navigation={navigation} />
      <View style={styles.form}>
        <View style={styles.DetailsContainer}>
          <FormField
            style={[styles.subDetails, styles.spaceRight]}
            title={'First Name'}
            setField={setFirstName}
            placeholder={'Your current forename'}
            type={'name'}
          />
          <FormField
            style={[styles.subDetails, styles.spaceLeft]}
            title={'Last Name'}
            setField={setLastName}
            placeholder={'Your current surname'}
            type={'name'}
          />
        </View>
        <FormField
          title={'Email'}
          setField={setEmail}
          placeholder={'Your current email'}
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
