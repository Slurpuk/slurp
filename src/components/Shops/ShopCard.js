import React, {Component} from 'react';
import ShopDetailIcons from './ShopDetailIcons';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  Platform,
} from 'react-native';
import textStyles from '../../../stylesheets/textStyles';

const ShopCard = ({name, likeness, queue, image, navigation}) => {
  return (
    <Pressable style={styles.item} onPress={() => navigation.navigate()}>
      <ImageBackground
        source={image}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <View style={styles.details}>
          <Text
            style={[
              textStyles.headingOne,
              {
                marginBottom: '3%',
              },
            ]}
          >
            {name}
          </Text>
          <ShopDetailIcons likeness={likeness} timeToOrder={queue} />
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  item: {
    maxWidth: screenWidth,
    height: screenWidth * 0.37,
    marginVertical: '1.8%',
    // marginHorizontal: '2%',
    display: 'flex',
    alignItems: 'center',
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

  details: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    backgroundColor: '#36363677',
    height: '100%',
  },
});

export default ShopCard;
