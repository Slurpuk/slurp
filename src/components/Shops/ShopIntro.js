import React, {useContext} from 'react';
import {Animated, View, Text, ImageBackground} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import LinearGradient from 'react-native-linear-gradient';
import ShopDetailIcons from './ShopDetailIcons';
import WhiteArrowButton from '../../sub-components/WhiteArrowButton';
import {fadeOpacityIn} from '../../sub-components/Animations';
import {ShopIntroStyles} from '../../../stylesheets/ShopStyles';
import {GlobalContext} from '../../contexts';
import {calculateDistance} from '../../helpers/screenHelpers';

export default function ShopIntro({shop, sheetRef, navigation, isFullScreen}) {
  const {globalState} = useContext(GlobalContext);
  return (
    <Animated.View
      style={{
        opacity: globalState.adaptiveOpacity,
      }}
      onLayout={() => {
        fadeOpacityIn(globalState.adaptiveOpacity, 140);
      }}>
      <ImageBackground
        imageStyle={!isFullScreen ? ShopIntroStyles.cardImg : null}
        style={ShopIntroStyles.container}
        source={{uri: shop.image}}>
        <LinearGradient
          colors={['transparent', 'black']}
          style={ShopIntroStyles.linearGradient}>
          <View
            style={[
              ShopIntroStyles.back_button,
              isFullScreen
                ? {opacity: 1}
                : globalState.isShopIntro
                ? {opacity: 0}
                : {opacity: 1},
            ]}
            testID={'shop_intro'}>
            <WhiteArrowButton
              direction={globalState.isShopIntro ? 'down' : 'left'}
              navigation={navigation}
              onPressAction={
                globalState.isShopIntro
                  ? () => sheetRef.current.snapTo(1)
                  : null
              }
            />
          </View>
          <View style={ShopIntroStyles.content}>
            <Text style={[textStyles.headingOne, ShopIntroStyles.heading]}>
              {shop.name}
            </Text>
            {globalState.locationIsEnabled ? (
              <ShopDetailIcons
                distanceToShop={calculateDistance(
                  shop.location,
                  globalState.currentUser.location,
                )}
                iconColor={'#FFE'}
                iconSize={24}
              />
            ) : null}
            <Text style={[textStyles.bodyText, ShopIntroStyles.body]}>
              {shop.intro}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  );
}
