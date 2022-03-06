import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Close from 'react-native-vector-icons/AntDesign';
import getUserInfo from '../../firebase/queries/getUserInfo';
import BasketPage from "../../screens/BasketPage";

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
      <DrawerItem
        label="View order history"
        onPress={() => props.navigation.navigate('View order history')}
        activeTintColor="#2196f3"
        activeBackgroundColor="rgba(0, 0, 0, .04)"
        inactiveTintColor="rgba(0, 0, 0, .87)"
        inactiveBackgroundColor="transparent"
        style={styles.drawer_item}
        labelStyle={styles.drawer_item_label}
      />
      <DrawerItem
        label="Payment accounts"
        onPress={() => props.navigation.navigate('Payment accounts')}
        activeTintColor="#2196f3"
        activeBackgroundColor="rgba(0, 0, 0, .04)"
        inactiveTintColor="rgba(0, 0, 0, .87)"
        inactiveBackgroundColor="transparent"
        style={styles.drawer_item}
        labelStyle={styles.drawer_item_label}
      />
      <DrawerItem
        label="Change name"
        onPress={() => props.navigation.navigate('Change name')}
        activeTintColor="#2196f3"
        activeBackgroundColor="rgba(0, 0, 0, .04)"
        inactiveTintColor="rgba(0, 0, 0, .87)"
        inactiveBackgroundColor="transparent"
        style={styles.drawer_item}
        labelStyle={styles.drawer_item_label}
      />
      <DrawerItem
        label="Change password"
        onPress={() => props.navigation.navigate('Change password')}
        activeTintColor="#2196f3"
        activeBackgroundColor="rgba(0, 0, 0, .04)"
        inactiveTintColor="rgba(0, 0, 0, .87)"
        inactiveBackgroundColor="transparent"
        style={styles.drawer_item}
        labelStyle={styles.drawer_item_label}
      />
      <DrawerItem
        label="Logout the device"
        onPress={() => props.navigation.navigate('Logout the device')}
        activeTintColor="#2196f3"
        activeBackgroundColor="rgba(0, 0, 0, .04)"
        inactiveTintColor="rgba(0, 0, 0, .87)"
        inactiveBackgroundColor="transparent"
        style={styles.drawer_item}
        labelStyle={styles.drawer_item_label}
      />
        <DrawerItem
        label="View Basket"
        onPress={() => props.navigation.navigate('BasketPage')}
        activeTintColor="#2196f3"
        activeBackgroundColor="rgba(0, 0, 0, .04)"
        inactiveTintColor="rgba(0, 0, 0, .87)"
        inactiveBackgroundColor="transparent"
        style={styles.drawer_item}
        labelStyle={styles.drawer_item_label}
      />
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
      })}
    >
      <Drawer.Screen name="View order history" component={HomeScreen} />
      <Drawer.Screen name="Payment accounts" component={HomeScreen} />
      <Drawer.Screen name="Change name" component={HomeScreen} />
      <Drawer.Screen name="Change password" component={HomeScreen} />
      <Drawer.Screen name="Logout the device" component={HomeScreen} />
      <Drawer.Screen name="BasketPage" component={BasketPage} />
    </Drawer.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    ...Platform.select({
      ios: {
        marginTop: '10%',
      },
      android: {},
    }),
    display: 'flex',
    alignItems: 'flex-end',
    padding: '4%',
  },
  floating_button: {
    backgroundColor: '#ffffff',
    paddingVertical: '1.8%',
    borderRadius: 11,
    alignContent: 'center',
    paddingLeft: '2.5%',
  },
  drawer_item: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: '#CECECE',
  },
  close_button: {
    alignSelf: 'flex-end',
  },
  drawer_item_label: {
    color: '#173C4F',
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
});

export default function SlideBar() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
