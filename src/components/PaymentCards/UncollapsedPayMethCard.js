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
import PaymentCard from "./PaymentCard";
import PayMethPaymentCard from "./PayMethPaymentCard";

const UncollapsedPayMethCard = ({cards}) => {

    return (
        <View >
            <FlatList
                data={cards}
                renderItem={({item}) => <PayMethPaymentCard card={item} />}/>
        </View>
    );
};

const styles = StyleSheet.create({
});
export default UncollapsedPayMethCard;
