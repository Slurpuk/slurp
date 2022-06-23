import React, {useContext} from 'react';
import ShopDetailIcons from './ShopDetailIcons';
import {
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  Platform,
  ImageBackground,
} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import {GlobalContext} from '../../contexts';
import {changeShopFromList} from '../../helpers/changeShopHelpers';

const ShopCard = ({shop, navigation}) => {
  const {globalState, globalDispatch} = useContext(GlobalContext);

  const shopPageDetails = async () => {
    await changeShopFromList(globalState, shop.key, globalDispatch, navigation);
  };

  return !shop.is_open ? (
    <ImageBackground
      style={styles.item}
      imageStyle={styles.image}
      source={{uri: shop.image}}
      resizeMode="cover"
      blurRadius={4}>
      <Text style={[textStyles.headingOne, styles.shopName]}>{shop.name}</Text>
      <Text style={[textStyles.bodyText]} testID="shop-card-closed">
        CLOSED
      </Text>
    </ImageBackground>
  ) : (
    <Pressable onPress={shopPageDetails} testID="shop-card-open">
      <ImageBackground
        style={styles.item}
        imageStyle={styles.image}
        source={{uri: shop.image}}
        resizeMode="cover">
        <Text style={[textStyles.headingOne, styles.shopName]}>
          {shop.name}
        </Text>
        {globalState.locationIsEnabled ? (
          <ShopDetailIcons
            distanceToShop={shop.distanceTo}
            iconColor={'#FFE'}
            iconSize={24}
          />
        ) : null}
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
