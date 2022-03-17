import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HamburgerButton = ({navigation}) => {
  return (
    <View style={styles.header}>
      <TouchableHighlight style={styles.floating_button}>
        <Icon.Button
          onPress={() => navigation.openDrawer()}
          name="bars"
          color={'#046D66'}
          backgroundColor={'transparent'}
          underlayColor={'white'}
          size={0.04 * screenHeight}
          borderRadius={10}
        />
      </TouchableHighlight>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    height: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  floating_button: {
    ...Platform.select({
      ios: {
        marginTop: '20%',
      },
      android: {
        marginTop: '20%',
      },
    }),
    backgroundColor: 'transparent',
    underlayColor: 'white',
    borderRadius: 20,
    height: 0.07 * screenHeight,
    margin: '3%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
});

export default HamburgerButton;
