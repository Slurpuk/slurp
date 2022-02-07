import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

function thisScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>We can put here the map</Text>
    </View>
  );
}
const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
      }}
    >
      <Drawer.Screen name="Map" component={thisScreen} />
    </Drawer.Navigator>
  );
}

export default function SlideBar() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
