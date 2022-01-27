/**
 * Sample React Native App
 * Welcome to the App.js this is the brain of our application!
 *
 * @format
 * @flow strict-local
 */

 import * as React from 'react';
 import { View, Text,StyleSheet,Button,Alert } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';

 function HomeScreen() {

   const  handleSubmit = () => {
       Alert.alert('Welcome to our application!');
     };

   return (
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
       <Text style = {styles.sectionTitle}>Home Screen</Text>
       <Button
        style = {styles.button}
        title="Welcome!"
        onPress={handleSubmit}
       />
     </View>
   );
 }

 const Stack = createNativeStackNavigator();

 function App() {
   return (
     <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen name="Home" component={HomeScreen} />
       </Stack.Navigator>
     </NavigationContainer>
   );
 }

//List of style components
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default App;
