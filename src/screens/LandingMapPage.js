import React, {createContext, useContext, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Button,
  LogBox,
  TextInput,
  StatusBar,
  Text,
  Pressable,
} from 'react-native';
import MapBackground from '../components/LandingMap/MapBackground';
import firestore from '@react-native-firebase/firestore';
import {VisibleContext} from '../navigation/HamburgerSlideBarNavigator';
import {useFocusEffect} from '@react-navigation/native';
import DraggableShopList from '../components/Shops/DraggableShopList';
import ShopPage from './ShopPage';
import {GlobalContext} from '../../App';
import CustomSearchBar from '../components/LandingMap/CustomSearchBar';
import LandingHamburgerIcon from '../assets/svgs/LandingHamburgerIcon';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export const searchBarContext = React.createContext(false);

export default function LandingMapPage({navigation}) {
  const setHamburgerVisible = useContext(VisibleContext);
  const context = useContext(GlobalContext);

  const [searchBarFocused, setSearchBarFocused] = useState(false);

  const bottomSheetRef = useRef(null);

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
        <MapBackground
          searchBarFocused={searchBarFocused}
          setSearchBarFocussed={setSearchBarFocused}
        />

        <View style={styles.searchWrapper}>
          <View style={styles.newHamburger}>
            <LandingHamburgerIcon />
          </View>
          <CustomSearchBar
            navigation={navigation}
            searchBarFocused={searchBarFocused}
            setSearchBarFocussed={setSearchBarFocused}
          />
        </View>
      </View>

      {context.isShopIntro ? (
        <ShopPage navigation={navigation} sheetRef={bottomSheetRef} />
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
    display: 'flex',
  },

  searchWrapper: {
    // borderWidth: 3,
    // backgroundColor: 'coral',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    top: screenHeight * 0.07,
  },

  newHamburger: {
    width: 0.07 * screenHeight,
    height: 0.07 * screenHeight,
    backgroundColor: 'whitesmoke',
    marginLeft: '3%',
    borderRadius: 14,
    borderColor: '#046D66',
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    borderRadius: 10,
    // marginTop: '15%',
    // margin: '5%',
    color: '#000',
    borderColor: '#666',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: screenHeight / 19,
    width: screenWidth / 1.4,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  inputContainerStyle: {
    backgroundColor: 'yellow',
  },
});
