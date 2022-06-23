import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Alerts} from '../data/Alerts';
import {fadeOpacityIn, fadeOpacityOut} from '../sub-components/Animations';
import {updateUserLocation} from '../firebase/queries';
import {GlobalAction, MapAction} from '../data/actionEnum';
import {changeShopFromMarker} from './changeShopHelpers';

/**
 * Used when a shop marker is pressed. Center the map around the marker and
 * drag the corresponding shop's intro up with a fading animation.
 * @param globalState
 * @param globalDispatch
 * @param mapDispatch
 * @param clickedMarker
 */
export const locationPress = async (
  globalState,
  globalDispatch,
  mapDispatch,
  clickedMarker,
) => {
  if (globalState.currentShop.name === clickedMarker) {
    return;
  }
  //map the clicked marker to a shop from the shops on firebase
  let selectedShop = globalState.listOfShops.find(
    shop => shop.name === clickedMarker,
  );
  //update the map center to preserve the map position after rerender
  mapDispatch({
    type: MapAction.SET_MAP_CENTER,
    location: {
      latitude: selectedShop.location.latitude,
      longitude: selectedShop.location.longitude,
    },
  });

  //if there is a current shop intro, fade it out in anticipation of the new one
  if (globalState.isShopIntro) {
    fadeOpacityOut(globalState.adaptiveOpacity, 170);
    //after the fade out has completed, change the bottom sheet data to the new shop
    let myTimeout = setTimeout(async () => {
      await changeShopFromMarker(globalState, selectedShop.key, globalDispatch);
      clearTimeout(myTimeout);
    }, 200);
    //fade in the new shop after the switch is completed
    setTimeout(() => {
      fadeOpacityIn(globalState.adaptiveOpacity, 200);
    }, 210);
  } else {
    await changeShopFromMarker(globalState, selectedShop.key, globalDispatch);
  }
};

/**
 * Track the current user's location. Update it in the backend ans set the map center accordingly.
 * @param mapDispatch
 * @param userRef The id of the current user
 * @param watchID The watchID for tracking the user's position
 * @param mapState
 */
const subscribeToLocation = (mapDispatch, watchID, userRef, mapState) => {
  watchID.current = Geolocation.watchPosition(
    async position => {
      //Will give you the location on location change
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      await updateUserLocation(userRef, latitude, longitude);
      if (mapState.isUserCentered) {
        mapDispatch({
          type: MapAction.SET_MAP_CENTER,
          location: {latitude: latitude, longitude: longitude},
        });
      }
    },
    error => {
      Alerts.elseAlert();
    },
    {
      enableHighAccuracy: true,
    },
  );
};

/**
 * Platform dependant request for location access.
 * @param userRef The id of the current user
 * @param watchID The watchID for tracking the user's position
 * @param globalDispatch
 * @param mapDispatch
 * @param mapState
 */
export const requestLocationPermission = async (
  userRef,
  watchID,
  globalDispatch,
  mapDispatch,
  mapState,
) => {
  if (Platform.OS === 'ios') {
    Geolocation.requestAuthorization('whenInUse').then(async () => {
      globalDispatch({type: GlobalAction.ENABLE_LOCATION});
      subscribeToLocation(mapDispatch, watchID, userRef);
    });
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
        globalDispatch({type: GlobalAction.ENABLE_LOCATION});
        subscribeToLocation(mapDispatch, watchID, userRef, mapState);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
