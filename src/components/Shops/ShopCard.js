import React, {Component} from 'react';
import ShopDetailIcons from '../ShopDetailIcons';
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

const ShopCard = ({name, likeness, queue, image}) => {
  return (
    <Pressable style={styles.item}>
      <ImageBackground
        source={image}
        // imageStyle={{backgroundColor:'#000',  opacity: .6,}}
        style={{
          width: '100%',
          height: '100%',
          // opacity: 0.85,  applies opacity onto text for some reason
        }}
      >
        <View style={styles.details}>
          <Text
            style={[
              textStyles.headingOne,
              {
                fontFamily: 'JosefinSans-Bold',
                marginBottom: '2%',
                borderWidth: 1,
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
    width: screenWidth,
    height: screenWidth * 0.37,
    marginVertical: '1.3%',
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
  },

  details: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    display: 'flex',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default ShopCard;
