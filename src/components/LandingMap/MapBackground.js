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
import {Marker} from 'react-native-maps';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function MapBackground() {

    const tokyoRegion = {
        latitude: 35.6762,
        longitude: 139.6503,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const locationPress = () => {
        console.log("Function will be here!!")
    }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={tokyoRegion}
      >
          <MapView.Marker coordinate={tokyoRegion}
                          pinColor = {'#fefefe'}
                          title={"hey there fellas"}
                          description={'Test market'}
                          onPress = {locationPress}
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
    marker:{

    },
});
