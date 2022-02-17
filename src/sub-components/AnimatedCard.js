import React, { useRef, useState } from "react";
import { Animated, Text, View, StyleSheet, Button, SafeAreaView } from "react-native";

const AnimatedCard = () => {
    // fadeAnim will be used as the value for opacity. Initial Value: 0
    const adaptiveHeight = useRef(new Animated.Value(100)).current;
    const [isExpanded, setExpanded] = useState(false);
    console.log(isExpanded);

    const growHeight = () => {
        setExpanded(!isExpanded);
        console.log(isExpanded);

        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(adaptiveHeight, {
            toValue: 300,
            duration: 1000,
            useNativeDriver: false,
        }).start();


    };

    const toggleheight = () => {

        isExpanded ? shrinkHeight() : growHeight();
    }

    const shrinkHeight = () => {

        setExpanded(!isExpanded);
        console.log(isExpanded);


        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(adaptiveHeight, {
            toValue: 100,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }


    return (
        <SafeAreaView style={styles.container}>
            <Animated.View
                style={[
                    styles.expandable,
                    {
                        // Bind opacity to animated value
                        height: adaptiveHeight
                    }
                ]}
            >
                <View>
                    <Text>HI SARA</Text>
                    <Button title="weeeee" onPress={toggleheight} />

                </View>
            </Animated.View>
            <View style={styles.buttonRow}>
                <Button title="peekaboo" onPress={growHeight} />
                <Button title="bye bye" onPress={shrinkHeight} />
                {isExpanded ? <Text>true</Text> : <Text>false</Text>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    fadingContainer: {
        padding: 20,
        backgroundColor: "powderblue"
    },
    fadingText: {
        fontSize: 28
    },
    buttonRow: {
        flexBasis: 100,
        justifyContent: "space-evenly",
        marginVertical: 16,
        color: 'black',
    },

    expandable:{
        backgroundColor: 'green',
        borderWidth: 10,
        display: 'flex',
        flexShrink: 0,
        height: 100,
    }
});

export default AnimatedCard;