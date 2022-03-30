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
import {GlobalContext} from '../../../App';

const ShopCard = ({shop, navigation}) => {
  const context = useContext(GlobalContext);

  const shopPageDetails = async () => {
    await context.changeShop(shop, navigation);
  };

  return !shop.IsOpen ? (
    <ImageBackground
      style={styles.item}
      imageStyle={styles.image}
      source={{uri: shop.Image}}
      resizeMode="cover"
      blurRadius={4}
    >
      <Text style={[textStyles.headingOne, styles.shopName]}>{shop.Name}</Text>
      <Text style={[textStyles.bodyText]}> CLOSED </Text>
    </ImageBackground>
  ) : (
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
        <ShopDetailIcons distanceToShop={shop.distanceTo} />
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
