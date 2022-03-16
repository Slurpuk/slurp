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

    const publishableKey =
        'pk_test_51KRjSVGig6SwlicvL06FM1BDNZr1539SwuDNXond8v6Iaigyq1NRZsleWNK5PTPEwo1bAWfTQqYHEfXCJ4OWq348000jVuI6u1';


    async function getCards(){
        await firestore()
            .collection('Cards')
            .get()
            .then((coll)=>{
                //console.log(coll._docs.map(x => x._data ));
                const myDefaultCard=coll._docs.map(x => x._data.isDefault ? x._data:null).filter(element => {
                    return element !== null;
                });
                const myOtherCards=coll._docs.map(x => !x._data.isDefault ? x._data:null).filter(element => {
                    return element !== null;
                });;
                console.log(myDefaultCard);
                console.log(myOtherCards);
                setCards(myOtherCards);
                setDefaultCard(myDefaultCard);
            });
    }

    useEffect(() => {
        getCards().then(() =>console.log("Updated cards") );
    }, []);


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
                <View>
                    <FlatList
                        data={defaultCard}
                        renderItem={({item}) => <AnimatedCard
                            initialHeight={40}
                            collapsableContent={<CollapsedPayMethCard defaultCard={item}/>}//this is the collapsed part
                            hidableContent={<UncollapsedPayMethCard cards={cards}/>}//this is the uncollapsed part
                        />}
                    />
                    <Text>New Payment Card</Text>
                </View>
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
