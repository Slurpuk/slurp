import React, {useContext, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  LogBox,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapBackground from '../components/LandingMap/MapBackground';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import {useFocusEffect} from '@react-navigation/native';
import DraggableShopList from '../components/Shops/DraggableShopList';
import ShopPage from './ShopPage';
import {GlobalContext} from '../../App';
import CustomSearchBar from '../components/LandingMap/CustomSearchBar';
import LandingHamburgerIcon from '../assets/svgs/LandingHamburgerIcon';
import mapStyles from '../../stylesheets/mapStyles';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function LandingMapPage({navigation}) {
  //determine if the hamburger icon is pressable or not
  const setHamburgerVisible = useContext(VisibleContext);
  const context = useContext(GlobalContext);
  //do search results and cover need showing
  const [searchBarFocused, setSearchBarFocused] = useState(false);
  const setFocusMarker = useRef();
  const [recenterVisible, setRecenterVisible] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setHamburgerVisible(true);
      return () => {
        setHamburgerVisible(false);
      };
    }, [setHamburgerVisible]),
  );

  return (
    <View style={styles.container} testID={'landing_map_page'}>
      {/*allows full screen map on devices with a notch*/}
      <StatusBar translucent={true} backgroundColor="transparent" />

      {/*wrapper for all map related code*/}
      <View style={styles.map}>
        {/*//the map component*/}
        <MapBackground
          setFocusMarker={setFocusMarker}
          setSearchBarFocussed={setSearchBarFocused}
          setRecenterVisible={setRecenterVisible}
        />

        {/*wrapper for aligning hamburger menu with search bar*/}
        <View style={styles.searchWrapper}>
          <View style={styles.newHamburger}>
            <LandingHamburgerIcon />
          </View>
          <CustomSearchBar
            searchBarFocused={searchBarFocused}
            setSearchBarFocussed={setSearchBarFocused}
          />
        </View>
        {recenterVisible ? (
          <TouchableOpacity
            style={styles.recenterButton}
            onPress={() => setFocusMarker.current()}
          >
            <Image
              source={require('../../src/assets/images/recenter-icon.png')}
              style={styles.recenterImage}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/*show the relevant bottom sheet*/}
      {context.bottomSheet.isOpen ? (
        <ShopPage navigation={navigation} />
      ) : (
        <DraggableShopList navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: mapStyles.container,
  map: mapStyles.map,
  searchWrapper: mapStyles.searchWrapper,
  newHamburger: mapStyles.newHamburger,
  searchBar: mapStyles.searchBar,
  recenterButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignSelf: 'center',
    backgroundColor: '#087562',
    borderRadius: 20,
    width: 50,
    height: 50,
    paddingRight: 10,
  },
  recenterImage: {
    width: 50,
    height: 50,
  },
});
