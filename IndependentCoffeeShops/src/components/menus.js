import React, { Component } from "react";
import { View, FlatList, StyleSheet, Text, Dimensions, Animated, TouchableOpacity } from "react-native";
import MenuList from "./MenuList";

export default function PrimaryButton(props) {
  const {text} = props;
  return <View>
      <MenuList/>
      <MenuList/>
      <MenuList/>
    </View>
  );
}


