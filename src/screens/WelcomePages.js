import React, {useContext, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import CustomButton from '../sub-components/CustomButton';
import textStyles from '../../stylesheets/textStyles';
import CoffeeShopSvg from '../assets/svgs/CoffeeShopSvg';
import CoffeeCupSvg from '../assets/svgs/CoffeeCupSvg';
import CoffeeBeanSvg from '../assets/svgs/CoffeeBeanSvg';
import {getTightPadding} from '../../stylesheets/StyleFunction';
import {GlobalContext} from '../../App';

const WelcomePages = ({onDone, navigation}) => {
  const appContext = useContext(GlobalContext);
  const [sliderState, setSliderState] = useState({currentPage: 0});
  const {width, height} = Dimensions.get('window');

  const setSliderPage = (event: any) => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.ceil(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  function proceedToLogIn() {
    appContext.enterApp();
    navigation.navigate('LogIn');
  }

  function proceedToSignUp() {
    appContext.enterApp();
    navigation.navigate('SignUp');
  }

  const {currentPage: pageIndex} = sliderState;
  return (
    <View style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <ScrollView
        style={{display: 'flex'}}
        horizontal={true}
        scrollEventThrottle={16}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event: any) => {
          setSliderPage(event);
        }}
      >
        <View style={styles.component}>
          <Text style={[textStyles.blueJosefinHeading, styles.title]}>
            Welcome to Slurp!
          </Text>
          <CoffeeShopSvg style={[styles.circle]} />
          <Text style={[textStyles.bluePoppinsMediumBody, styles.text]}>
            All your favourite local coffee shops in one place.
            Order ahead and skip the line!
          </Text>
        </View>
        <View style={styles.component}>
          <Text style={[textStyles.blueJosefinHeading, styles.title]}>
            Why Slurp?
          </Text>
          <CoffeeCupSvg style={[styles.circle]} />
          <Text style={[textStyles.bluePoppinsMediumBody, styles.text]}>
            Our mission is to support independent, sustainable coffee shops in your area.
            In a rush? Don't head into a standard chain store just yet.
            Let us find the perfect coffee shop for your needs.
            Order now and enjoy your favourite drink as soon as you walk in!
          </Text>
        </View>
        <View style={styles.component}>
          <Text style={[textStyles.blueJosefinHeading, styles.title]}>
            Become a Slurpy today!
          </Text>
          <CoffeeBeanSvg style={[styles.circle, {marginTop: 5}]} />
          <Text style={[textStyles.bluePoppinsMediumBody, styles.text]}>
            Enjoy the best coffee from the best places. Explore your tastes with us
          </Text>
          <CustomButton
            text={'Sign Up'}
            priority={'primary'}
            onPress={proceedToSignUp}
          />
          <Text
            style={[textStyles.bluePoppinsBody, styles.footer]}
            onPress={proceedToLogIn}
          >
            Already have an account? Log in
          </Text>
        </View>
      </ScrollView>
      <View style={styles.paginationWrapper}>
        {Array.from(Array(3).keys()).map((key, index) => (
          <View
            style={[
              styles.paginationDots,
              {opacity: pageIndex === index ? 1 : 0.7},
            ]}
            key={index}
          />
        ))}
      </View>
    </View>
  );
};
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingTop: getTightPadding(),
  },
  component: {
    width: screenWidth,
    height: '40%',
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
  footer: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    textAlignVertical: 'bottom',
    paddingTop: 16,
  },
  title: {
    minHeight: '12%',
    paddingTop: '12%',
    paddingBottom: '8%',
    textAlign: 'center',
  },
  circle: {
    marginBottom: '6%',
    marginTop: '15%',
  },
  text: {
    paddingVertical: '4%',
    textAlign: 'center',
    overflow: 'hidden',
  },
  paginationWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 40,
    paddingBottom: 10,
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#C38C22',
    marginLeft: 10,
    flex: 0,
  },
});
export default WelcomePages;
