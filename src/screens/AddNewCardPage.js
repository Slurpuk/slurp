/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import GreenHeader from '../components/GreenHeader';
import {StyleSheet, View, Text, Alert, StatusBar, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {SafeAreaView} from 'react-native-safe-area-context';
import textStyles from '../../stylesheets/textStyles';
import PrimaryButton from '../SubComponents/PrimaryButton';
import FormField from '../components/UserManagement/FormField';



const AddNewCardPage = () => {
    // const usersCollection = firestore().collection('Users');
    const [expiryDate, setExpiryDate] = useState();
    const [CVC, setCVC] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [password, setPassword] = useState();

    return (
        <View style={styles.wrapper}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <View style={styles.safeSpace}>
                <View style={styles.header}>
                    <GreenHeader headerText={'Add New Card'} />
                </View>
                <View style={styles.body}>
                    <Text style={[textStyles.blueJosefinHeading]}>Card Stuff</Text>

                    <View style={styles.form}>
                        <FormField
                            style={styles.element}
                            title={'Card Number'}
                            placeholder={'xxxxxxxxxxxxxxxx'}
                            setField={setCardNumber}
                        />
                        <View style={styles.name_container}>
                            <FormField
                                style={[
                                    styles.sub_name_container,
                                    styles.sub_name_container_left,
                                ]}
                                title={'Expiry Date'}
                                placeholder={'xx/xx'}
                                setField={setExpiryDate}
                                //type={'name'}
                            />
                            <FormField
                                style={[styles.sub_name_container]}
                                title={'CVC'}
                                placeholder={'xxx'}
                                setField={setCVC}
                                //type={'name'}
                            />
                        </View>
                        <FormField
                            style={styles.element}
                            title={'Password'}
                            setField={setPassword}
                            type={'password'}
                        />
                    </View>

                    <View style={styles.buttons_container}>
                        <View style={styles.button_container}>
                            <PrimaryButton text={'Add New Payment Card'} onPress={null} />
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
    footer: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        textAlignVertical: 'bottom',
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
    input: {
        backgroundColor: '#F9F9F9',
        width: '100%',
        height: 37,
        borderRadius: 5,
    },
});

export default AddNewCardPage;
