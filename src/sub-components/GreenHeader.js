import React from 'react';
import {StyleSheet, View, Text, Alert, StatusBar, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import WhiteArrowButton from './WhiteArrowButton';
import textStyles from '../../stylesheets/textStyles';

const GreenHeader = ({headerText, navigation}) => {
  const onBackButtonClicked = () => {
    // Alert.alert('FUTURE NAVIGATION FEATURE', 'Go back to previous page', [
    //   {
    //     text: 'OK',
    //   },
    // ]);
  };

  return (
    <View style={styles.header}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.arrow}>
        <WhiteArrowButton direction={'left'} navigation={navigation} />
      </View>
      <View style={styles.title}>
        <Text style={textStyles.whiteTextOnGreenHeaderText}>{headerText}</Text>
      </View>
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

  title: {
    ...Platform.select({
      ios: {
        marginTop: '2%',
      },
    }),
  },
});

export default GreenHeader;
