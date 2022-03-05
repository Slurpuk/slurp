import React, {useState, useEffect} from 'react';

import {
    Alert,
    Button,
    Dimensions,
    Platform, Pressable,
    StyleSheet,
    Text,
    View,
    PermissionsAndroid,
} from 'react-native';
//import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location';
import textStyles from "../../../stylesheets/textStyles";
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
let watchID;
export default function MapBackground() {
    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState(0);
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState(0);

    const [
        latitude,
        setLatitude
    ] = useState(0);

    const [
        longitude,
        setLongitude
    ] = useState(0);

    const [shopsData, setShopsData] = useState([]);

    const showShopsNearby = () => {

        console.log(shopsData)

        const editedShopsData = shopsData.map((item) => {
            return {
                latitude: item.Location._latitude,
                longitude: item.Location._longitude,
            }
        });

        console.log(editedShopsData);

        const finalShopsData = editedShopsData.map((item) => {
            return {
                latitude: item.latitude,
                longitude: item.longitude,
                d: calculateDistance(item),
            }
        }).sort((a, b) => (a.d > b.d) ? 1 : -1)
            .filter((item) => item.d > 2000)

        console.log(finalShopsData);

        // + display places on the map using markers
    };

    //TODO print out the names of the sorted shops

    const calculateDistance = (coords) => {


        //console.log('This is the user latitude: '+currentLatitude)
        //console.log('This is  the user longitude: '+currentLongitude)
        console.log('This is my current latitude: '+defaultLocation.latitude)
        console.log('This is my current longitude: '+defaultLocation.longitude)
        console.log("this is ")
        console.log(coords)

        console.log('This is the shop latitude: '+coords.latitude)
        console.log('This is the shop longitude: '+coords.longitude)

        const R = 6371e3; // metres
        const latitude1 = defaultLocation.latitude * Math.PI/180; // φ, λ in radians
        const latitude2 = coords.latitude * Math.PI/180;
        const diffLat = (coords.latitude-defaultLocation.latitude) * Math.PI/180;
        const diffLon = (coords.longitude-defaultLocation.longitude) * Math.PI/180;

        const aa = Math.sin(diffLat/2) * Math.sin(diffLat/2) +
            Math.cos(latitude1) * Math.cos(latitude2) *
            Math.sin(diffLon/2) * Math.sin(diffLon/2);
        const cc = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));

        const distance = parseInt(R * cc); // in metres

        console.log('(Eucledian Second Method)The places are '+distance+' metres away')
        return distance;
    };

    const defaultLocation = {
        latitude: 37.335480,
        longitude: -121.893028,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    };

    const hardcodedMapArea = { //this corresponds to the bush house area
        latitude: 51.5140310233705,
        longitude: -0.1164075624320158,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const currentArea = {
        latitude: currentLatitude,
        longitude: currentLongitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const bushHouse={ //this corresponds to the bush house area
        latitude: 51.5140310233705,
        longitude: -0.1164075624320158,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const ourPalace={ //this corresponds to the queen palace
        latitude: 51.495741653990926,
        longitude: -0.14553530781225651,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    const hardcodedMarker2={ //this corresponds to the bush house area
        latitude: 51.51143534301982,
        longitude: -0.11969058630179567,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,

    };

    // this.state = {
    //   markers: [{
    //     title: 'bush',
    //     coordinates: {
    //       latitude: 51.5140310233705,
    //       longitude: -0.1164075624320158
    //     },
    //   },
    //     {
    //       title: 'hihi',
    //       coordinates: {
    //         latitude: 51.51143534301982,
    //         longitude: -0.11969058630179567
    //       },
    //     }]
    // }

    useEffect(() => {
        const subscriber = firestore()
            .collection('CoffeeShop')
            .onSnapshot(querySnapshot => {
                const shops = [];

                querySnapshot.forEach(documentSnapshot => {
                    shops.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setShopsData(shops);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();
    }, []);


    const setLoc = (latitude, longitude) => {
        setLatitude(latitude)
        setLongitude(longitude)
    };

    const currentLocationMarker = {//this corresponds rn to the current location but should be a shop marker
        latitude: currentLatitude,
        longitude: currentLongitude,
    };

    const locationPress = () => {
        console.log('Function will be hre!!');
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
                        setCurrentLongitude(defaultLocation.longitude);
                        setCurrentLatitude(defaultLocation.latitude);
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
            (position) => {
                const currentLongitude =
                    position.coords.longitude;
                const currentLatitude =
                    position.coords.latitude;
                //Setting Longitude state
                setCurrentLongitude(currentLongitude);
                //Setting Longitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
               // maximumAge: 1000
            },
        );
    };

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change
                const currentLongitude =
                    position.coords.longitude;
                const currentLatitude =
                    position.coords.latitude;
                //Setting Longitude state
                setCurrentLongitude(currentLongitude);
                //Setting Latitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                region={currentArea}
            >
                <MapView.Marker
                    coordinate={currentLocationMarker}
                    pinColor={'#fefefe'}
                    title={'hey there fellas'}
                    description={'Test market'}
                    onPress={locationPress}
                />
            </MapView>
            <View>
                <Pressable onPress={showShopsNearby}>
                    <Text style={{fontFamily: 'Poppins-SemiBold',
                        letterSpacing: 0.5,
                        fontSize: 40,
                        backgroundColor:'red'}}>Show shops nearby </Text>
                </Pressable>
            </View>
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
    marker: {},
});