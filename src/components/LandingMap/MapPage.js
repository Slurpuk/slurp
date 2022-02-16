import React from 'react';
import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function MapPage() {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
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
});
