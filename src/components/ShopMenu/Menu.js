import React, {useContext} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../sub-components/CustomButton';
import {FlatList} from 'react-native-gesture-handler';
import renderers from '../../renderers';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ShopContext} from '../../screens/ShopPage';
import {GlobalContext} from '../../../App';
import EmptyListText from '../../sub-components/EmptyListText';
import {menuStyles} from './shopStyles';

const Tab = createMaterialTopTabNavigator();

const Menu = ({navigation}) => {
  const shopContext = useContext(ShopContext);
  const globalContext = useContext(GlobalContext);
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
              data={shopContext.getCoffees()}
              renderItem={({item}) => renderers.renderMenuItem({item})}
              keyExtractor={item => item.key}
              numColumns={2}
              ListEmptyComponent={EmptyListText(emptyText)}
              columnWrapperStyle={menuStyles.row}
              contentContainerStyle={menuStyles.content}
            />
          )}
        />
        <Tab.Screen
          name="Drinks"
          children={() => (
            <FlatList
              data={shopContext.getDrinks()}
              renderItem={({item}) => renderers.renderMenuItem({item})}
              keyExtractor={item => item.key}
              numColumns={2}
              ListEmptyComponent={EmptyListText(emptyText)}
              columnWrapperStyle={menuStyles.row}
              contentContainerStyle={menuStyles.content}
            />
          )}
        />
        <Tab.Screen
          name="Snacks"
          children={() => (
            <FlatList
              data={shopContext.getSnacks()}
              renderItem={({item}) => renderers.renderMenuItem({item})}
              keyExtractor={item => item.key}
              numColumns={2}
              ListEmptyComponent={EmptyListText(emptyText)}
              columnWrapperStyle={menuStyles.row}
              contentContainerStyle={menuStyles.content}
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
            optionalNumber={globalContext.basketSize}
            onPress={() => navigation.navigate('Basket page')}
          />
        </LinearGradient>
      </View>
    </>
  );
};
export default Menu;
