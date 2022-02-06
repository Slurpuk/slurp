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
import Svg, { Circle } from 'react-native-svg';
import Coffee from '../src/assets/svgs/coffee.svg';

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
                            <Text style={styles.title}>This is the first page</Text>

                            <Text style={styles.title}>Why our service is awesome part 1</Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <View style={styles.container}>
                            <Text style={styles.title}>This is the second page</Text>
                            <Svg height="50%" width="50%" viewBox="0 0 100 100" >
                                <Circle cx="50" cy="50" r="50" fill="#C4C4C4" />
                            </Svg>
                            <Text style={styles.title}>Why our service is awesome part 2</Text>
                        </View>
                    </View>
                    <View style={{ width, height }}>
                        <View style={styles.container}>
                            <Text style={styles.title}>This is the third page</Text>
                            <Svg height="50%" width="50%" viewBox="0 0 100 100" >
                                <Circle cx="50" cy="50" r="50" fill="#C4C4C4" />
                            </Svg>
                            <Text style={styles.title}>Why you should create an account </Text>
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
    page:{
        backgroundColor: '#E5E5E5',
        flex: 1,
        padding: '5%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        backgroundColor: '#EDEBE7',
        flex: 1,
        padding: '5%',
    },
    text: {
        fontFamily: 'Josefin Sans',
        fontWeight:'700',
        color: '#173C4F',
    },
    title: {
        fontFamily: 'Josefin Sans',
        fontWeight:'300',
        color: '#173C4F',
        fontSize: 35,
        lineHeight: 35,
        flex: 0.5,
        marginBottom: '10%',
    },
    form: {
        flex: 4,
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
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
        color: '#EFEFEF',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
    }
});
export default App;
