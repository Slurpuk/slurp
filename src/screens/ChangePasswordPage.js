import React, {useState} from 'react';
import {StyleSheet, View, Text, Alert, Platform} from 'react-native';
import ChangePasswordForm from '../components/UserManagement/ChangePasswordForm';
import {SafeAreaView} from 'react-native-safe-area-context';
import textStyles from '../../stylesheets/textStyles';
import PrimaryButton from '../sub-components/PrimaryButton';
import FormField from '../components/UserManagement/FormField';


const confirmationMessage = () => {Alert.alert('All OK', 'Password changed', [{text: 'OK'},]);};

const passwordChanged = () => {confirmationMessage();};

const ChangePasswordPage = () => {
    //const [stage, setStage] = useState();
    const [password, setPassword] = useState();
    const [password_confirmation, setPasswordConfirmation] = useState();

    return (
        <View style={styles.wrapper}>
            <View style={styles.safeSpace}>
                <View style={styles.body}>
                    <Text style={[textStyles.blueJosefinHeading]}>Change Password</Text>
                    <View style={styles.form}>
                        <FormField style={styles.element} title={'New Password'} placeholder={''} setField={setPassword}
                                   type={'password'}/>
                        <FormField style={styles.element} title={'Password'} placeholder={''} setField={setPassword}
                                   type={'password'}/>
                    </View>
                    <View style={styles.buttons_container}>
                        <View style={styles.button_container}>
                            <PrimaryButton text={'Confirm'} onPress={passwordChanged} />
                        </View>
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
    },
  body: {
    padding: '5%',
    flex: 1,
  },
  form: {
    flex: 3,
      paddingVertical: 5%,
  },
    buttons_container: {
        flex: 1,
        alignContent: 'flex-end',
    },
    button_container: {
        paddingVertical: '3%',
    },
    input: {
        backgroundColor: '#F9F9F9',
        width: '100%',
        height: 37,
        borderRadius: 5,
    },
});

export default ChangePasswordPage;
