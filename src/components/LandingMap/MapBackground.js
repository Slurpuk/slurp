import React, {useState, useEffect, useContext, useRef} from 'react';

import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Animated,
  Image,
  Keyboard,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GlobalContext} from '../../../App';
import {fadeOpacityIn, fadeOpacityOut} from '../../sub-components/Animations';
import CustomMapIcon from '../../assets/svgs/CustomMapIcon';
import firestore from '@react-native-firebase/firestore';
import {locationPress, requestLocationPermission} from './locationHelpers';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function MapBackground({
  searchBarFocused,
  setSearchBarFocussed,
}) {
  const context = useContext(GlobalContext);
  const watchID = useRef();
  const mapCenter = useRef({
    latitude: context.currentCenterLocation.latitude,
    longitude: context.currentCenterLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const locationPress = clickedMarker => {
    let selectedShop = context.shopsData.find(
      shop => shop.Name === clickedMarker,
    );

    if (context.isShopIntro) {
      fadeOpacityOut(context.adaptiveOpacity, 170);

      let myTimeout = setTimeout(() => {
        context.setCurrentCenterLocation({
          latitude: selectedShop.Location._latitude,
          longitude: selectedShop.Location._longitude,
        });
        let old = mapCenter.current;
        mapCenter.current = {
          latitude: selectedShop.Location._latitude,
          longitude: selectedShop.Location._longitude,
          latitudeDelta: old.latitudeDelta,
          longitudeDelta: old.longitudeDelta,
        };
        context.switchShop(selectedShop);
        clearTimeout(myTimeout);
      }, 200);

      setTimeout(() => {
        fadeOpacityIn(context.adaptiveOpacity, 200);
      }, 210);
    } else {
      context.setCurrentCenterLocation({
        latitude: selectedShop.Location._latitude,
        longitude: selectedShop.Location._longitude,
      });
      let old = mapCenter.current;
      mapCenter.current = {
        latitude: selectedShop.Location._latitude,
        longitude: selectedShop.Location._longitude,
        latitudeDelta: old.latitudeDelta,
        longitudeDelta: old.longitudeDelta,
      };
      context.switchShop(selectedShop);
      context.setShopIntro(true);
    }
  };

  useEffect(() => {
    requestLocationPermission(context, mapCenter, watchID.current).then(r =>
      console.log('permission granted'),
    );
    return () => {
      Geolocation.clearWatch(watchID.current);
    };
  }, []);

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
        onPress={event => mapPressed()}
        onPanDrag={event => mapPressed()}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapCenter.current}>
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
            <View style={styles.markerStyle}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>
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
  container: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'flex-end',
    zIndex: -3,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },

  markerBg: {
    backgroundColor: '#FAFAFA',
    padding: 5,
    marginBottom: 4,
    borderRadius: 11,
  },

  markerStyle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 220,
  },
});
