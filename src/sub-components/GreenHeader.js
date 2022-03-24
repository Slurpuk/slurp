import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import WhiteArrowButton from './WhiteArrowButton';
import textStyles from '../../stylesheets/textStyles';
import {getTightPadding} from '../../stylesheets/StyleFunction';

const GreenHeader = ({headerText, navigation}) => {
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
    paddingTop: getTightPadding(),
    paddingBottom: '6%',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  title: {
    marginTop: '2%',
  },
});

export default GreenHeader;
