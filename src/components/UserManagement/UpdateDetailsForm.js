import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import FormField from './FormField';
import PrimaryButton from '../../SubComponents/PrimaryButton';

const updateDetailsConfirm = () => {
  Alert.alert('Done.', 'Your details have been updated.', [
    {
      text: 'OK',
    },
  ]);
};

//Update user details in the database
const updateUserDetails = () => {
  updateDetailsConfirm();
};

const UpdateDetailsForm = () => {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View>
      <View style={styles.form}>
        <View style={styles.name_container}>
          <FormField
            style={[styles.sub_name_container, styles.sub_name_container_left]}
            title={'First Name'}
            setField={setFirstName}
            placeholder={'Your current forename'}
            type={'name'}
          />
          <FormField
            style={[styles.sub_name_container]}
            title={'Last Name'}
            setField={setLastName}
            placeholder={'Your current surname'}
            type={'name'}
          />
        </View>
        <FormField
          style={styles.element}
          title={'Email'}
          setField={setEmail}
          placeholder={'Your current email'}
          type={'email'}
        />
        <FormField
          style={styles.element}
          title={'Password'}
          setField={setPassword}
          secureTextEntry={true}
          type={'password'}
        />
      </View>
      <View style={styles.button_container}>
        <PrimaryButton text={'Update Details'} onPress={updateDetailsConfirm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    paddingVertical: '5%',
  },

  element: {
    fontSize: 16,
    paddingVertical: '1%',
  },

  buttons_container: {
    flex: 1,
    alignContent: 'flex-end',
  },
  button_container: {
    paddingVertical: '3%',
  },

  name_container: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: '2%',
  },
  sub_name_container: {
    flex: 1,
  },
  sub_name_container_left: {
    marginRight: '5%',
  },
});

export default UpdateDetailsForm;
