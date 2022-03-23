import {PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import firestore from '@react-native-firebase/firestore';
import {fadeOpacityIn, fadeOpacityOut} from '../../sub-components/Animations';

export const locationPress = (context, mapCenter, clickedMarker) => {
  let selectedShop = context.shopsData.find(
    shop => shop.Name === clickedMarker,
  );

  if (context.isShopIntro) {
    fadeOpacityOut(context.adaptiveOpacity, 170);

    let myTimeout = setTimeout(() => {
      context.setCurrentCenterLocation({
        latitude: selectedShop.Location._latitude,
        longitude: selectedShop.Location._longitude,
      });
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

    setTimeout(() => {
      fadeOpacityIn(context.adaptiveOpacity, 200);
    }, 210);
  } else {
    context.setCurrentCenterLocation({
      latitude: selectedShop.Location._latitude,
      longitude: selectedShop.Location._longitude,
    });
    let old = mapCenter.current;
    mapCenter.current = {
      latitude: selectedShop.Location._latitude,
      longitude: selectedShop.Location._longitude,
      latitudeDelta: old.latitudeDelta,
      longitudeDelta: old.longitudeDelta,
    };
    context.switchShop(selectedShop);
    context.setShopIntro(true);
  }
};

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
    error => console.log(error),
    {
      enableHighAccuracy: true,
      timeout: 30000,
    },
  );
};

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
          .then(r => console.log('position updated'))
          .catch(error => console.log(error));
      }
    },
    error => console.log(error),
    {
      enableHighAccuracy: true,
    },
  );
};

export const requestLocationPermission = async (
  context,
  mapCenter,
  watchID,
) => {
  if (Platform.OS === 'ios') {
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
        //To Check, If Permission is granted
        getOneTimeLocation(context, mapCenter);
        subscribeLocationLocation(context, mapCenter, watchID);
      }
    } catch (err) {
      console.warn(err);
    }
  }
};
