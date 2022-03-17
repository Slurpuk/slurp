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

import {DraggableContext} from './DraggableShopPage';
import {GlobalContext} from '../../../App';

const ShopIntro = ({shop}) => {
  const shopContext = useContext(ShopContext);
  const globalContext = useContext(GlobalContext);
  const context = shopContext === undefined ? globalContext : shopContext;
  const draggable = useContext(DraggableContext);
  return (
    <ImageBackground
      imageStyle={styles.cardImgs}
      style={styles.container}
      source={{uri: shop.Image}}
    >
      <LinearGradient
        colors={['transparent', 'black']}
        style={styles.linearGradient}
      >
        <View
          style={[
            styles.back_button,
            context.isFullScreen
              ? {opacity: 1}
              : context.isShopIntro
              ? {opacity: 0}
              : {opacity: 1},
          ]}
        >
          <WhiteArrowButton
            direction={context.isShopIntro ? 'down' : 'left'}
            navigation={context.navigation}
            onPressAction={
              context.isShopIntro ? draggable.bottomSheetRef : null
            }
          />
        </View>
        <View style={styles.content}>
          <Text style={[textStyles.headingOne, styles.heading]}>
            {shop.Name}
          </Text>
          <ShopDetailIcons likeness={shop.Likeness} timeToOrder={shop.Queue} />
          <Text style={[textStyles.bodyText, styles.body]}>{shop.Intro}</Text>
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
    overflow: 'hidden',
  },

  container: {
    height: screenWidth * 0.7,
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },

  body: {
    paddingVertical: 7,
  },

  back_button: {
    marginTop: '5%',
  },

  linearGradient: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
});
