import React from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Close from 'react-native-vector-icons/AntDesign';
import {StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';

function SideDrawerContent(props) {
  async function logout() {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e)
    }
  }
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
        label="View basket"
        onPress={() => props.navigation.navigate('Basket page')}
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
        label="Logout"
        onPress={() => logout()}
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

const styles = StyleSheet.create({
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

export default SideDrawerContent;
