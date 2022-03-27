import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
import { Alerts } from "../../data/Alerts";
import {fadeOpacityIn, fadeOpacityOut} from '../../sub-components/Animations';

//used for when a new location is pressed on the map
export const locationPress = (context, mapCenter, clickedMarker) => {
    //map the clicked marker to a shop from the shops on firebase
  let selectedShop = context.shopsData.find(
    shop => shop.Name === clickedMarker,
  );

  //if there is a current shop intro, fade it out in ancicipation of the new one
  if (context.isShopIntro) {
    fadeOpacityOut(context.adaptiveOpacity, 170);

    //after the fade out has completed, change the bottom sheet data to the new shop
    let myTimeout = setTimeout(() => {
      context.setCurrentCenterLocation({
        latitude: selectedShop.Location._latitude,
        longitude: selectedShop.Location._longitude,
      });
      //update the map center to preserve the map position after rerender
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

    //fade in the new shop after the switch is completed
    setTimeout(() => {
      fadeOpacityIn(context.adaptiveOpacity, 200);
    }, 210);
  } else {
      //if there is no selected shop, make this the current one
    context.setCurrentCenterLocation({
      latitude: selectedShop.Location._latitude,
      longitude: selectedShop.Location._longitude,
    });
    let previousShop = mapCenter.current;
    mapCenter.current = {
      latitude: selectedShop.Location._latitude,
      longitude: selectedShop.Location._longitude,
      latitudeDelta: previousShop.latitudeDelta,
      longitudeDelta: previousShop.longitudeDelta,
    };
    context.switchShop(selectedShop);
    context.setShopIntro(true);
  }
};
//get the user's location one time. Used on app load
export const getOneTimeLocation = (context, mapCenter) => {
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
      // Setting new current location
      context.setCurrentCenterLocation({
        latitude: latitude,
        longitude: longitude,
      });
    },
    error => alert(error),
    {
      enableHighAccuracy: true,
      timeout: 30000,
    },
  );
};

//watch the current location
const subscribeLocationLocation = (context, mapCenter, watchID) => {
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
      context.setCurrentCenterLocation({
        latitude: latitude,
        longitude: longitude,
      });
      if (context.userRef) {
        await firestore()
          .collection('Users')
          .doc(context.userRef)
          .update({
            latitude: latitude,
            longitude: longitude,
          })
          .then(r => alert('position updated'))
          .catch(error => alert(error));
      }
    },
    error => alert(error),
    {
      enableHighAccuracy: true,
    },
  );
};

//platform dependant request for location access
export const requestLocationPermission = async (
  context,
  mapCenter,
  watchID,
) => {
  if (Platform.OS === 'ios') {
    context.setCurrentCenterLocation(() => ({isDefault: false}));
    getOneTimeLocation(context, mapCenter);
    subscribeLocationLocation(context, mapCenter, watchID);
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
        // To Check, If Permission is granted
        context.setCurrentCenterLocation(() => ({isDefault: false}));
        getOneTimeLocation(context, mapCenter);
        subscribeLocationLocation(context, mapCenter, watchID);
      }
    } catch (err) {
      if (err === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    }
  }
};
