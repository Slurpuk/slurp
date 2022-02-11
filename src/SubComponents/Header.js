import React from 'react';
import {StyleSheet, View, Pressable, Image, Text, Alert} from 'react-native';

const Header = {title} => {
  const onBackButtonClicked = () => {
    Alert.alert('FUTURE NAVIGATION FEATURE', 'Go back to previous page', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <View style={styles.header}>
      <Pressable onPress={onBackButtonClicked}>
        <Image
          source={require('../../static/BackArrow.jpg')}
          style={styles.back_button}
        />
      </Pressable>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#046D66',
    display: 'flex',
    paddingVertical: '6%',
    paddingHorizontal: '5%',
    alignItems: 'flex-start',
  },
  back_button: {
    resizeMode: 'contain',
    borderRadius: 400,
    flex: 1,
    height: 'auto',
    width: 50,
    alignSelf: 'flex-start',
  },
  title: {
    flex: 1,
    color: '#EDEBE7',
    fontWeight: '700',
    fontStyle: 'normal',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 26,
  },
});

export default Header;
