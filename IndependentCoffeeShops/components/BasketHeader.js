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
            <Text style={styles.shop_name}>ETEN & DRIKEN</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: '#046D66',
        display: 'flex',
        paddingVertical: '12%',
        paddingHorizontal: '5%',
        alignItems: 'flex-start',
    },
    back_button: {
        resizeMode: 'contain',
        borderRadius: 100,
        flex: 1,
        height: 'auto',
        width: 50,
        alignSelf: 'flex-start',
    },
    shop_name: {
        flex: 1,
        color: '#EDEBE7',
        fontFamily: 'Josephin Sans',
        fontWeight: '700',
        fontStyle: 'normal',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 26,
    }
});


export default BasketHeader;
