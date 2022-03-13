import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../../sub-components/CustomButton';
import {FlatList} from 'react-native-gesture-handler';
import renderers from '../../renderers';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ShopContext} from '../../screens/ShopPage';

const Tab = createMaterialTopTabNavigator();

export const MenuContext = React.createContext();
const Menu = () => {
  const [numItems, setNumItems] = useState(0);
  const shopContext = useContext(ShopContext);

  return (
    <MenuContext.Provider value={{setNumItems: setNumItems}}>
      <Tab.Navigator
        style={styles.navigatorContent}
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
        containerStyle={styles.container}
      >
        <Tab.Screen
          name="Coffees"
          children={() => (
            <FlatList
              data={shopContext.getCoffees()}
              renderItem={({item}) => renderers.renderMenuItem({item})}
              keyExtractor={item => item.key}
              numColumns={2}
              contentContainerStyle={styles.content}
            />
          )}
        />
        <Tab.Screen
          name="Drinks"
          children={() => (
            <FlatList
              data={shopContext.getCoffees()}
              renderItem={({item}) => renderers.renderMenuItem({item})}
              keyExtractor={item => item.key}
              numColumns={2}
              contentContainerStyle={styles.content}
            />
          )}
        />
        <Tab.Screen
          name="Snacks"
          children={() => (
            <FlatList
              data={shopContext.getCoffees()}
              renderItem={({item}) => renderers.renderMenuItem({item})}
              keyExtractor={item => item.key}
              numColumns={2}
              contentContainerStyle={styles.content}
            />
          )}
        />
      </Tab.Navigator>

      <View style={styles.absoluteArea}>
        <LinearGradient
          colors={['transparent', '#EDEBE7', '#EDEBE7']}
          style={styles.linearGradient}
        >
          <CustomButton
            text="View Basket"
            priority="primary"
            optionalNumber={numItems}
          />
        </LinearGradient>
      </View>
    </MenuContext.Provider>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },

  absoluteArea: {
    position: 'absolute',
    height: 100,
    backgroundColor: '',
    bottom: 0,
    width: '100%',
  },

  panelHandle: {
    width: '10%',
    height: 5,
    backgroundColor: 'white',
    borderRadius: 4,
    position: 'absolute',
    top: '2%',
    zIndex: 2,
    left: '45%',
  },
  header1: {
    display: 'flex',
    alignItems: 'flex-start',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
  },
  contentContainerStyle: {
    backgroundColor: '#EDEBE7',
    width: '100%',
    height: '100%',
    flex: 1,
  },

  content: {
    flexGrow: 1,
    alignItems: 'flex-start',
    marginRight: '3%',
    paddingBottom: '15%',
  },

  container: {
    flex: 1,
    minHeight: '100%',
    width: '100%',
    position: 'relative',
  },

  navigatorContent: {
    width: '100%',
    flex: 1,
  },
});

export default Menu;
