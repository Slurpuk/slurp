import React, {useState, useContext, useEffect} from 'react';
import ShopDetailIcons from './ShopDetailIcons';
import {
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import {SharedElement} from 'react-native-shared-element';
import {OptionsContext} from '../../screens/LandingMapPage';
import {VisibleContext} from '../../navigation/HamburgerSlideBarNavigator';
import textStyles from '../../../stylesheets/textStyles';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
const ShopCard = ({shop, navigation}) => {
  const context = useContext(OptionsContext);
  const [cont, setContext] = useState(false);
  const visible = useContext(VisibleContext);

  const shopPageDetails = () => {
    context.setCurrShop(shop);
    setContext(true);
  };

  useEffect(() => {
    if (cont) {
      visible(false);
      setContext(false);
      navigation.navigate('Shop page', context);
    }
  }, [cont]);

  return (
    <Pressable style={styles.item} onPress={shopPageDetails}>
      <SharedElement id={'shop.id}'}>
        <Image
          style={styles.cardImgs}
          source={{uri: shop.Image}}
          resizeMode="cover"
        />
      </SharedElement>

      <SharedElement id={'shop.id'}>
        <Text style={[textStyles.headingOne, styles.cardHeading]}>
          {shop.Name}
        </Text>
      </SharedElement>

      <SharedElement id={'shop.id'}>
        <ShopDetailIcons
          style={styles.details}
          likeness={shop.Likeness}
          timeToOrder={shop.Queue}
        />
      </SharedElement>
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
    alignItems: 'flex-start',

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

  title: {
    letterSpacing: 0.5,
    fontSize: 17,
    justifyContent: 'center',
  },

  shopName: {
    fontFamily: 'JosefinSans-Bold',
    color: 'white',
    fontWeight: '700',
    paddingBottom: 10,
  },
  cardImgs: {
    position: 'absolute',
    width: screenWidth,
    height: screenWidth * 0.37,
    left: 0,
  },

  details: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    backgroundColor: '#36363677',
    height: '100%',
  },
});

export default ShopCard;
