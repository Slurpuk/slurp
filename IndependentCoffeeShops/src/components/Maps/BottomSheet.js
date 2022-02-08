import React, {useState} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, Dimensions, Animated } from 'react-native'
import {ScrollView} from 'react-native-gesture-handler'

const {width, height} = Dimensions.get('screen');

export default function BottomAnimated(){

    const[alignment] = useState(new Animated.Value(0));

    const bringUpBottomSheet = () => {
        Animated.timing(alignment,{
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const hideBottomSheet = () => {
        Animated.timing(alignment,{
            toValue: 0,
            duration: 500,
            useNativeDriver: false,
        }).start();
    };

    const bottomSheetInterpolate = alignment.interpolate({
        inputRange: [0,1],
        outputRange: [-height / 2.4 + 50 ,0]
    });

    const bottomsheetStyle = {
        bottom: bottomSheetInterpolate
    };

    const gestureHandler = (e) => {
        if(e.nativeEvent.contentOffset.y > 0) bringUpBottomSheet();
        else if(e.nativeEvent.contentOffset.y < 0) hideBottomSheet();
    };

    return(
        <Animated.View style = {[styles.container, bottomsheetStyle]}>
            <ScrollView
                onScroll = {(e) => gestureHandler(e)}
                style = {styles.grabber}
            ></ScrollView>
            <Text>Top Nearby Location</Text>
        </Animated.View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EDE8D3',
        borderRadius: 30,
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: height / 2.4,
        //width: width / 1.05,
        // marginHorizontal: 10
    },
    grabber: {
        width: 60,
        borderTopWidth: 5,
        borderTopColor: '#1B947E',
        borderRadius: 2,
        alignSelf: 'center',
        padding: 10,
    }
})
