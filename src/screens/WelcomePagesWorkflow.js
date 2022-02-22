import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import WelcomePages from './WelcomePages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpPage from "./SignUpPage";

export default function App() {
    const [isFirstTime, setIsFirstTime] = useState(true);

    const checkForFirstTime = async () => {
        const result = await AsyncStorage.getItem('isFirstTime');
        //if what we get from the Async is null we are opening the app for the first time
        //if we pressed the sign up button on the last slide we set the 'isFirstTime' to 'no'
        if (result === null) setIsFirstTime(true); //now we can use the isFirstTimeLoad state to choose what to render
    };

    useEffect(() => {
        checkForFirstTime();
    }, []);

    const handleDone = () => {
        setIsFirstTime(false);
        AsyncStorage.setItem('isFirstTime', 'no');
    };

    if (isFirstTime)
        return (
            <>
                <WelcomePages onDone={handleDone}  />
            </>
        );
    else{
        return (
            <>
                <SignUpPage/>
            </>
        );
    }
};
