import React, {useContext} from 'react';
import {Animated, View, Text, ImageBackground} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import LinearGradient from 'react-native-linear-gradient';
import ShopDetailIcons from './ShopDetailIcons';
import WhiteArrowButton from '../../sub-components/WhiteArrowButton';
import {GlobalContext} from '../../../App';
import {fadeOpacityIn} from '../../sub-components/Animations';
import {ShopIntroStyles} from '../../../stylesheets/ShopStyles';

export default function ShopIntro({shop, sheetRef, navigation, isFullScreen}) {
  const globalContext = useContext(GlobalContext);

  return (
    <Animated.View
      style={{
        opacity: globalContext.adaptiveOpacity,
      }}
      onLayout={() => {
        fadeOpacityIn(globalContext.adaptiveOpacity, 140);
      }}
    >
      <ImageBackground
        imageStyle={!isFullScreen ? ShopIntroStyles.cardImg : null}
        style={ShopIntroStyles.container}
        source={{uri: shop.Image}}
      >
        <LinearGradient
          colors={['transparent', 'black']}
          style={ShopIntroStyles.linearGradient}
        >
          <View
            style={[
              ShopIntroStyles.back_button,
              isFullScreen
                ? {opacity: 1}
                : globalContext.bottomSheet.isOpen
                ? {opacity: 0}
                : {opacity: 1},
            ]}
          >
            <WhiteArrowButton
              direction={globalContext.bottomSheet.isOpen ? 'down' : 'left'}
              navigation={navigation}
              onPressAction={
                globalContext.bottomSheet.isOpen
                  ? () => sheetRef.current.snapTo(1)
                  : null
              }
            />
          </View>
          <View style={ShopIntroStyles.content}>
            <Text style={[textStyles.headingOne, ShopIntroStyles.heading]}>
              {shop.Name}
            </Text>
            <ShopDetailIcons distanceToShop={shop.distanceTo} />
            <Text style={[textStyles.bodyText, ShopIntroStyles.body]}>
              {shop.Intro}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  );
}
