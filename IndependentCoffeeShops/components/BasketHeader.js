import React, {useState} from 'react'
import {
    StyleSheet,
    View,
    Pressable,
    Image,
    Text,

} from 'react-native';

const BasketHeader = () => {

    return(
        <View style={styles.header}>
            <Pressable>
                <Image source={require("../static/BackArrow.jpg")} style={styles.back_button}></Image>
            </Pressable>
            <Text>coffeeShopName</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#046D66',
        display: 'flex',
        height: 50,
    },
    back_button: {
        resizeMode: 'contain',
        borderRadius: 100,
        flex: 1,
    }
});


export default BasketHeader;
