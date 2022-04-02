import React, {useEffect, useContext, useRef, useMemo} from 'react';
import {Platform, StyleSheet, Text, View, Keyboard} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GlobalContext} from '../../../App';
import CustomMapIcon from '../../assets/svgs/CustomMapIcon';
import {
  locationPress,
  requestLocationPermission,
} from '../../helpers/locationHelpers';
import mapStyles from '../../../stylesheets/mapStyles';
import {Alerts} from '../../data/Alerts';

export default function MapBackground({
  searchBarFocused,
  setSearchBarFocussed,
}) {
  const context = useContext(GlobalContext);
  //used to watch the users location
  const watchID = useRef();
  const mapCenter = useRef({
    latitude: context.currentUser.location._latitude,
    longitude: context.currentUser.location._longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const markers = useMemo(() => {
    return context.shopsData.map(shop => ({
      name: shop.name,
      description: shop.intro,
      coords: {
        latitude: shop.location.latitude,
        longitude: shop.location.longitude,
      },
      image: shop.image,
      is_open: shop.is_open,
    }));
  }, [context.shopsData]);

  //setup location access on map load. remove the location access when this component is unmounted
  useEffect(() => {
    let currWatch = watchID.current;
    requestLocationPermission(
      context.currentUser.ref,
      mapCenter,
      watchID,
      context.setLocationIsEnabled,
    ).catch(error => Alerts.elseAlert());
    return () => {
      Geolocation.clearWatch(currWatch);
    };
  }, [context.currentUser.ref, context.setLocationIsEnabled]);

  //dismiss the keyboard and search results when the map is clicked
  const mapPressed = () => {
    setSearchBarFocussed(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <MapView
        testID="map-background"
        onRegionChangeComplete={region => {
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
        onPress={() => mapPressed()}
        onPanDrag={() => mapPressed()}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapCenter.current}>
        {/*//map each of the shops to a marker on the map*/}
        {markers.map((marker, index) => (
          <Marker
            testID="marker"
            key={index}
            coordinate={marker.coords}
            pinColor={'navy'}
            title={marker.name}
            onPress={async () => {
              if (marker.is_open) {
                await locationPress(context, mapCenter, marker.name);
              }
              mapPressed();
            }}>
            <View style={styles.markerStyle} testID="marker-inner-view">
              <Text style={{color: 'coral', fontWeight: 'bold', top: 0}}>
                {!marker.is_open ? 'Closed' : ''}
              </Text>
              <CustomMapIcon isOpen={marker.is_open} />
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
