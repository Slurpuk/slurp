import React from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PaymentCard = ({card}) => {
  function deleteCard() {
    console.log('delete');
  }

  function setAsDefault() {
    console.log('set as default');
  }

  return (
    <View style={styles.rectangle}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}
      >
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text
            style={[
              styles.text,
              {color: 'black', fontWeight: '600', fontSize: 14},
            ]}
          >
            {card.type}
          </Text>
        </View>
        <Pressable
          onPress={deleteCard}
          style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}
        >
          <Icon name={'trash-can'} size={24} color={'#CD5160'} />
          <Text style={[styles.text, {color: '#CD5160'}]}>Delete</Text>
        </Pressable>
      </View>
      <Text>*** **** **** {card.number.slice(13, 19)}</Text>
      {card.isDefault ? (
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Text
            style={[
              {color: '#727272', fontWeight: '300', fontSize: 11},
              styles.text,
            ]}
          >
            Default
          </Text>
          <Pressable onPress={setAsDefault}>
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
          ]}
        >
          Secondary
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
