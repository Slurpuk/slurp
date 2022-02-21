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
          underlayColor={'transparent'}
          backgroundColor={'transparent'}
          size={25}
        />
      </TouchableHighlight>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    height: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  floating_button: {
    ...Platform.select({
      ios: {
        marginTop: '15%',
      },
      android: {
        marginTop: '15%',
      },
    }),
    backgroundColor: '#ffffff',
    borderRadius: 11,
    paddingTop: '0.5%',
    paddingLeft: '2.5%',
    height: 0.055 * screenHeight,
    marginRight: '3%',
  },
});

export default HamburgerButton;
