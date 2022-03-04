import {Pressable, StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import ShopCard from './ShopCard';
import {OptionsContext} from '../../screens/LandingMapPage';
import {FlatList} from 'react-native-gesture-handler';

const ShopList = ({navigation}) => {
  const context = useContext(OptionsContext);
  const DATA = context.shopsData;
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

const styles = StyleSheet.create({
  container: {
    marginHorizontal: '2%',
  },
});
export default ShopList;
