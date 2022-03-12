import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import LinearGradient from 'react-native-linear-gradient';
import ShopDetailIcons from './ShopDetailIcons';
import {ShopContext} from '../../screens/ShopPage';
import WhiteArrowButton from '../../sub-components/WhiteArrowButton';

const ShopIntro = props => {
  const shopContext = useContext(ShopContext);
  return (
    <ImageBackground
      imageStyle={styles.cardImgs}
      style={styles.container}
      source={{uri: shopContext.shop.Image}}
    >
      <LinearGradient
        colors={['transparent', 'black']}
        style={styles.linearGradient}
      >
        <View
          style={[
            styles.back_button,
            shopContext.isFullScreen
              ? {opacity: 1}
              : shopContext.isShopIntro
              ? {opacity: 0}
              : {opacity: 1},
          ]}
        >
          <WhiteArrowButton
            direction={shopContext.isShopIntro ? 'down' : 'left'}
            navigation={shopContext.navigation}
            onPressAction={shopContext.isShopIntro ? shopContext.currRef : null}
          />
        </View>
        <View style={styles.content}>
          <Text style={[textStyles.headingOne, styles.heading]}>
            {props.shopName}
          </Text>
          <ShopDetailIcons
            likeness={props.likeness}
            timeToOrder={props.timeToOrder}
          />
          <Text style={[textStyles.bodyText, styles.body]}>
            {props.shopIntroText}
          </Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default ShopIntro;

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  heading: {
    paddingVertical: 7,
  },

  content: {
    marginLeft: '2%',
  },

  cardImgs: {
    position: 'absolute',
    width: screenWidth,
    height: screenWidth * 0.7,
    left: 0,
    borderRadius: 20,
  },

  container: {
    maxHeight: '35%',
    minHeight: '30%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },

  body: {
    paddingVertical: 7,
  },

  back_button: {
    ...Platform.select({
      ios: {
        marginTop: '5%',
      },
      android: {},
    }),
  },

  linearGradient: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
