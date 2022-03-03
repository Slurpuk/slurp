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
import CustomButton from "../../sub-components/CustomButton";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function MapBackground() {
  const [cLatitude, setcLatitude] = useState(0);
  const [cLongitude, setcLongitude] = useState(0);
  const [clatitudeDelta, setcLatitudeDelta] = useState(0);
  const [clongitudeDelta, setcLongitudeDelta] = useState(0);
  // const [coordinates, setCoordinates] = useState([0]);

  // const coordinatesMaker = () => {
  //
  // }

  const calculateDistance = () => {
    console.log('This is my current latitude: '+cLatitude)
    console.log('This is my current longitude: '+cLongitude)
    console.log('This is my hardcoded latitude: '+currentArea.latitude)
    console.log('This is my hardcoded longitude: '+currentArea.longitude)
  };

  /*GetLocation.getCurrentPosition({
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
    });*/

  Geolocation.getCurrentPosition(
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude =
            position.coords.longitude;

        //getting the Latitude from the location json
        const currentLatitude =
            position.coords.latitude;
        setcLatitude(currentLatitude);
        setcLongitude(currentLongitude);

      }, (error) => alert(error.message), {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
      }
  );

  const hardcodedMapArea = {
    latitude: 51.5140310233705,
    longitude: -0.1164075624320158,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const currentArea = {
    latitude: cLatitude,
    longitude: cLongitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const hardcodedMarker={
    latitude: 51.5140310233705,
    longitude: -0.1164075624320158,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const currentLocationMarker = {
    latitude: cLatitude,
    longitude: cLongitude,
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
