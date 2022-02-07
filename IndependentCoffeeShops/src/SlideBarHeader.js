/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
    StyleSheet,
    View,
    Pressable,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';


const SlideBarHeader = () => {
    return(
        <SafeAreaProvider style={styles.header}>
            <View style={styles.floating_button}>
                <Pressable style={styles.bars_button}>
                    <Icon name='bars' size={30} color={'#046D66'}/>
                </Pressable>
            </View>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        alignItems: 'flex-end',
        padding: '5%',
    },
    floating_button: {
        borderRadius: 100,
        borderColor: '#000000',
        borderStyle: 'solid',
    },
    bars_button: {
        backgroundColor: '#ffffff',
        padding: '4%',
        borderRadius: 11,
    }
});

export default SlideBarHeader;
