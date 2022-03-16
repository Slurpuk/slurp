import React, {useState, useEffect, useContext, useRef} from 'react';

import {
  Alert,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  Animated,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GlobalContext} from '../../../App';
import {fadeOpacityIn, fadeOpacityOut} from '../../sub-components/Animations';
import CustomMapIcon from '../../assets/svgs/CustomMapIcon';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
export default function MapBackground({sheetRef}) {
  const context = useContext(GlobalContext);

  const [mapCenter, setMapCenter] = useState({
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
        setMapCenter(prevState => ({
          latitude: selectedShop.Location._latitude,
          longitude: selectedShop.Location._longitude,
          latitudeDelta: prevState.latitudeDelta,
          longitudeDelta: prevState.longitudeDelta,
        }));
        context.setCurrentCenterLocation({
          latitude: selectedShop.Location._latitude,
          longitude: selectedShop.Location._longitude,
        });
        context.switchShop(selectedShop);
        clearTimeout(myTimeout);
      }, 200);

      setTimeout(() => {
        fadeOpacityIn(context.adaptiveOpacity, 200);
      }, 210);
    } else {
      setMapCenter(prevState => ({
        latitude: selectedShop.Location._latitude,
        longitude: selectedShop.Location._longitude,
        latitudeDelta: prevState.latitudeDelta,
        longitudeDelta: prevState.longitudeDelta,
      }));
      context.setCurrentCenterLocation({
        latitude: selectedShop.Location._latitude,
        longitude: selectedShop.Location._longitude,
      });
      context.switchShop(selectedShop);
      context.setShopIntro(true);
    }
  };
  const screenWidth = Dimensions.get('window').width;

  let watchID;

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //To Check, If Permission is granted
            getOneTimeLocation();
            subscribeLocationLocation();
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission().then(r => console.log('permission granted'));
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        setMapCenter(prevState => ({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: prevState.latitudeDelta,
          longitudeDelta: prevState.longitudeDelta,
        }));
        //Setting new current location
        context.setCurrentCenterLocation({
          latitude: latitude,
          longitude: longitude,
        });
      },
      error => {},
      {
        enableHighAccuracy: true,
        timeout: 30000,
      },
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        //Setting Longitude state
        setMapCenter(prevState => ({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: prevState.latitudeDelta,
          longitudeDelta: prevState.longitudeDelta,
        }));
        context.setCurrentCenterLocation({
          latitude: latitude,
          longitude: longitude,
        });
      },
      error => {},
      {
        enableHighAccuracy: true,
      },
    );
  };

  return (
    <View style={styles.container}>
      <MapView
        onRegionChangeComplete={(region, isGesture: false) =>
          setMapCenter(region)
        }
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={mapCenter}>
        {context.markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coords}
            pinColor={'navy'}
            title={marker.name}
            onPress={() => {
              if (marker.isOpen) {
                locationPress(marker.name);
              }
            }}>
            <View style={styles.markerStyle}>
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
