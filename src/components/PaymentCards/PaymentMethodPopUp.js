import React, {useContext, useEffect, useState} from 'react';
import {
    Dimensions, FlatList,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import CustomButton from '../../sub-components/CustomButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {VisibleContext} from "../../navigation/HamburgerSlideBarNavigator";
import firestore from "@react-native-firebase/firestore";
import UncollapsedPayMethCard from "./UncollapsedPayMethCard";
import CollapsedPayMethCard from "./CollapsedPayMethCard";
import AnimatedCard from "../../sub-components/AnimatedCard";

const PaymentMethodPopUp = () => {
    const [cards, setCards] = useState();
    const [defaultCard, setDefaultCard] = useState([]);
    const [brand, setBrand] = useState();
    const [isDefault, setIsDefault] = useState();
    const [last4, setLast4] = useState();

    function orderCardsFirstDefault(localCards) {
        return localCards.sort(function (x, y) {
            return x.isDefault === y.isDefault ? 0 : x.isDefault ? -1 : 1;
        });
    }

    useEffect(() => {
        const subscriber = firestore()
            .collection('Cards')
            .onSnapshot(querySnapshot => {
                const cards = [];
                querySnapshot.forEach(documentSnapshot => {
                    if (documentSnapshot._data.isDefault) {
                        let temp = defaultCard;
                        temp.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                        setDefaultCard(temp);
                    }
                    else{
                        cards.push({
                            ...documentSnapshot.data(),
                            key: documentSnapshot.id,
                        });
                    }
                });
                setCards(orderCardsFirstDefault(cards));
            });
        return () => subscriber();
    }, [last4]);


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[textStyles.headingOne, styles.product_name]}>
                    PAYMENT METHOD
                </Text>
                <TouchableHighlight
                    style={styles.icon}
                    underlayColor={'white'}
                >
                    <Icon size={30} color="black" name="close" />
                </TouchableHighlight>
            </View>
            <FlatList
            data={defaultCard}
            renderItem={({item}) => <AnimatedCard
                initialHeight={40}
                collapsableContent={<CollapsedPayMethCard defaultCard={item}/>}//this is the collapsed part
                hidableContent={<UncollapsedPayMethCard cards={cards.shift()}/>}//this is the uncollapsed part
            />}
        />

            <CustomButton
                text={"Place Order " }
                priority={'primary'}
                width={screenWidth * 0.79}
            />
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: '7%',
        width: 0.9128 * screenWidth,
        height: 0.5723 * screenHeight,
        backgroundColor: 'white',
        paddingVertical: '6%',
        position: 'absolute',
        top: '20%',
        bottom: '23%',
        left: '4%',
        right: '4%',
        elevation: 200,
        zIndex: 100,
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    product_name: {
        color: 'black',
        marginLeft: '2%',
    },

    list: {
        flex: 1,
        height: '60%',
    },

    icon: {
        marginRight: '7%',
        marginBottom: '2%',
    },
});

export default PaymentMethodPopUp;
