import React, {useState, useEffect} from 'react';

import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function MapBackground() {
  const [clatitude, setcLatitude] = useState(0);
  const [clongitude, setcLongitude] = useState(0);
  const [clatitudeDelta, setcLatitudeDelta] = useState(0);
  const [clongitudeDelta, setcLongitudeDelta] = useState(0);
  // const [coordinates, setCoordinates] = useState([0]);

  // const coordinatesMaker = () => {
  //
  // }

  GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
  })
    .then(location => {
      setcLatitude(location.latitude);
      setcLongitude(location.longitude);
    })
    .catch(error => {
      const {code, message} = error;
      console.warn(code, message);
    });

  const tokyoRegion = {
    latitude: 51.512772,
    longitude: -0.117188,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const currentLocation = {
    latitude: clatitude,
    longitude: clongitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const locationPress = () => {
    console.log('Function will be here!!');
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={tokyoRegion}
      >
        <MapView.Marker
          coordinate={currentLocation}
          pinColor={'#fefefe'}
          title={'hey there fellas'}
          description={'Test market'}
          onPress={locationPress}
        />
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
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  marker: {},
});
