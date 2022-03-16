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

const PayMethPaymentCard = ({card}) => {
    //console.log(card);
    return (
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                    style={[
                        {color: 'black', fontWeight: '600', fontSize: 14},
                    ]}
                >
                    {card.brand}
                </Text>
                <Text>*** **** **** {card.last4}</Text>
            </View>
    );
};

const styles = StyleSheet.create({
    order: {
        marginTop: 15,
        flex: 1,
    },
    linearGradient: {
        padding: 10,
        flex: 1,
        zIndex: 1,
        borderRadius: 10,
    },
});
export default PayMethPaymentCard;
