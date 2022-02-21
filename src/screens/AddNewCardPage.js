import React, {useState} from 'react';
import GreenHeader from '../sub-components/GreenHeader';
import {StyleSheet, View, Text, Alert, StatusBar, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import CustomButton from '../sub-components/CustomButton';
import FormField from '../sub-components/FormField';

const AddNewCardPage = () => {
  const [expiryDate, setExpiryDate] = useState();
  const [CVC, setCVC] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [password, setPassword] = useState();

  const handleMMYY = text => {
    let textTemp = text;
    if (textTemp.slice(-1) === '/') {
      textTemp = textTemp.slice(0, -2);
    }
    if (textTemp.length === 2) {
      textTemp += '/';
    }

    setExpiryDate(textTemp);
  };

  return (
    <View style={styles.container}>
      <GreenHeader headerText={'ADD NEW CARD'} />
      <View style={styles.form}>
        <FormField
          title={'Card Number'}
          placeholder={'xxxxxxxxxxxxxxxx'}
          type={'cardNumber'}
          setField={setCardNumber}
        />
        <View style={styles.DetailsContainer}>
          <FormField
            style={[styles.subDetails, styles.spaceRight]}
            title={'Expiry Date'}
            placeholder={'MM/YY'}
            type={'expiryDate'}
            setField={handleMMYY}
          />
          <FormField
            style={[styles.subDetails, styles.spaceLeft]}
            title={'CVC'}
            placeholder={'xxx'}
            setField={setCVC}
            type={'CVC'}
          />
        </View>
        <FormField
          title={'Password'}
          setField={setPassword}
          type={'password'}
        />
      </View>

      <View style={styles.button}>
        <CustomButton
          text={'Add New Payment Card'}
          priority="secondary"
          onPress={null}
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

export default AddNewCardPage;
