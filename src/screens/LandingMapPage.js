import React, {useContext, useReducer} from 'react';
import {
  StyleSheet,
  View,
  LogBox,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import MapBackground from '../components/LandingMap/MapBackground';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import {useFocusEffect} from '@react-navigation/native';
import DraggableShopList from '../components/Shops/DraggableShopList';
import ShopPage from './ShopPage';
import CustomSearchBar from '../components/LandingMap/CustomSearchBar';
import LandingHamburgerIcon from '../assets/svgs/LandingHamburgerIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import mapStyles from '../../stylesheets/mapStyles';
import {mapReducer} from '../reducers';
import {GlobalContext, MapContext} from '../contexts';
import {MapAction} from '../data/actionEnum';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function LandingMapPage({navigation}) {
  const setHamburgerVisible = useContext(VisibleContext); //determine if the hamburger icon is pressable or not
  const {globalState} = useContext(GlobalContext);
  const initialState = useContext(MapContext);
  const [mapState, mapDispatch] = useReducer(mapReducer, initialState);

  useFocusEffect(
    React.useCallback(() => {
      setHamburgerVisible(true);
      return () => {
        setHamburgerVisible(false);
      };
    }, [setHamburgerVisible]),
  );

  function recenter() {
    const userLocation = globalState.currentUser.location;
    mapDispatch({
      type: MapAction.SET_MAP_CENTER,
      location: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    });
    mapDispatch({type: MapAction.CENTER_USER});
  }

  return (
    <MapContext.Provider value={{mapState, mapDispatch}}>
      <View style={styles.container} testID={'landing_map_page'}>
        {/*allows full screen map on devices with a notch*/}
        <StatusBar translucent={true} backgroundColor="transparent" />

        {/*wrapper for all map related code*/}
        <View style={styles.map}>
          {/*//the map component*/}
          <MapBackground />

          {/*wrapper for aligning hamburger menu with search bar*/}
          <View style={styles.searchWrapper}>
            <View style={styles.newHamburger}>
              <LandingHamburgerIcon />
            </View>
            <CustomSearchBar />
          </View>
          {!mapState.isUserCentered ? (
            <TouchableOpacity
              style={styles.recenterButton}
              onPress={() => recenter()}>
              <Icon size={40} color="#087562" name="crosshairs-gps" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/*show the relevant bottom sheet*/}
        {globalState.isShopIntro ? (
          <ShopPage navigation={navigation} />
        ) : (
          <DraggableShopList navigation={navigation} />
        )}
      </View>
    </MapContext.Provider>
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
    bottom: 70,
    right: 10,
    alignSelf: 'center',
    borderRadius: 20,
    width: 50,
    height: 50,
    paddingRight: 10,
  },
});
