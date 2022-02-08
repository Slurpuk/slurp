import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createDrawerNavigator} from '@react-navigation/drawer';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={({navigation}) => ({
        drawerPosition: 'right',
        header: () => (
          <SafeAreaProvider style={styles.header}>
            <View style={styles.floating_button}>
              <Pressable
                style={styles.bars_button}
                onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={30} color={'#046D66'} />
              </Pressable>
            </View>
          </SafeAreaProvider>
        ),
      })}>
      <Drawer.Screen name="Map" component={thisScreen} />
      <Drawer.Screen name="Hi" component={thisScreen} />
    </Drawer.Navigator>
  );
}

function thisScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    padding: '5%',
  },
  floating_button: {
    borderRadius: 100,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
  bars_button: {
    backgroundColor: '#ffffff',
    padding: '4%',
    borderRadius: 11,
  },
});

export default function SlideBar() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
