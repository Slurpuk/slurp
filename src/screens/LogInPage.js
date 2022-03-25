import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, Alert, StatusBar} from 'react-native';
import firebase from '@react-native-firebase/app';
import {GlobalContext} from '../../App';
import FormField from '../sub-components/FormField';
import CustomButton from '../sub-components/CustomButton';
import WhiteArrowButton from '../sub-components/WhiteArrowButton';
import {getCushyPaddingTop} from '../../stylesheets/StyleFunction';
import textStyles from '../../stylesheets/textStyles';
import {Alerts} from '../data/Alerts';

const LogInPage = ({navigation}) => {
  const context = useContext(GlobalContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const switchToSignUp = () => {
    navigation.navigate('SignUp');
  };

  async function forgotPassword() {
    await firebase
      .auth()
      .currentUser.sendSignInLinkToEmail(email, {
        handleCodeInApp: true,
        url: 'app/email-verification',
        iOS: {
          bundleId: 'org.reactjs.native.example.Slurp',
        },
        android: {
          installApp: true,
          packageName: 'com.myproject',
        },
      })
      .catch(e => console.log(e));
  }

  function handleLogInErrorsFrontEnd() {
    let validity = true;
    const emailRegex = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
    );
    if (email === '') {
      Alert.alert('Empty Email', 'Please enter your email.');
      validity = false;
    } else if (!emailRegex.test(email)) {
      Alerts.badEmailAlert();
      validity = false;
    } else if (password === '') {
      Alert.alert('Empty Password', 'Please enter your password.');
      validity = false;
    }
    return validity;
  }

  function handleLogInErrorsBackEnd(error) {
    let errorCode = error.code;
    if (
      errorCode === 'auth/wrong-password' ||
      errorCode === 'auth/user-not-found'
    ) {
      Alerts.wrongCredentialsAlert();
    } else if (errorCode === 'auth/invalid-email') {
      Alerts.badEmailAlert();
    } else if (errorCode === 'auth/network-request-failed') {
      Alerts.connectionErrorAlert();
    } else {
      //Anything else
      Alerts.elseAlert();
    }
  }

  const authenticateUser = async () => {
    if (handleLogInErrorsFrontEnd()) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => handleLogInErrorsBackEnd(error));
    }
  };

  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {context.isFirstTime ? (
          <WhiteArrowButton
            navigation={navigation}
            direction={'left'}
            onPressAction={() => navigation.navigate('Welcome')}
            customStyle={{marginRight: '26%'}}
          />
        ) : null}
        <Text style={[textStyles.blueJosefinHeading]}>Log In</Text>
      </View>
      <View style={styles.form}>
        <FormField
          title={'Email'}
          setField={setEmail}
          type={'email'}
          value={email}
        />
        <FormField
          title={'Password'}
          placeholder={''}
          setField={setPassword}
          type={'password'}
          value={password}
        />
        <Text
          style={[textStyles.bluePoppinsBody, styles.hyperlink]}
          onPress={forgotPassword}>
          Forgot your password?
        </Text>
        <Text
          style={[textStyles.bluePoppinsBody, styles.hyperlink]}
          onPress={switchToSignUp}>
          New? Create an account
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          text={'Log in'}
          onPress={authenticateUser}
          priority={'primary'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#EDEBE7',
    paddingTop: getCushyPaddingTop(),
    paddingBottom: '5%',
    paddingHorizontal: '5%',
  },
  form: {
    flex: 3,
    paddingVertical: '5%',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: '4%',
  },
  hyperlink: {
    marginVertical: '2%',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
  },
});

export default LogInPage;
