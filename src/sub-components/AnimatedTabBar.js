import * as React from 'react';
import {useState} from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import OrderPage from "../screens/OrderPage";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";


function PastOrders() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>PastOrder</Text>
        </View>
    );
}

function CurrentOrders() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>CurrentOrders</Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();
const CategoriesTabScreens = () => {
    return (
        <Tab.Navigator
            initialRouteName="Current"
            tabBarOptions={{
                indicatorStyle: {
                    height: Dimensions.get("window").height,
                    backgroundColor: "#046D66",
                },
                activeTintColor: "#fff",
                inactiveTintColor: "#E5E5E5",
            }}
            style={{paddingHorizontal: 24, marginTop: 121, borderRadius: 13, fontFamily: "Poppins"}}
        >
            <Tab.Screen name="Current" component={() => (<View style={{marginTop: 20, borderRadius: 13}}>
                <Text style={{fontFamily: "Poppins", color: '#046D66', letterSpacing: 0.01, fontSize: 17.4}}>Current</Text></View>)} />
            <Tab.Screen name="Past" component={() => (<View style={{marginTop: 20, borderRadius: 13}}>
                <Text style={{fontFamily:"Poppins", letterSpacing: 0.01, fontSize: 17.4}}>Past</Text></View>)} />
        </Tab.Navigator>
    );
};


export default function NavigationBarTest() {
    return (
        <NavigationContainer>
                <CategoriesTabScreens></CategoriesTabScreens>
        </NavigationContainer>
    );
}
