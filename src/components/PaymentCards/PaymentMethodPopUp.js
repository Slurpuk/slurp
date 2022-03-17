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
import firestore from "@react-native-firebase/firestore";
import UncollapsedPayMethCard from "./UncollapsedPayMethCard";
import CollapsedPayMethCard from "./CollapsedPayMethCard";
import AnimatedCard from "../../sub-components/AnimatedCard";

const PaymentMethodPopUp = () => {
    const [cards, setCards] = useState();
    const [defaultCard, setDefaultCard] = useState([]);

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
                </View >
                <View  style={styles.body}>
                    <FlatList
                        data={defaultCard}
                        renderItem={({item}) => <AnimatedCard
                            initialHeight={50}
                            collapsableContent={<CollapsedPayMethCard defaultCard={item}/>}//this is the collapsed part
                            hidableContent={<UncollapsedPayMethCard cards={cards}/>}//this is the uncollapsed part
                            />}
                            style={styles.items_list}
                    />
                    <Text  style={styles.text}>+New Payment Card</Text>
                    <CustomButton
                        text={"Place Order " }
                        priority={'primary'}
                        width={screenWidth * 0.79}
                        style={styles.button}
                    />
                </View>
            </View>
    );
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        paddingLeft: '7%',
        width: 0.9128 * screenWidth,
        height: 0.4723 * screenHeight,
        backgroundColor: 'white',
        paddingVertical: '6%',
        position: 'absolute',
        top: '30%',
        bottom: '23%',
        left: '4%',
        right: '4%',
        elevation: 200,
        zIndex: 100,
    },
    product_name: {
        color: 'black',
        marginLeft: '2%',
    },
    items_list: {
        flex: 0,
        maxHeight:'70%',
    },

    text: {
        flex: 600,
        paddingTop:'4%',
    },

    button: {
        flex: 1,
        paddingTop:'10%',
    },

    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom:'4%',
    },

    body: {
        display: 'flex',
        flex:1,
        marginRight: '6%',
    },


    icon: {
        marginRight: '7%',
        marginBottom: '2%',
    },
});

export default PaymentMethodPopUp;
