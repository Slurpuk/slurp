import {StyleSheet, Text, View} from "react-native";
import textStyles from "../../../stylesheets/textStyles";
import React from "react";

/**
 * Component allowing for a visual queue for the order price
 * when the order details are displayed
 */
const EmptyItemLine = () => {
    return (
        <View style={styles.bottomLeftTag}>
            <Text style={textStyles.bluePoppinsSubHeading}>Total</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomLeftTag: {
        marginTop: 8,
        marginBottom: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default EmptyItemLine;
