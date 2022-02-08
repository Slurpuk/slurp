import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import SectionList from 'react-native-tabs-section-list';
import textStyles from '../../stylesheets/textStyles';

const Menu = ({DATA, renderSection, renderItem}) => (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      stickySectionHeadersEnabled={false}
      scrollToLocationOffset={-20}
      tabBarStyle={styles.tabBar}
      renderItem={({item}) => renderSection({item, renderItem})} // Here, 'item' is actually a whole section
      renderSectionHeader={({section: {title}}) => (
        <View style={[textStyles.sectionHeader, styles.sectionHeader]}>
          <Text style={textStyles.poppinsTitle}>{title}</Text>
        </View>
      )}
      renderTab={({title, isActive}) => (
        <View
          style={[styles.tabContainer, isActive ? styles.activeTabBar : null]}
        >
          <Text
            style={[
              [textStyles.poppinsTitle],
              isActive ? styles.activeText : styles.sleepText,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    />
  </SafeAreaView>
);

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },

  activeTabBar: {
    borderBottomWidth: 3,
    borderBottomColor: '#087562',
  },

  activeText: {
    color: 'black',
  },

  sleepText: {
    color: '#717171',
  },

  sectionHeader: {
    marginHorizontal: '5%',
    color: 'black',
  },

  tabBar: {
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  tabContainer: {
    borderBottomColor: '#090909',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: screenWidth / 3,
    paddingVertical: 6,
  },
});

export default Menu;
