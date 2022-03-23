import {StyleSheet, Text} from 'react-native';
import textStyles from '../../stylesheets/textStyles';
import React from 'react';

const EmptyListText = (text) => {
  return (
    <Text
      style={[
        styles.mainContainer,
        styles.emptyText,
        textStyles.darkGreyPoppinsSubHeading,
      ]}>
        {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#EDEBE7',
    flexGrow: 1,
  },

  emptyText: {
    paddingTop: '15%',
    paddingHorizontal: '2%',
    textAlign: 'center',
  },
});

export default EmptyListText;
