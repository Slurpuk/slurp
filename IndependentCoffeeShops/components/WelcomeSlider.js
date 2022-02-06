import React, {useState} from 'react'
import {
    Dimensions,
    StyleSheet,
    PixelRatio,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
    Pressable, Alert
} from "react-native";
import Cafe from '../src/assets/svgs/cafe.svg';
import CoffeeBean from '../src/assets/svgs/coffee-bean.svg';
import CoffeeCup from '../src/assets/svgs/coffee-cup.svg';

const App = () => {
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

    const createAccount = () =>{
        registeredMessage()
    }

    // Display a confirmation message to the user
    const registeredMessage = () => {
        Alert.alert(
            "Hey man",
            "Why dont you go and create an account",
            [
                {
                    text: "OK",
                }
            ]
        )
    }

    const { currentPage: pageIndex } = sliderState;

    return (
        <>

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={{ flex: 1 }}
                    horizontal={true}
                    scrollEventThrottle={16}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    onScroll={(event: any) => {
                        setSliderPage(event);
                    }}
                >
                    <View style={{ width, height }}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Welcome to the app!</Text>
                            <CoffeeCup stroke={'#333'} height={200} width={200}  />
                            <Text style={styles.text}>Why our service is awesome part 1</Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Welcome Part 2!</Text>
                            <CoffeeBean stroke={'#333'} height={200} width={200} />
                            <Text style={styles.text}>Why our service is awesome part 2</Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Welcome Part 3!</Text>
                            <Cafe stroke={'#333'} height={200} width={200} />
                            <Text style={styles.text}>Why you should create an account </Text>
                            <Pressable
                                style={[styles.button, styles.account_button]}
                                onPress={createAccount}>
                                <Text style={[styles.text, styles.button_text]}>Create an Account</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.paginationWrapper}>
                    {Array.from(Array(3).keys()).map((key, index) => (
                        <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.2 }]} key={index} />
                    ))}
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        flex: 1,
        padding: 5,
    },
    text: {
        fontFamily: 'Josefin Sans',
        fontSize: 20,
        color: '#173C4F',
        flex: 1,
    },
    title: {
        fontFamily: 'Josefin Sans',
        fontWeight:'bold',
        color: '#173C4F',
        fontSize: 30,
        flex: 1,
    },
    paginationWrapper: {
        position: 'absolute',
        bottom: 70,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#C38C22',
        marginLeft: 10,
    },
    button: {
        borderRadius: 13,
        height: 41,
    },
    account_button: {
        backgroundColor: '#087562',
    },
    button_text: {
        fontFamily: 'Josefin Sans',
        fontWeight:'bold',
        color: '#EFEFEF',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
    }
});
export default App;
