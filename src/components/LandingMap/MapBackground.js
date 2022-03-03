import React, {useState, useEffect} from 'react';

import {
  Alert,
  Button,
  Dimensions,
  Platform, Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location';
import textStyles from "../../../stylesheets/textStyles";
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function MapBackground() {
  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState(0);
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState(0);
  const [
    locationStatus,
    setLocationStatus
  ] = useState(0);

  const calculateDistance = () => {
    console.log('This is my current latitude: '+currentLatitude)
    console.log('This is my current longitude: '+currentLongitude)
    console.log('This is my bush house latitude: '+hardcodedMarker1.latitude)
    console.log('This is my bush house longitude: '+hardcodedMarker1.longitude)
    console.log('This is my shop latitude: '+hardcodedMarker2.latitude)
    console.log('This is my shop longitude: '+hardcodedMarker2.latitude)

    const manhattanDistance = Math.abs(hardcodedMarker1.latitude-hardcodedMarker2.latitude) + Math.abs(hardcodedMarker1.longitude-hardcodedMarker2.longitude);

    console.log('(Manhattan) The places are '+manhattanDistance+' metres away')

    const R = 6371e3; // metres
    const latitude1 = hardcodedMarker1.latitude * Math.PI/180; // φ, λ in radians
    const latitude2 = hardcodedMarker2.latitude * Math.PI/180;
    const diffLat = (hardcodedMarker2.latitude-hardcodedMarker1.latitude) * Math.PI/180;
    const diffLon = (hardcodedMarker2.longitude-hardcodedMarker1.longitude) * Math.PI/180;

    const aa = Math.sin(diffLat/2) * Math.sin(diffLat/2) +
        Math.cos(latitude1) * Math.cos(latitude2) *
        Math.sin(diffLon/2) * Math.sin(diffLon/2);
    const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));

    const distance = parseInt(R * cc); // in metresv

    console.log('(Eucledian Second Method)The places are '+distance+' metres away')
  };


  Geolocation.getCurrentPosition(
      (position) => {
        const currentLongitude =
            position.coords.longitude;
        const currentLatitude =
            position.coords.latitude;
        setCurrentLatitude(currentLatitude);
        setCurrentLongitude(currentLongitude);

      }, (error) => alert(error.message), {
        enableHighAccuracy: true
      }
  );

  const hardcodedMapArea = { //this corresponds to the bush house area
    latitude: 51.5140310233705,
    longitude: -0.1164075624320158,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const currentArea = {
    latitude: currentLatitude,
    longitude: currentLongitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const hardcodedMarker1={ //this corresponds to the bush house area
    latitude: 51.5140310233705,
    longitude: -0.1164075624320158,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const hardcodedMarker2={ //this corresponds to the bush house area
    latitude: 51.51143534301982,
    longitude: -0.11969058630179567,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const currentLocationMarker = {//this corresponds rn to the current location but should be a shop marker
    latitude: currentLatitude,
    longitude: currentLongitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const locationPress = () => {
    console.log('Function will be hre!!');
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentArea}
      >
        <MapView.Marker
          coordinate={currentLocationMarker}
          pinColor={'#fefefe'}
          title={'hey there fellas'}
          description={'Test market'}
          onPress={locationPress}
        />
      </MapView>
      <View>
        <Pressable onPress={calculateDistance}>
          <Text style={{fontFamily: 'Poppins-SemiBold',
            letterSpacing: 0.5,
            fontSize: 40,
          backgroundColor:'red'}}>Calculate distance </Text>
        </Pressable>
      </View>
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
