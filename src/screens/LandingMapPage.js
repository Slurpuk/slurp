import React, {useContext} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Button,
  LogBox,
  TextInput,
  StatusBar,
} from 'react-native';
import MapBackground from '../components/LandingMap/MapBackground';
import firestore from '@react-native-firebase/firestore';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import {useFocusEffect} from '@react-navigation/native';
import DraggableShopList from '../components/Shops/DraggableShopList';
import ShopPage from './ShopPage';
import {GlobalContext} from '../../App';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function LandingMapPage({navigation}) {
  const setHamburgerVisible = useContext(VisibleContext);
  const context = useContext(GlobalContext);

  useFocusEffect(
    React.useCallback(() => {
      setHamburgerVisible(true);

      return () => {
        setHamburgerVisible(false);
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.map}>
        <MapBackground />
        <TextInput
          style={styles.searchBar}
          placeholder={'Search Location'}
          placeholderTextColor={'#666'}
        />
        <Button title={'Switch bottom sheet'} onPress={context.setShopIntro} />
      </View>

      {context.isShopIntro ? (
        <ShopPage navigation={navigation} />
      ) : (
        <DraggableShopList navigation={navigation} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    borderRadius: 10,
    marginTop: '15%',
    margin: '5%',
    color: '#000',
    borderColor: '#666',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: screenHeight / 19,
    width: screenWidth / 1.4,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
