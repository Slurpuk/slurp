import React, {useContext} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import SectionList from 'react-native-tabs-section-list';
import textStyles from '../../../stylesheets/textStyles';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../sub-components/CustomButton';
import {OptionsContext} from '../../screens/LandingMapPage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ShopContext} from '../Shops/ShopPage';

const NumItemsContext = React.createContext(0);

const Menu = ({DATA, renderSection, renderItem, navigation}) => {
  const context = useContext(ShopContext);


  return (
    <>
      <NumItemsContext.Provider value="0">
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
                style={[
                  styles.tabContainer,
                  isActive ? styles.activeTabBar : null,
                ]}>
                <Text
                  style={[
                    [textStyles.poppinsTitle],
                    isActive ? styles.activeText : styles.sleepText,
                  ]}>
                  {title}
                </Text>
              </View>
            )}
          />

          <View style={styles.absoluteArea}>
            <LinearGradient
              colors={['transparent', '#EDEBE7', '#EDEBE7']}
              style={styles.linearGradient}>
              <NumItemsContext.Consumer>
                {value => {
                  return (
                    // <TouchableOpacity
                    //   onPress={() =>
                    //     navigation.navigate('Basket page', context)
                    //   }>
                      <CustomButton
                        text="View Basket"
                        priority="primary"
                        optionalNumber={context.basketContent.length}
                        onPress = {() => navigation.navigate('Basket page', context)}
                      />
                    // </TouchableOpacity>
                  );
                }}
              </NumItemsContext.Consumer>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </NumItemsContext.Provider>
    </>
  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'whitesmoke',
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
    backgroundColor: '#F2F2F2',
  },

  linearGradient: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },

  absoluteArea: {
    position: 'absolute',
    height: 100,
    backgroundColor: '',
    bottom: 0,
    width: '100%',
  },
});

export default Menu;
