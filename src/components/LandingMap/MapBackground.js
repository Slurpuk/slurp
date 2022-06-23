import React, {useEffect, useContext, useRef, useMemo} from 'react';
import {StyleSheet, Text, View, Keyboard, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import CustomMapIcon from '../../assets/svgs/CustomMapIcon';
import {
  locationPress,
  requestLocationPermission,
} from '../../helpers/locationHelpers';
import mapStyles from '../../../stylesheets/mapStyles';
import {Alerts} from '../../data/Alerts';
import {GlobalContext, MapContext} from '../../contexts';
import {MapAction} from '../../data/actionEnum';

export default function MapBackground() {
  const {globalState, globalDispatch} = useContext(GlobalContext);
  const {mapState, mapDispatch} = useContext(MapContext);
  const watchID = useRef(); //used to watch the users location

  const markers = useMemo(() => {
    return globalState.listOfShops.map(shop => ({
      name: shop.name,
      description: shop.intro,
      coords: {
        latitude: shop.location.latitude,
        longitude: shop.location.longitude,
      },
      image: shop.image,
      is_open: shop.is_open,
    }));
  }, [globalState.listOfShops]); // Load the shop markers on the map every time the shops data changes

  /**
   * Setup location access on map load. Remove the location access when this component is unmounted
   */
  useEffect(() => {
    if (!globalState.locationIsEnabled) {
      let currWatch = watchID.current;
      requestLocationPermission(
        globalState.currentUserRef,
        watchID,
        globalDispatch,
        mapDispatch,
        mapState,
      ).catch(() => Alerts.elseAlert());
      return () => {
        Geolocation.clearWatch(currWatch);
      };
    }
  }, [
    globalDispatch,
    globalState.currentUserRef,
    globalState.locationIsEnabled,
    mapDispatch,
    mapState,
  ]);

  /**
   * Dismiss the keyboard and search results when the map is clicked
   */
  const mapPressed = () => {
    mapDispatch({type: MapAction.CENTER_AUTOMATICALLY});
    mapDispatch({type: MapAction.UNFOCUS_SEARCH_BAR});
    Keyboard.dismiss();
  };

  const mapDragged = () => {
    mapPressed();
    mapDispatch({type: MapAction.DECENTER_USER});
  };

  return (
    <View style={styles.container} testID="map-background">
      <MapView
        onRegionChangeComplete={region => {
          mapDispatch({
            type: MapAction.SET_REGION,
            location: {
              latitude: parseFloat(region.latitude.toPrecision(6)),
              longitude: parseFloat(region.longitude.toPrecision(6)),
            },
          });
        }}
        region={mapState.isManuallyCentered ? mapState.mapCenter : undefined}
        //focus only on map when map pressed
        onPress={() => mapPressed()}
        onPanDrag={() => mapDragged()}
        provider={PROVIDER_GOOGLE}
        style={styles.map}>
        {/*//map each of the shops to a marker on the map*/}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coords}
            pinColor={'navy'}
            title={marker.name}
            onPress={async () => {
              if (marker.is_open) {
                await locationPress(
                  globalState,
                  globalDispatch,
                  mapDispatch,
                  marker.name,
                );
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
            latitude: globalState.currentUser.location.latitude,
            longitude: globalState.currentUser.location.longitude,
          }}
          onDragEnd={e => console.log(e)}
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
