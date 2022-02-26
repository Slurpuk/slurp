import React, {Component} from 'react';
import ShopDetailIcons from './ShopDetailIcons';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Platform,
  Image,
} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import {SharedElement} from 'react-native-shared-element';
import {useSharedValue, withDelay, withTiming} from 'react-native-reanimated';

const ShopCard = ({item, navigation}) => {
  const opacity = useSharedValue(1);
  const shopPageDetails = () => {
    opacity.value = withDelay(300, withTiming(0));
    navigation.navigate('Shop page', {item});
  };
  return (
    <Pressable style={styles.item} onPress={shopPageDetails}>
      <SharedElement id={`item.id}`}>
        <Image
          style={styles.cardImgs}
          source={item.image_url}
          resizeMode="cover"
        />
      </SharedElement>

      <SharedElement id={`item.id}`}>
        <Text style={[textStyles.headingOne, styles.cardHeading]}>
          {item.name}
        </Text>
      </SharedElement>

      <SharedElement id={`item.id}`}>
        <ShopDetailIcons
          style={styles.details}
          likeness={item.details.likeness}
          timeToOrder={item.details.queue}
        />
      </SharedElement>
    </Pressable>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  item: {
    overflow: 'hidden',
    maxWidth: screenWidth * 1,
    minWidth: screenWidth * 1,
    height: screenWidth * 0.37,
    marginVertical: '1.8%',
    // marginHorizontal: '2%',
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
    width: '100%',
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
