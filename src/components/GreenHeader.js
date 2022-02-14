import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  Alert,
  TouchableHighlight,
  StatusBar,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import WhiteArrowButton from '../SubComponents/WhiteArrowButton';

const GreenHeader = ({headerText}) => {
  const onBackButtonClicked = () => {
    Alert.alert('FUTURE NAVIGATION FEATURE', 'Go back to previous page', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <View style={styles.header}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.arrow}>
        <WhiteArrowButton direction={'left'} onPress={onBackButtonClicked} />
      </View>
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#046D66',
    display: 'flex',
    paddingTop: getStatusBarHeight(),
    paddingBottom: '6%',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },

  headerText: {
    color: '#EDEBE7',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 27,
    marginLeft: 20,
    letterSpacing: 0.4,
},
});

export default GreenHeader;
