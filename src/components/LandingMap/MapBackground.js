import React, {
  useEffect,
  useContext,
  useRef,
  useMemo,
  useState,
  useCallback,
} from 'react';
import {Platform, StyleSheet, Text, View, Keyboard, Image} from 'react-native';
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
  setSearchBarFocussed,
  setFocusMarker,
  setRecenterVisible,
}) {
  const context = useContext(GlobalContext);
  const watchID = useRef(); //used to watch the users location
  const [userLocation, setUserLocation] = useState(
    context.currentUser.location,
  );
  const isUserCentered = useRef(true);
  const [mapCenter, setMapCenter] = useState({
    latitude: userLocation.latitude,
    longitude: userLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const focusMarker = useCallback(() => {
    setMapCenter(prevState => ({
      ...prevState,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
    }));
  }, [userLocation.latitude, userLocation.longitude]);
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
  }, [context.shopsData]); // Load the shop markers on the map every time the shops data changes

  /**
   * Update the map center according to the current states.
   */
  const updateMapCenter = useCallback((latitude, longitude) => {
    if (isUserCentered.current) {
      setMapCenter(prevState => {
        return {
          ...prevState,
          latitude: latitude,
          longitude: longitude,
        };
      });
    }
  }, []);

  /**
   * Side effect for passing the focusMarker function to the parent component
   */
  useEffect(() => {
    setFocusMarker.current = focusMarker;
  }, [focusMarker, setFocusMarker]);

  /**
   * Side effect for tracking whether the map is centered around the user and updating the states accordingly.
   */
  useEffect(() => {
    if (
      userLocation.latitude.toPrecision(6) ===
        mapCenter.latitude.toPrecision(6) &&
      userLocation.longitude.toPrecision(6) ===
        mapCenter.longitude.toPrecision(6)
    ) {
      isUserCentered.current = true;
      setRecenterVisible(false);
    } else {
      isUserCentered.current = false;
      setRecenterVisible(true);
    }
  }, [mapCenter, setRecenterVisible, userLocation]);

  /**
   * Setup location access on map load. Remove the location access when this component is unmounted
   */
  useEffect(() => {
    if (!context.locationIsEnabled) {
      let currWatch = watchID.current;
      requestLocationPermission(
        setUserLocation,
        context.currentUser.ref,
        watchID,
        context.setLocationIsEnabled,
        updateMapCenter,
      ).catch(() => Alerts.elseAlert());
      return () => {
        Geolocation.clearWatch(currWatch);
      };
    }
  }, [
    context.currentUser.ref,
    context.setLocationIsEnabled,
    context.locationIsEnabled,
    updateMapCenter,
  ]);

  /**
   * Dismiss the keyboard and search results when the map is clicked
   */
  const mapPressed = () => {
    setSearchBarFocussed(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container} testID="map-background">
      <MapView
        onRegionChangeComplete={region => {
          if (Platform.OS === 'ios') {
            if (
              region.latitude.toPrecision(6) !==
                mapCenter.latitude.toPrecision(6) &&
              region.longitude.toPrecision(6) !==
                mapCenter.longitude.toPrecision(6)
            ) {
              setMapCenter(region);
            }
          } else {
            setMapCenter(region);
          }
        }}
        //focus only on map when map pressed
        onPress={() => mapPressed()}
        onPanDrag={() => mapPressed()}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapCenter}>
        {/*//map each of the shops to a marker on the map*/}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coords}
            pinColor={'navy'}
            title={marker.name}
            onPress={async () => {
              if (marker.is_open) {
                await locationPress(context, setMapCenter, marker.name);
              }
              mapPressed();
            }}>
            {/*//closed markers appear grey*/}
            <View
              style={styles.markerStyle}
              testID={'shop_marker_' + marker.name}>
              <Text style={styles.closed} testID="marker-text">
                {!marker.is_open ? 'Closed' : ''}
              </Text>
              <CustomMapIcon isOpen={marker.is_open} />
            </View>
          </Marker>
        ))}
        <Marker
          draggable
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          onPress={() => focusMarker()}
          title={'You are here'}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/CurrentLocationMarkerFull.png')}
              style={styles.userMarker}
            />
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: mapStyles.MapBackgroundContainer,
  map: mapStyles.mapWithAbsoluteFill,
  markerBg: mapStyles.markerBg,
  markerStyle: mapStyles.markerStyle,
  closed: {color: 'coral', fontWeight: 'bold', top: 0},
  userMarker: {height: 70, width: 70},
});
