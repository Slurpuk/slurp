import React, {useState} from 'react'
import {Dimensions,StyleSheet , PixelRatio, SafeAreaView, ScrollView, StatusBar, Text, View} from "react-native";


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
                        <Text style={styles.title}>This is the first page</Text>
                    </View>
                    <View style={{ width, height }}>
                        <Text style={styles.title}>This is the second page</Text>
                    </View>
                    <View style={{ width, height }}>
                        <Text style={styles.title}>This is the third page</Text>
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
        backgroundColor: '#EDEBE7',
        flex: 1,
        padding: '5%',
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
        backgroundColor: '#173C4F',
        marginLeft: 10,
    },
});
export default App;
