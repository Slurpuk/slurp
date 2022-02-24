import React, {useState} from 'react'
import {
    Dimensions,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StatusBar, Platform
} from "react-native";
import CustomButton from '../sub-components/CustomButton';
import textStyles from '../../stylesheets/textStyles';
import CoffeeShopSvg from '../assets/svgs/CoffeeShopSvg';
import CoffeeCupSvg from '../assets/svgs/CoffeeCupSvg';
import CoffeeBeanSvg from '../assets/svgs/CoffeeBeanSvg';
import {getStatusBarHeight} from "react-native-status-bar-height";

const WelcomePages = ({  onDone }) => {
    const [sliderState, setSliderState] = useState({ currentPage: 0 });
    const { width, height } = Dimensions.get('window');

    const setSliderPage = (event: any) => {
        const { currentPage } = sliderState;
        const { x } = event.nativeEvent.contentOffset;
        const indexOfNextScreen = Math.ceil(x / width);
        if (indexOfNextScreen !== currentPage) {
            setSliderState({
                ...sliderState,
                currentPage: indexOfNextScreen,
            });
        }
    };


    const { currentPage: pageIndex } = sliderState;
    return (
        <View style={styles.wrapper}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <View style={styles.safeSpace}>
                <SafeAreaView style={{display: "flex", height:'100%',backgroundColor:"#E5E5E5"}}>
                    <ScrollView style={{display: "flex"}}
                        horizontal={true}
                        scrollEventThrottle={16}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        onScroll={(event: any) => {
                            setSliderPage(event);
                        }}
                    >
                        <View style={ {width, height,paddingVertical: '5%',justifyContent:'center'
                            }}>
                            <View >
                                <Text style={[textStyles.blueJosefinHeading, styles.title]}>Welcome to CoffeeGems</Text>
                                <CoffeeShopSvg style={[styles.circle]}/>
                                <Text style={[textStyles.bluePoppinsMediumBody, styles.text]}>We dont even sell coffee but me make a commission from every purchase you make, because we can and we want</Text>
                            </View>
                        </View>
                        <View style={ {width, height,paddingVertical: '5%',justifyContent:'center'
                        }}>
                            <View >
                                <Text style={[textStyles.blueJosefinHeading, styles.title]}>Why CoffeeGems?</Text>
                                <CoffeeCupSvg style={[styles.circle]}/>
                                <Text style={[textStyles.bluePoppinsMediumBody, styles.text]}>Please use this platform because we need the money to cover all the costs of the platform to make the svgs above</Text>
                            </View>
                        </View>
                        <View style={ {width, height,paddingVertical: '5%',justifyContent:'flex-end'
                        }}>
                            <View >
                                <Text style={[textStyles.blueJosefinHeading, styles.title]}>How does it work?</Text>
                                <CoffeeBeanSvg style={[styles.circle]}/>
                                <Text style={[textStyles.bluePoppinsMediumBody, styles.text]}>We am not going to explain you how it works, we just want you to click the sign up button below, in fact if you dont we will hack your device </Text>
                                <CustomButton
                                    text={'Sign Up'}
                                    priority={'primary'}
                                    onPress={onDone}>
                                </CustomButton>
                            </View>
                        </View>
                    </ScrollView>
                        <View style={styles.paginationWrapper}>
                            {Array.from(Array(3).keys()).map((key, index) => (
                                <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.7 }]} key={index} />
                            ))}
                        </View>
                </SafeAreaView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    title: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal:20,
        textAlign:'center',
    },
    text: {
        paddingTop: 10,
        textAlign:'center',
        paddingHorizontal:20,
    },
    safeSpace: {
        flex: 1,
        backgroundColor: '#EDEBE7',
        paddingTop:
            Platform.OS === 'android'
                ? getStatusBarHeight() / 3
                : getStatusBarHeight(),
    },
    circle: {
        width: 350,
        height: 350,
        borderRadius: 350 / 2,
        backgroundColor: '#C4C4C4',
        marginBottom:20,
        marginTop:20,
        marginHorizontal:20,
    },
    paginationWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        minHeight: 40,
        paddingBottom:40
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#C38C22',
        marginLeft: 10,
        flex: 0
    },
});
export default WelcomePages;
