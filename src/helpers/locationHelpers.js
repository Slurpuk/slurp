import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Alerts} from '../data/Alerts';
import {fadeOpacityIn, fadeOpacityOut} from '../sub-components/Animations';
import {updateUserLocation} from '../firebase/queries';

/**
 * Used when a shop marker is pressed. Center the map around the marker and
 * drag the corresponding shop's intro up with a fading animation.
 * @param context
 * @param mapCenter The current center point of the map
 * @param clickedMarker
 */
export const locationPress = async (context, mapCenter, clickedMarker) => {
  //map the clicked marker to a shop from the shops on firebase
  let selectedShop = context.shopsData.find(
    shop => shop.Name === clickedMarker,
  );

  //update the map center to preserve the map position after rerender
  let old = mapCenter.current;
  mapCenter.current = {
    latitude: selectedShop.Location.latitude,
    longitude: selectedShop.Location.longitude,
    latitudeDelta: old.latitudeDelta,
    longitudeDelta: old.longitudeDelta,
  };

  //if there is a current shop intro, fade it out in anticipation of the new one
  if (context.bottomSheet.isOpen) {
    fadeOpacityOut(context.adaptiveOpacity, 170);
    //after the fade out has completed, change the bottom sheet data to the new shop
    let myTimeout = setTimeout(async () => {
      await context.changeShop(selectedShop);
      clearTimeout(myTimeout);
    }, 200);
    //fade in the new shop after the switch is completed
    setTimeout(() => {
      fadeOpacityIn(context.adaptiveOpacity, 200);
    }, 210);
  } else {
    await context.changeShop(selectedShop);
  }
};

/**
 * Retrieve the current user's location and set the map center to it.
 * @param mapCenter The current center point of the map
 */
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

/**
 * Track the current user's location. Update it in the backend ans set the map center accordingly.
 * @param userRef The id of the current user
 * @param mapCenter The current center point of the map
 * @param watchID The watchID for tracking the user's position
 */
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

/**
 * Platform dependant request for location access.
 * @param userRef The id of the current user
 * @param mapCenter The current center point of the map
 * @param watchID The watchID for tracking the user's position
 * @param setIsLocationIsEnabled update the location permission
 */
export const requestLocationPermission = async (
  userRef,
  mapCenter,
  watchID,
  setIsLocationIsEnabled,
) => {
  if (Platform.OS === 'ios') {
    setIsLocationIsEnabled(true);
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
        setIsLocationIsEnabled(true);
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