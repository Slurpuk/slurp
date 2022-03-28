import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Alerts} from '../../data/Alerts';
import {fadeOpacityIn, fadeOpacityOut} from '../../sub-components/Animations';
import {updateUserLocation} from '../../firebase/queries';

//used for when a new location is pressed on the map
export const locationPress = (context, mapCenter, clickedMarker) => {
  //map the clicked marker to a shop from the shops on firebase
  let selectedShop = context.shopsData.find(
    shop => shop.Name === clickedMarker,
  );

  //update the map center to preserve the map position after rerender
  let old = mapCenter.current;
  mapCenter.current = {
    latitude: selectedShop.Location._latitude,
    longitude: selectedShop.Location._longitude,
    latitudeDelta: old.latitudeDelta,
    longitudeDelta: old.longitudeDelta,
  };

  //if there is a current shop intro, fade it out in anticipation of the new one
  if (context.isShopIntro) {
    fadeOpacityOut(context.adaptiveOpacity, 170);
    //after the fade out has completed, change the bottom sheet data to the new shop
    let myTimeout = setTimeout(async () => {
      context.changeShop(false, selectedShop);
      clearTimeout(myTimeout);
    }, 200);
    //fade in the new shop after the switch is completed
    setTimeout(() => {
      fadeOpacityIn(context.adaptiveOpacity, 200);
    }, 210);
  } else {
    context.changeShop(false, selectedShop);
  }
};

//get the user's location one time. Used on app load
const getOneTimeLocation = mapCenter => {
  Geolocation.getCurrentPosition(
    //Will give you the current location
    position => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      let old = mapCenter.current;
      mapCenter.current = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: old.latitudeDelta,
        longitudeDelta: old.longitudeDelta,
      };
    },
    error => {
      Alerts.LocationAlert();
    },
    {
      enableHighAccuracy: true,
      timeout: 30000,
    },
  );
};

//watch the current location
const subscribeLocationLocation = (mapCenter, watchID, userRef) => {
  watchID.current = Geolocation.watchPosition(
    async position => {
      //Will give you the location on location change
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      //Setting Longitude state
      let old = mapCenter.current;
      mapCenter.current = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: old.latitudeDelta,
        longitudeDelta: old.longitudeDelta,
      };
      if (userRef) {
        updateUserLocation(userRef, latitude, longitude).catch(error => {
          console.log(error);
          Alerts.elseAlert();
        });
      }
    },
    error => {
      Alerts.LocationAlert();
    },
    {
      enableHighAccuracy: true,
    },
  );
};

//platform dependant request for location access
export const requestLocationPermission = async (
  userRef,
  mapCenter,
  watchID,
) => {
  if (Platform.OS === 'ios') {
    getOneTimeLocation(mapCenter);
    subscribeLocationLocation(mapCenter, watchID, userRef);
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
        getOneTimeLocation(mapCenter);
        subscribeLocationLocation(mapCenter, watchID, userRef);
      }
    } catch (err) {
      if (err === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.LocationAlert();
      }
    }
  }
};
