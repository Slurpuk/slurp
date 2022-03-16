import {
    FlatList,
    View,
    StyleSheet,
    Pressable,
    Text,
    ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {PaymentIcon} from 'react-native-payment-icons';
import textStyles from '../../../stylesheets/textStyles';

const PayMethPaymentCard = ({card}) => {
    let formattedCardBrand=card.brand.toLowerCase();
    switch (formattedCardBrand) {
        case 'american express':
            formattedCardBrand = 'american-express';
            break;
        case 'diners club':
            formattedCardBrand = 'diners-club';
            break;
    }

    return (
            <View style={{display: 'flex', flexDirection: 'row', alignItems:'center'}}>
                <PaymentIcon style={{marginEnd:10}} type={formattedCardBrand}/>
                <Text style={[textStyles.greyPoppins, {marginEnd:10}]}>*** **** **** {card.last4}</Text>
                {card.isDefault ? (
                    <Text style={[textStyles.smallLightGreyPoppins, {marginLeft:40}]} >Default</Text>
                ) : (
                    <Text style={[textStyles.smallLightGreyPoppins, {marginLeft:40}]}>Secondary</Text>
                )}
            </View>
    );
};

const styles = StyleSheet.create({

});
export default PayMethPaymentCard;
