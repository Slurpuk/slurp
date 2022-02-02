import React, {useState} from 'react'
import {
    StyleSheet,
    View,
    Text, Image,
} from 'react-native';

const BasketContents = () => {

    return(
        <View style={styles.basket_content}>
            <Text style={styles.my_order}>My Order</Text>
            <View style={styles.items_list}>

                <View style={styles.item_container}>

                    <View style={styles.item_information}>
                        <Text style={styles.item_name}>Latte</Text>
                        <View style={styles.item_specification_list}>
                            <Text style={styles.item_specification}>Oat Milk</Text>
                        </View>
                    </View>

                    <View style={styles.amount_selection_container}>
                        <Text style={styles.amount}>2</Text>
                        <Image source={require('../static/downArrow.png')} style={styles.change_amount_button}/>
                    </View>

                    <Text style={styles.price}>£6.40</Text>

                </View>

                <View style={styles.item_container}>

                    <View style={styles.item_information}>
                        <Text style={styles.item_name}>Cappuccino</Text>
                        <View style={styles.item_specification_list}>
                            <Text style={styles.item_specification}>Dairy Milk</Text>
                            <Text style={styles.item_specification}>Caramel Syrup</Text>
                        </View>
                    </View>

                    <View style={styles.amount_selection_container}>
                        <Text style={styles.amount}>1</Text>
                        <Image source={require('../static/downArrow.png')} style={styles.change_amount_button}/>
                    </View>

                    <Text style={styles.price}>£3.40</Text>

                </View>

            </View>
            <View style={styles.order_summary}>
                <Text style={styles.total_text}>TOTAL</Text>
                <Text style={styles.total_amount}>£9.80</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    basket_content: {
      backgroundColor: '#E5E5E5',
        display: 'flex',
        height: '100%',
        padding: '5%',
    },
    my_order: {
        fontWeight: '700',
        fontSize: 26,
        color: '#212121',
        paddingBottom: '5%',
    },
    items_list: {
        display: 'flex',
    },
    item_container: {
        borderColor: '#C0C0C0',
        borderStyle: 'solid',
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: '5%',
        width: '100%',
        justifyContent: 'space-between',
    },
    item_information: {
        alignSelf: 'flex-start',
        flex: 1,
    },
    item_name: {
        color: '#173C4F',
        fontSize: 21,
        fontWeight: '600',
        paddingBottom: '2%',
        alignSelf: 'flex-start',
    },
    item_specification_list: {

    },
    item_specification: {
        color: '#717171',
        fontWeight: '300',
        fontSize: 13,
    },
    price: {
        fontWeight: '600',
        fontSize: 17,
        alignSelf: 'flex-start',
        color: '#434343',
    },
    order_summary: {
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: '5%',
        width: '100%',
        justifyContent: 'space-between',
    },
    total_text: {
        fontSize: 21,
        color: '#173C4F',
        fontWeight: '700'
    },
    total_amount: {
        alignSelf: 'flex-end',
        fontSize: 20,
        color: '#173C4F',
        fontWeight: '700'
    },
    amount_selection_container: {
        display: 'flex',
        alignSelf: 'flex-start',
        flexDirection: 'row',
        backgroundColor: '#1B947E',
        borderRadius: 3,
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        flex: 0.15,
        marginEnd: '5%'
    },
    amount: {
        color: '#F1F1F1',
        fontWeight: '600',
        fontSize: 13,
        flex: 1,
    },
    change_amount_button: {
        resizeMode: 'contain',
        height: 'auto',
        width: 20,
    }
});


export default BasketContents;
