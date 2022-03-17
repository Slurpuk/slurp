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
        <View style={{backgroundColor:'red'}}>
            <PayMethPaymentCard card={defaultCard} isFirst={true} />
        </View>
    );
};

const styles = StyleSheet.create({

});
export default CollapsedPayMethCard;
