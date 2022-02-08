import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableHighlight,
} from 'react-native';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Close from 'react-native-vector-icons/AntDesign';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Close.Button
        onPress={() => props.navigation.closeDrawer()}
        name="close"
        color={'#173C4F'}
        underlayColor={'transparent'}
        backgroundColor={'transparent'}
        size={25}
        style={styles.close_button}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        drawerPosition: 'right',
        header: () => (
          <View style={styles.header}>
            <TouchableHighlight style={styles.floating_button}>
              <Icon.Button
                onPress={() => navigation.openDrawer()}
                name="bars"
                color={'#046D66'}
                underlayColor={'transparent'}
                backgroundColor={'transparent'}
                size={25}
              />
            </TouchableHighlight>
          </View>
        ),
      })}>
      <Drawer.Screen
        name="View order history"
        component={thisScreen}
      />
      <Drawer.Screen
        name="Payment accounts"
        component={thisScreen}
      />
      <Drawer.Screen
        name="Change name"
        component={thisScreen}
      />
      <Drawer.Screen
        name="Change password"
        component={thisScreen}
      />
      <Drawer.Screen
        name="Logout the device"
        component={thisScreen}
      />
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
    backgroundColor: '#ffffff',
    padding: '2%',
    borderRadius: 11,
  },
  close_button: {
    alignSelf: 'flex-end',
  },
  drawer_item: {
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderColor: '#000000',
  },
});

export default function SlideBar() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
