import React, {useEffect, useContext, useRef, useMemo} from 'react';
import {Platform, StyleSheet, Text, View, Keyboard} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GlobalContext} from '../../../App';
import CustomMapIcon from '../../assets/svgs/CustomMapIcon';
import {locationPress, requestLocationPermission} from './locationHelpers';
import mapStyles from '../../../stylesheets/mapStyles';

export default function MapBackground({
  searchBarFocused,
  setSearchBarFocussed,
}) {
  const context = useContext(GlobalContext);
  //used to watch the users location
  const watchID = useRef();
  const mapCenter = useRef({
    latitude: context.currentUser.Location._latitude,
    longitude: context.currentUser.Location._longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });



  const markers = useMemo(() => {
    return context.shopsData.map(shop => ({
      name: shop.Name,
      description: shop.Intro,
      coords: {
        latitude: shop.Location._latitude,
        longitude: shop.Location._longitude,
      },
      image: shop.Image,
      isOpen: shop.IsOpen,
    }));
  }, [context.shopsData]);

  //setup location access on map load. remove the location access when this component is unmounted
  useEffect(() => {
    let currWatch = watchID.current;
    requestLocationPermission(
      context.currentUser.key,
      mapCenter,
      watchID,
    ).catch(error => console.log(error));
    return () => {
      Geolocation.clearWatch(currWatch);
    };
  }, [context.currentUser.key]);

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
        {markers.map((marker, index) => (
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
              <Text style={{color: 'coral', fontWeight: 'bold', top: 0}}>
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
