import React, {createContext, useContext, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  LogBox,
  StatusBar,
} from 'react-native';
import MapBackground from '../components/LandingMap/MapBackground';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import {useFocusEffect} from '@react-navigation/native';
import DraggableShopList from '../components/Shops/DraggableShopList';
import ShopPage from './ShopPage';
import {GlobalContext} from '../../App';
import CustomSearchBar from '../components/LandingMap/CustomSearchBar';
import LandingHamburgerIcon from '../assets/svgs/LandingHamburgerIcon';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function LandingMapPage({navigation}) {

  //determine if the hamburger icon is pressable or not
  const setHamburgerVisible = useContext(VisibleContext);
  const context = useContext(GlobalContext);
  //do search results and cover need showing
  const [searchBarFocused, setSearchBarFocused] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setHamburgerVisible(true);

      return () => {
        setHamburgerVisible(false);
      };
    }, [setHamburgerVisible]),
  );

  return (
    <View style={styles.container}>

      {/*allows full screen map on devices with a notch*/}
      <StatusBar translucent={true} backgroundColor="transparent" />

      {/*wrapper for all map related code*/}
      <View style={styles.map}>
        {/*//the map component*/}
        <MapBackground
          searchBarFocused={searchBarFocused}
          setSearchBarFocussed={setSearchBarFocused}
        />

        {/*wrapper for aligning hamburger menu with search bar*/}
        <View style={styles.searchWrapper}>
          <View style={styles.newHamburger}>
            <LandingHamburgerIcon />
          </View>
          <CustomSearchBar
            navigation={navigation}
            searchBarFocused={searchBarFocused}
            setSearchBarFocussed={setSearchBarFocused}
          />
        </View>
      </View>

      {/*show the relevant bottom sheet*/}
      {context.isShopIntro ? (
        <ShopPage navigation={navigation} />
      ) : (
        <DraggableShopList navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    display: 'flex',
  },

  searchWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    top: screenHeight * 0.07,
  },

  newHamburger: {
    width: 0.07 * screenHeight,
    height: 0.07 * screenHeight,
    backgroundColor: 'whitesmoke',
    marginLeft: '3%',
    borderRadius: 16,
    borderColor: '#046D66',
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    borderRadius: 10,
    borderColor: '#666',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: screenHeight / 19,
    width: screenWidth / 1.4,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
