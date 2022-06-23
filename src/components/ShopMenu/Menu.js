import React, {useContext} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../sub-components/CustomButton';
import {FlatList} from 'react-native-gesture-handler';
import renderers from './renderers';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ShopContext} from '../../screens/ShopPage';
import EmptyListText from '../../sub-components/EmptyListText';
import {menuStyles} from './shopStyles';
import {LogBox} from 'react-native';
import {GlobalContext} from '../../contexts';
LogBox.ignoreLogs([
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

const Tab = createMaterialTopTabNavigator();

const Menu = ({navigation}) => {
  const shopContext = useContext(ShopContext);
  const {globalState} = useContext(GlobalContext);
  const emptyText =
    'There are currently no items in this section, check again later.';
  return (
    <>
      <Tab.Navigator
        style={menuStyles.navigatorContent}
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 18,
            fontFamily: 'Poppins-SemiBold',
            letterSpacing: 0.3,
            textTransform: 'capitalize',
            transform: [{translateY: -7}],
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#6D6D6D',
          tabBarIndicatorStyle: {
            backgroundColor: '#046D66',
            height: 3,
          },
          tabBarStyle: {
            height: 39,
            backgroundColor: '#FFFFFF',
            elevation: 0,
          },
        }}
        containerStyle={menuStyles.container}>
        <Tab.Screen
          name="Coffees"
          children={() => (
            <FlatList
              data={shopContext.menuData.coffees}
              renderItem={({item}) => renderers.renderMenuItem({item})}
              keyExtractor={item => item.key}
              numColumns={2}
              ListEmptyComponent={EmptyListText(emptyText)}
              columnWrapperStyle={menuStyles.row}
              contentContainerStyle={menuStyles.content}
              testID={'coffee_list'}
            />
          )}
        />
        <Tab.Screen
          name="Drinks"
          children={() => (
            <FlatList
              data={shopContext.menuData.drinks}
              renderItem={({item}) => renderers.renderMenuItem({item})}
              keyExtractor={item => item.key}
              numColumns={2}
              ListEmptyComponent={EmptyListText(emptyText)}
              columnWrapperStyle={menuStyles.row}
              contentContainerStyle={menuStyles.content}
              testID={'drinks_list'}
            />
          )}
        />
        <Tab.Screen
          name="Snacks"
          children={() => (
            <FlatList
              data={shopContext.menuData.snacks}
              renderItem={({item}) => renderers.renderMenuItem({item})}
              keyExtractor={item => item.key}
              numColumns={2}
              ListEmptyComponent={EmptyListText(emptyText)}
              columnWrapperStyle={menuStyles.row}
              contentContainerStyle={menuStyles.content}
              testID={'snacks_list'}
            />
          )}
        />
      </Tab.Navigator>

      <View style={menuStyles.absoluteArea}>
        <LinearGradient
          colors={['transparent', '#EDEBE7', '#EDEBE7']}
          style={menuStyles.linearGradient}>
          <CustomButton
            text="View Basket"
            priority="primary"
            optionalNumber={globalState.currentBasket.reduce(function (
              acc,
              item,
            ) {
              return acc + item.count;
            },
            0)}
            onPress={() => navigation.navigate('Basket page')}
          />
        </LinearGradient>
      </View>
    </>
  );
};
export default Menu;
