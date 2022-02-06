import React from 'react';
import {Text, StyleSheet, View, Platform} from 'react-native';
import SectionList from 'react-native/Libraries/Lists/SectionList';
import textStyles from '../../stylesheets/textStyles';

const CheckboxSectionList = ({DATA, renderItem, updateOptions}) => {
  return (
    <View style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={item => item.key}
        renderItem={({item}) => renderItem({item, updateOptions})}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({section: {title}}) => (
          <Text style={[textStyles.sectionHeader, styles.sectionHeader]}>
            {title}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '0%',
    paddingBottom: '4%',
    marginTop: '1.4%',
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },

  sectionHeader: {
    marginTop: '3%',
    marginBottom: '0%',
    ...Platform.select({
      ios: {
        marginBottom: '2%',
        marginTop: '5%',
      },
      android: {
        color: 'black',
      },
    }),
  },
});

export default CheckboxSectionList;
