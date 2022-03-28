import {
    View,
    StyleSheet,
    Text,
} from 'react-native';
import React from 'react';
import {PaymentIcon} from 'react-native-payment-icons';
import textStyles from '../../../stylesheets/textStyles';

const PaymentMethodPaymentCard = ({card=null, isFirst}) => {
    let formattedCardBrand='';
    if(card!==null){
        formattedCardBrand=card.brand.toLowerCase();
        switch (formattedCardBrand) {
            case 'american express':
                formattedCardBrand = 'american-express';
                break;
            case 'diners club':
                formattedCardBrand = 'diners-club';
                break;
        }
    }

    return (
        <View >
            {card!==null ? (
                <View style={{display: 'flex',flexDirection: 'row', alignItems:'center',top:'2%',marginBottom:9,
                }}>
                    <PaymentIcon style={{marginEnd:'5%',left: '4%'}} type={formattedCardBrand}/>
                    <Text style={[textStyles.greyPoppins, {marginEnd:'2%'}]}>*** **** **** {card.last4}</Text>
                    {card.isDefault ? (
                        <Text style={[textStyles.lightGreyPoppins, {marginLeft:'8%'}]} >Default</Text>
                    ) : (
                        <Text style={[textStyles.lightGreyPoppins, {marginLeft:'7%'}]}>Secondary</Text>
                    )}
                </View>
            ) : (
                <View style={{display: 'flex',flexDirection: 'row',top:'2%', alignItems:'center',marginBottom:9,
                }}>
                    <PaymentIcon style={{marginEnd:'5%',left: '4%'}} type={"generic"}/>
                    <Text style={[textStyles.lightGreyPoppins, {fontStyle: 'italic'}]} >Please add a card below</Text>
                </View>
            )}
            {isFirst ? (
                <View style={[styles.line,{maxWidth:'100%', marginBottom: '3%', marginTop:'2%'}]}/>
            ) : (
                <View style={[styles.line,{maxWidth:'85%', marginBottom: '5%'}]}/>
            )}

        </View>


    );
};

const styles = StyleSheet.create({
    line:{
        display: 'flex', borderColor: '#C0C0C0',
        borderStyle: 'solid',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderWidth: 0.7,
    }
});
export default PaymentMethodPaymentCard;
