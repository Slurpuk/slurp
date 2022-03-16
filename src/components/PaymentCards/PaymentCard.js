import React, { useEffect, useState } from "react";
import {StyleSheet, View, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {collection, getDocs} from 'firebase/firestore';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const PaymentCard = ({card, setDefault, defaultCard}) => {
  const [isChanged, setIsChanged] = useState(false)
  function deleteCard() {
    firestore()
      .collection('Cards')
      .doc(card.key)
      .delete()
      .then(r => console.log('card deleted'));
  }
  // const querySnapshot = await getDocs(collection(db, 'Cards'));
  // querySnapshot.forEach(doc => {
  //   if (doc._data.isDefault && doc.id !== card.key) {
  //     firebase
  //       .firestore()
  //       .collection('Cards')
  //       .doc(doc.id)
  //       .update({isDefault: false})
  //       .then(() =>
  //         firebase
  //           .firestore()
  //           .collection('Cards')
  //           .doc(card.key)
  //           .update({isDefault: true})
  //           .then(() => console.log('Te quiero!')),
  //       );
  //   }
  // });

  async function setCardAsDefault(){
    console.log(defaultCard);
    if (defaultCard){
      await firestore()
        .collection('Cards')
        .doc(defaultCard.key)
        .update({isDefault: false})
        .then(() => {
          setIsChanged(true);
          console.log('old card is now secondary');
        });
    }
    else{
      setDefault(card);
      setIsChanged(true);
    }
  }

  useEffect(  () => {
    async function update(){
      await firestore()
        .collection('Cards')
        .doc(card.key)
        .update({isDefault: true})
        .then(r => console.log('new card is default'));
    }
    if(isChanged){
      update();
      setIsChanged(false);
    }
  }, [isChanged])

  // async function setAsDefault() {
  //   await firestore()
  //     .collection('Cards')
  //     .onSnapshot(querySnapshot => {
  //       querySnapshot.forEach(async documentSnapshot => {
  //         if (
  //           documentSnapshot._data.isDefault &&
  //           documentSnapshot.id !== card.key
  //         ) {
  //           await firestore()
  //             .collection('Cards')
  //             .doc(documentSnapshot.id)
  //             .update({isDefault: false})
  //             .then(
  //               async () =>
  //                 await firestore()
  //                   .collection('Cards')
  //                   .doc(card.key)
  //                   .update({isDefault: true})
  //                   .then(() => console.log('Te quiero!')),
  //             );
  //         }
  //       });
  //     });
  // }

  return (
    <View style={styles.rectangle}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text
            style={[
              styles.text,
              {color: 'black', fontWeight: '600', fontSize: 14},
            ]}>
            {card.brand}
          </Text>
        </View>
        <Pressable
          onPress={deleteCard}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Icon name={'trash-can'} size={24} color={'#CD5160'} />
          <Text style={[styles.text, {color: '#CD5160'}]}>Delete</Text>
        </Pressable>
      </View>
      <Text>*** **** **** {card.last4}</Text>
      {!card.isDefault ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={[
              {color: '#727272', fontWeight: '300', fontSize: 11},
              styles.text,
            ]}>
            Secondary
          </Text>
          <Pressable onPress={() => setCardAsDefault()}>
            <Text style={[styles.text, {color: '#1B947E'}]}>
              Set as Default
            </Text>
          </Pressable>
        </View>
      ) : (
        <Text
          style={[
            {color: '#727272', fontWeight: '300', fontSize: 11},
            styles.text,
          ]}>
          Default
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: '#F2F2F2',
    display: 'flex',
    padding: '3.5%',
    borderRadius: 10,
    marginBottom: '5%',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  text: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
  },
});

export default PaymentCard;
