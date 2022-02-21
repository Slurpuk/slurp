import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import FormField from './FormField';
import GreenHeader from '../General/GreenHeader';
import CustomButton from '../../sub-components/CustomButton';

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

const ChangeDetailsPage = ({navigation}) => {
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();

  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <GreenHeader headerText={'CHANGE DETAILS'} navigation={navigation} />
        </View>
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
      </View>
      <View style={styles.button_container}>
        <CustomButton
          priority="secondary"
          text={'Update Details'}
          inheritedFunction={changeUserDetails}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
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

export default ChangeDetailsPage;
