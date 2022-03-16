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
import textStyles from '../../../stylesheets/textStyles';
import CoffeeBeanSvg from '../../assets/svgs/CoffeeBeanSvg';
import CustomMapIcon from '../../assets/svgs/CustomMapIcon';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
let watchID;

export default function MapBackground({sheetRef}) {
  const [currentLongitude, setCurrentLongitude] = useState(0);
  const [currentLatitude, setCurrentLatitude] = useState(0);
  const [currentLocation, setCurrentLocation] = useState();

  const [markers, setMarkers] = useState([]);

  const [shopsData, setShopsData] = useState([]);
  const context = useContext(GlobalContext);

  console.log('map background rerendered');

  useEffect(() => {
    const editedShopsData = shopsData.map(item => {
      return {
        name: item.Name,
        description: item.Intro,
        latitude: item.Location._latitude,
        longitude: item.Location._longitude,
        image: item.Image,
        isOpen: item.IsOpen,
      };
    });

    const finalShopsData = editedShopsData
      .map(item => {
        return {
          name: item.name,
          description: item.description,
          image: item.image,
          latitude: item.latitude,
          longitude: item.longitude,
          d: calculateDistance(item),
          isOpen: item.isOpen,
        };
      })
      .filter(item => item.d < 20000)
      .sort((a, b) => {
        return a.d < b.d;
      });

    setMarkers(
      finalShopsData.map(item => {
        return {
          name: item.name,
          description: item.description,
          image: item.image,
          coords: {latitude: item.latitude, longitude: item.longitude},
          isOpen: item.isOpen,
        };
      }),
    );
  }, [calculateDistance, shopsData]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const calculateDistance = coords => {
    //TODO change defaultLocation for currentLocation (currentLatitude and currentLongitude)

    const R = 6371e3; // metres
    const latitude1 = (defaultLocation.latitude * Math.PI) / 180; // φ, λ in radians
    const latitude2 = (coords.latitude * Math.PI) / 180;
    const diffLat =
      ((coords.latitude - defaultLocation.latitude) * Math.PI) / 180;
    const diffLon =
      ((coords.longitude - defaultLocation.longitude) * Math.PI) / 180;

    const aa =
      Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
      Math.cos(latitude1) *
        Math.cos(latitude2) *
        Math.sin(diffLon / 2) *
        Math.sin(diffLon / 2);
    const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa));

    const distance = parseInt(R * cc); // in metres

    return distance;
  };

  //hard-coded markers for the purposes of testing
  //TODO remove these when currentLocation is actually used
  const defaultLocation = {
    latitude: 51.54817999763736,
    longitude: -0.30673900193854804,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const bushHouse = {
    //this corresponds to the bush house area = default area
    latitude: 51.5140310233705,
    longitude: -0.1164075624320158,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  let shopLocation = {
    latitude: context.currentCenterLocation.latitude,
    longitude: context.currentCenterLocation.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(() => {
    const temp = context.shopsData;
    setShopsData(temp);
  }, [context.shopsData]);

  const locationPress = clickedMarker => {
    console.log('Marker function triggered');

    //TODO takes you to the shop
    // context.setShopIntro(true);
    console.log('clicked marker shop:', clickedMarker);
    let selectedShop = shopsData.find(shop => shop.Name === clickedMarker);
    console.log('selected shop', selectedShop.Name);

    //shrink
    // if (sheetRef.current) {
    //   console.log(sheetRef);
    //   // sheetRef.current.snapTo(2);
    // }

    fadeOpacityOut(context.adaptiveOpacity, 170);

    let myTimeout = setTimeout(() => {
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

    //switch while hidden

    //show again
    context.setShopIntro(true);

    console.log(selectedShop);

    console.log('shopsData: ', context.shopsData);
  };

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
          } else {
            //set a default location for the user to explore the app
            setCurrentLongitude(context.currentCenterLocation.longitude);
            setCurrentLatitude(context.currentCenterLocation.latitude);
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
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
        const currentLongitude = position.coords.longitude;
        const currentLatitude = position.coords.latitude;
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
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
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={shopLocation}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coords}
            pinColor={'navy'}
            // title={marker.name}
            // description={marker.description}
            onPress={() => {
              if (marker.isOpen) {
                locationPress(marker.name);
              }
            }}>
            <View style={styles.markerStyle}>
              <Text
                style={[
                  textStyles.bluePoppinsSubHeading,
                  styles.markerBg,
                  marker.isOpen
                    ? {color: 'black'}
                    : [{color: 'grey'}, textStyles.lightGreyPoppins],
                ]}>
                {marker.name}

                {marker.isOpen ? (
                  <Text style={textStyles.lightGreyPoppins}> -Open</Text>
                ) : (
                  <Text>-Closed</Text>
                )}
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
    // alignItems: 'center',
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
