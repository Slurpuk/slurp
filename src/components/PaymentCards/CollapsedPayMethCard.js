import {
    FlatList,
    View,
    StyleSheet,
    Pressable,
    Text,
    ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import textStyles from '../../../stylesheets/textStyles';
import PayMethPaymentCard from "./PayMethPaymentCard";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CollapsedPayMethCard = ({defaultCard}) => {

    return (
    <View style={styles.rectangle}>
        <View
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
            }}
        >
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                    style={[
                        styles.text,
                        {color: 'black', fontWeight: '600', fontSize: 14},
                    ]}
                >
                    {defaultCard.brand}
                </Text>
            </View>
        </View>
        <Text>*** **** **** {defaultCard.last4}</Text>
    </View>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        backgroundColor: '#F2F2F2',
        display: 'flex',
        padding: '3.5%',
        borderRadius: 10,
        marginBottom: '5%',
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
    },
    text: {
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: '400',
    },
});
export default CollapsedPayMethCard;
