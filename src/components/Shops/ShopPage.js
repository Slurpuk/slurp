import React, {useContext, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Menu from '../ShopMenu/Menu';
import {SharedElement} from 'react-native-shared-element';
import ItemsData from '../../fake-data/ItemsData';
import renderers from '../../renderers';
import ShopDetailIcons from './ShopDetailIcons';
import textStyles from '../../../stylesheets/textStyles';
import WhiteArrowButton from '../../sub-components/WhiteArrowButton';
import {OptionsContext} from '../../screens/LandingMapPage';
import {BlurView} from '@react-native-community/blur';
import OptionsPopUp from '../ShopMenu/OptionsPopUp';
import CoffeeOptionsData from '../../fake-data/CoffeeOptionsData';

export const ShopContext = React.createContext();
const ShopPage = ({navigation, route}) => {
  const MENUDATA = ItemsData;
  const defaultContext = useContext(OptionsContext);
  const context = route === undefined ? defaultContext : route.params;
  const shop = context.currShop;
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [currItem, setCurrItem] = useState(null);

  return (
    <ShopContext.Provider
      value={{setOptionsVisible: setOptionsVisible, setCurrItem: setCurrItem}}
    >
      <TouchableWithoutFeedback onPressIn={() => setOptionsVisible(false)}>
        <View style={styles.container}>
          <View
            style={{maxHeight: '35%', minHeight: '30%', position: 'relative'}}
          >
            <SharedElement id={`shop.id}`}>
              <Image
                style={styles.cardImgs}
                source={shop.image_url}
                resizeMode="cover"
              />
            </SharedElement>

            <SharedElement id={`shop.id`}>
              <Text style={[textStyles.headingOne, styles.cardHeading]}>
                {shop.name}
              </Text>
            </SharedElement>

            <SharedElement id={`shop.id`}>
              <ShopDetailIcons
                style={styles.details}
                likeness={shop.details.likeness}
                timeToOrder={shop.details.queue}
              />
            </SharedElement>
            <View>
              <WhiteArrowButton
                style={styles.back_button}
                direction={context.isShopIntro ? 'down' : 'left'}
                navigation={navigation}
                onPressAction={context.isShopIntro ? context.currRef : null}
              />
            </View>
          </View>
          <Menu
            DATA={MENUDATA}
            renderItem={renderers.renderMenuItem}
            renderSection={renderers.renderMenuSection}
          />
          {optionsVisible ? (
            <BlurView
              style={styles.absolute}
              blurType="dark"
              blurAmount={2}
              reducedTransparencyFallbackColor="white"
            />
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      {optionsVisible ? (
        <OptionsPopUp
          data={CoffeeOptionsData}
          curr_price={currItem.price}
          product_name={currItem.name}
          renderer={renderers.renderOption}
        />
      ) : null}
    </ShopContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    minHeight: '100%',
    position: 'relative',
    // maxHeight: '35%',
  },
  details: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    backgroundColor: '#36363677',
    height: '100%',
  },
  cardImgs: {
    position: 'absolute',
    width: '100%',
    left: 0,
  },
  back_button: {
    top: 30,
  },

  cardHeading: {
    position: 'absolute',
    width: '100%',
    top: 80,
  },

  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    borderRadius: 20,
  },
});
export default ShopPage;
