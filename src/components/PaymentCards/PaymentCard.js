import React, {useState} from 'react';
import {StyleSheet, View, Pressable, Image, Text, Alert, SafeAreaView} from 'react-native';

const PaymentCard = ({card}) => {

    console.log(card)

    return (
        <View style={styles.rectangle}>
            <View>
                <Image source={'..'}/>
                <Text>Visa Debit</Text>
            </View>
            <Text>{card.number}</Text>
            {card.isDefault ? <Text>Default</Text> : <Text>Secondary</Text>}
            <View>
                <Text>Delete</Text>
            </View>
            <View>
                <Text>Set as Default</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rectangle: {
        backgroundColor: '#F2F2F2',
        display: 'flex'
    }
});

export default PaymentCard;
