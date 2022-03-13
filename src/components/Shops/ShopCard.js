import React, {useState, useContext, useEffect} from 'react';
import ShopDetailIcons from './ShopDetailIcons';
import {
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Platform,
  ImageBackground,
} from 'react-native';
import {GlobalContext} from '../../screens/LandingMapPage';
import {VisibleContext} from '../../navigation/HamburgerSlideBarNavigator';
import textStyles from '../../../stylesheets/textStyles';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
const ShopCard = ({shop, navigation}) => {
  const context = useContext(GlobalContext);
  const [isShopPage, setShopPage] = useState(false);
  const hamburgerVisible = useContext(VisibleContext);

  const shopPageDetails = () => {
    context.setCurrShop(shop);
    setShopPage(true);
  };

  useEffect(() => {
    if (isShopPage) {
      hamburgerVisible(false);
      setShopPage(false);
      context.setFull;
      navigation.navigate('Shop page', context);
    }
  }, [isShopPage]);

  return (
    <Pressable onPress={shopPageDetails}>
      <ImageBackground
        style={styles.item}
        imageStyle={styles.image}
        source={{uri: shop.Image}}
        resizeMode="cover"
      >
        <Text style={[textStyles.headingOne, styles.shopName]}>
          {shop.Name}
        </Text>
        <ShopDetailIcons likeness={shop.Likeness} timeToOrder={shop.Queue} />
      </ImageBackground>
    </Pressable>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  item: {
    overflow: 'hidden',
    width: screenWidth,
    height: screenWidth * 0.37,
    marginVertical: '1.8%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  shopName: {
    fontFamily: 'JosefinSans-Bold',
    color: 'white',
    fontWeight: '700',
    paddingBottom: '2%',
  },

  image: {
    position: 'absolute',
    width: screenWidth,
    height: screenWidth * 0.37,
    opacity: 0.7,
  },
});

export default ShopCard;
