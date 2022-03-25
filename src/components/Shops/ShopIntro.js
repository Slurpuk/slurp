import React, {useContext} from 'react';
import {Animated, View, Text, ImageBackground} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';
import LinearGradient from 'react-native-linear-gradient';
import ShopDetailIcons from './ShopDetailIcons';
import {ShopContext} from '../../screens/ShopPage';
import WhiteArrowButton from '../../sub-components/WhiteArrowButton';
import {DraggableContext} from './DraggableShopPage';
import {GlobalContext} from '../../../App';
import {fadeOpacityIn} from '../../sub-components/Animations';
import {ShopIntroStyles} from '../../../stylesheets/ShopStyles';

const ShopIntro = ({shop}) => {
  const shopContext = useContext(ShopContext);
  const globalContext = useContext(GlobalContext);
  const context = shopContext === undefined ? globalContext : shopContext;
  const draggable = useContext(DraggableContext);

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
        imageStyle={ShopIntroStyles.cardImg}
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
                context.isShopIntro
                  ? () => draggable.bottomSheetRef.current.snapTo(1)
                  : null
              }
            />
          </View>
          <View style={ShopIntroStyles.content}>
            <Text style={[textStyles.headingOne, ShopIntroStyles.heading]}>
              {shop.Name}
            </Text>
            <ShopDetailIcons timeToOrder={shop.Queue} />
            <Text style={[textStyles.bodyText, ShopIntroStyles.body]}>
              {shop.Intro}
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Animated.View>
  );
};

export default ShopIntro;
