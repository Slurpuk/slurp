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
  const [clatitude, setcLatitude] = useState(0);
  const [clongitude, setcLongitude] = useState(0);
  const [clatitudeDelta, setcLatitudeDelta] = useState(0);
  const [clongitudeDelta, setcLongitudeDelta] = useState(0);
  // const [coordinates, setCoordinates] = useState([0]);

  // const coordinatesMaker = () => {
  //
  // }

  const calculateDistance = () => {
      console.log('Hello')
    console.log(clatitude)
    console.log(clongitude)
    console.log(GetLocation.getCurrentPosition())
  };

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

  const bushHouse = {
    latitude: 51.5140310233705,
    longitude: -0.1164075624320158,
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
        region={bushHouse}
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
