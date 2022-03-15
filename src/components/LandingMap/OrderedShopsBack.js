import React, {useState, useEffect, useContext} from 'react';

import {
  Alert,
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import {GlobalContext} from '../../../App';

const [currentLongitude, setCurrentLongitude] = useState(0);
const [currentLatitude, setCurrentLatitude] = useState(0);
const [currentLocation, setCurrentLocation] = useState();

const [shopsData, setShopsData] = useState([]);
const [orderedShops, setOrderedShops] = useState([]);


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

useEffect(() => {
  const editedShopsData = shopsData.map(item => {
    return {
      name: item.Name,
      description: item.Intro,
      latitude: item.Location._latitude,
      longitude: item.Location._longitude,
      image: item.Image,
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
      };
    })
    .filter(item => item.d < 20000)
    .sort((a, b) => {
      return a.d < b.d;
    });
