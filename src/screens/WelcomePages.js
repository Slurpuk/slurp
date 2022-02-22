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
    const Circle = () => {
        return <View style={styles.circle} />;
    };


    const { currentPage: pageIndex } = sliderState;
    return (
        <SafeAreaView style={{display: "flex", height:'100%'}}>
            <ScrollView
                style={{display: "flex", flex: 1 }}
                horizontal={true}
                scrollEventThrottle={16}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={(event: any) => {
                    setSliderPage(event);
                }}
            >
                <View style={{ width, height, }}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Welcome to the app!</Text>
                        <Circle />
                        <Text style={styles.text}>Why our service is awesome part 1</Text>
                    </View>
                </View>
                <View style={{ width, height}}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Welcome Part 2!</Text>

                        <Text style={styles.text}>Why our service is awesome part 2</Text>
                    </View>
                </View>
                <View style={[{ width, height, backgroundColor: 'green'}, styles.ViewWrapper]}>
                    <Text style={styles.title}>Welcome Part 3!</Text>
                    <Text style={styles.text}>Why you should create an account </Text>
                    <Pressable
                        style={[styles.button, styles.account_button]}
                        onPress={onDone}>
                        <Text style={styles.button_text}>Create an Account</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <View style={styles.paginationWrapper}>
                {Array.from(Array(3).keys()).map((key, index) => (
                    <View style={[styles.paginationDots, { opacity: pageIndex === index ? 1 : 0.7 }]} key={index} />
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 300,
        height: 300,
        borderRadius: 300 / 2,
        backgroundColor: "grey",
    },
    container: {
        padding: 5,
    },

    ViewWrapper:{
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: "relative"

    },

    svgImg:{
        marginTop: '15%'
    },
    text: {
        fontFamily: 'Josefin Sans',
        fontSize: 20,
        color: '#173C4F',
        marginTop: '15%',
        marginBottom: '8%',
        flex: 0

    },
    title: {
        fontFamily: 'Josefin Sans',
        fontWeight:'bold',
        color: '#173C4F',
        fontSize: 30,
        backgroundColor: 'orange',
        marginTop: '15%'

    },
    paginationWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        minHeight: 40,
        backgroundColor: 'purple'
    },
    paginationDots: {
        height: 10,
        width: 10,
        borderRadius: 10 / 2,
        backgroundColor: '#C38C22',
        marginLeft: 10,
        flex: 0
    },
    button: {
        borderRadius: 13,
        backgroundColor: '#087562',

    },

    button_text: {
        fontFamily: 'Josefin Sans',
        fontWeight:'bold',
        color: '#EFEFEF',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
});
export default WelcomePages;
