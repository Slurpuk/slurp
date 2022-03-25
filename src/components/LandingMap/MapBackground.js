import React, {useEffect, useContext, useRef} from 'react';

import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GlobalContext} from '../../../App';
import CustomMapIcon from '../../assets/svgs/CustomMapIcon';
import {locationPress, requestLocationPermission} from './locationHelpers';
import mapStyles from '../../../stylesheets/mapStyles';
Dimensions.get('window').height;

export default function MapBackground({
  searchBarFocused,
  setSearchBarFocussed,
}) {
  const context = useContext(GlobalContext);
  //used to watch the users location
  const watchID = useRef();
  const mapCenter = useRef({
    latitude: context.currentCenterLocation.latitude,
    longitude: context.currentCenterLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  //setup location access on map load. remove the location access when this component is unmounted
  useEffect(() => {
    requestLocationPermission(context, mapCenter, watchID.current).then(r =>
      console.log('permission granted'),
    );
    return () => {
      Geolocation.clearWatch(watchID.current);
    };
  }, []);

  //dismiss the keyboard and search results when the map is clicked
  const mapPressed = () => {
    setSearchBarFocussed(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={(region, isGesture) => {
          if (Platform.OS === 'ios') {
            if (
              region.latitude.toFixed(6) !==
                mapCenter.current.latitude.toFixed(6) &&
              region.longitude.toFixed(6) !==
                mapCenter.current.longitude.toFixed(6)
            ) {
              mapCenter.current = region;
            }
          } else {
            mapCenter.current = region;
          }
        }}
        //focus only on map when map pressed
        onPress={event => mapPressed()}
        onPanDrag={event => mapPressed()}
        provider={PROVIDER_GOOGLE}
        style={styles.map}

        region={mapCenter.current}>
        {/*//map each of the shops to a marker on the map*/}
        {context.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coords}
            pinColor={'navy'}
            title={marker.name}
            onPress={() => {
              if (marker.isOpen) {
                locationPress(context, mapCenter, marker.name);
              }
              mapPressed();
            }}>
            {/*//closed markers appear grey*/}
            <View style={styles.markerStyle}>
              <Text style={{color: 'coral', fontWeight: 'bold'}}>
                {!marker.isOpen ? 'Closed' : ''}
              </Text>
              <CustomMapIcon isOpen={marker.isOpen} />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: mapStyles.MapBackgroundContainer,
  map: mapStyles.mapWithAbsoluteFill,
  markerBg: mapStyles.markerBg,
  markerStyle: mapStyles.markerStyle,
});
