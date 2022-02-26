import {
  Dimensions,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import ShopCard from './ShopCard';
import ShopsData from '../../fake-data/ShopsData';
import {OptionsContext} from '../../screens/LandingMapPage';

const ShopList = ({navigation}) => {
  const DATA = ShopsData;
  return (
    <View>
      <FlatList
        style={styles.container}
        data={DATA}
        numColums={1}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View>
              <Pressable>
                <ShopCard shop={item} navigation={navigation} />
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
  },

  cardHeading: {
    position: 'absolute',
    // borderWidth: 4,
    width: '100%',
    textAlign: 'center',
    marginTop: '6%',
  },

  item: {
    overflow: 'hidden',
    maxWidth: screenWidth * 1,
    minWidth: screenWidth * 1,
    height: screenWidth * 0.37,
    marginVertical: '1.8%',
    // marginHorizontal: '2%',
    display: 'flex',
    alignItems: 'flex-start',

    flex: 1,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 8,
      },
    }),
  },

  title: {
    letterSpacing: 0.5,
    fontSize: 17,
    justifyContent: 'center',
  },

  shopName: {
    fontFamily: 'JosefinSans-Bold',
    color: 'white',
    fontWeight: '700',
    paddingBottom: 10,
  },

  cardImgs: {
    position: 'absolute',
    width: '100%',
    left: 0,
  },

  details: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    backgroundColor: '#36363677',
    height: '100%',
  },
});
export default ShopList;
