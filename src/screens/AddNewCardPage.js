import React, {useState} from 'react';
import GreenHeader from '../components/GreenHeader';
import {StyleSheet, View, Text, Alert, StatusBar, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import CustomButton from '../SubComponents/CustomButton';
import FormField from '../components/UserManagement/FormField';

const AddNewCardPage = () => {
  const [expiryDate, setExpiryDate] = useState();
  const [CVC, setCVC] = useState();
  const [cardNumber, setCardNumber] = useState();
  const [password, setPassword] = useState();

  const handleMMYY = text => {
    let textTemp = text;
    if (textTemp.slice(-1) == '/') {
      textTemp = textTemp.slice(0, -2);
    }
    if (textTemp.length === 2) {
      textTemp += '/';
    }

    setExpiryDate(textTemp);
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.safeSpace}>
        <View style={styles.header}>
          <GreenHeader headerText={'Add New Card'} />
        </View>
        <View style={styles.body}>
          <View style={styles.form}>
            <FormField
              style={styles.element}
              title={'Card Number'}
              placeholder={'xxxxxxxxxxxxxxxx'}
              type={'cardNumber'}
              value={cardNumber}
              setField={setCardNumber}
            />
            <View style={styles.name_container}>
              <FormField
                style={[
                  styles.sub_name_container,
                  styles.sub_name_container_left,
                ]}
                title={'Expiry Date'}
                placeholder={'MM/YY'}
                type={'expiryDate'}
                value={expiryDate}
                setField={handleMMYY}
              />
              <FormField
                style={[styles.sub_name_container]}
                title={'CVC'}
                placeholder={'xxx'}
                setField={setCVC}
                value={CVC}
                type={'CVC'}
              />
            </View>
            <FormField
              style={styles.password_container}
              title={'Password'}
              setField={setPassword}
              type={'password'}
              value={password}
            />
          </View>

          <View style={styles.button_container}>
            <CustomButton
              text={'Add New Payment Card'}
              priority="secondary"
              onPress={null}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  safeSpace: {
    flex: 1,
    backgroundColor: '#EDEBE7',
    paddingTop:
      Platform.OS === 'android'
        ? getStatusBarHeight() / 3
        : getStatusBarHeight(),
  },
  body: {
    flex: 1,
    padding: '5%',
  },
  form: {
    flex: 3,
    paddingVertical: '5%',
  },
  button_container: {
    flex: 5,
    paddingVertical: '3%',
    alignItems: 'center',
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
  password_container: {
    flex: 1,
  },
  sub_name_container_left: {
    marginRight: '5%',
  },
});

export default AddNewCardPage;
