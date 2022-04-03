import React, {useEffect, useContext, useRef, useMemo, useState} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Keyboard,
  Image,
  Button,
} from 'react-native';
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
    setFocusMarker,
}) {
  const context = useContext(GlobalContext);
  const watchID = useRef(); //used to watch the users location
  const [isUserCentered, setIsUserCentered] = useState(true);
  const [mapCenter, setMapCenter] = useState({
    latitude: context.currentUser.location.latitude,
    longitude: context.currentUser.location.longitude,
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
  }, [context.shopsData]); // Load the shop markers on the map every time the shops data changes

  /**
   * Setup location access on map load. Remove the location access when this component is unmounted
   */
  useEffect(() => {
    setFocusMarker.current = focusMarker;
    if (!context.locationIsEnabled) {
      let currWatch = watchID.current;
      requestLocationPermission(
        context.currentUser.ref,
        setMapCenter,
        watchID,
        context.setLocationIsEnabled,
        isUserCentered,
      ).catch(error => Alerts.elseAlert());
      return () => {
        Geolocation.clearWatch(currWatch);
      };
    }
  }, [
    context.currentUser.ref,
    context.setLocationIsEnabled,
    context.locationIsEnabled,
    isUserCentered,
  ]);

  /**
   * dismiss the keyboard and search results when the map is clicked
   */
  const mapPressed = () => {
    setIsUserCentered(false);
    setSearchBarFocussed(false);
    Keyboard.dismiss();
  };

  const focusMarker = () => {
    setMapCenter(prevState => ({
      ...prevState,
      latitude: context.currentUser.location.latitude,
      longitude: context.currentUser.location.longitude,
    }));
  };

  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={region => {
          if (Platform.OS === 'ios') {
            if (
              region.latitude.toFixed(6) !== mapCenter.latitude.toFixed(6) &&
              region.longitude.toFixed(6) !== mapCenter.longitude.toFixed(6)
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
        region={mapCenter}
      >
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
            }}
          >
            {/*//closed markers appear grey*/}
            <View style={styles.markerStyle}>
              <Text style={styles.closed}>
                {!marker.is_open ? 'Closed' : ''}
              </Text>
              <CustomMapIcon isOpen={marker.is_open} />
            </View>
          </Marker>
        ))}
        <Marker
          draggable
          coordinate={{
            latitude: context.currentUser.location.latitude,
            longitude: context.currentUser.location.longitude,
          }}
          onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
          onPress={() => focusMarker()}
          title={'Current Location'}>
          <Image
            source={require('../../assets/images/dot.png')}
            style={{height: 45, width: 45}}
          />
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
});
