import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

export const menuStyles = StyleSheet.create(
  {
    linearGradient: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 20,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    absoluteArea: {
      position: 'absolute',
      height: 100,
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
      marginHorizontal: '5%',
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
  },
  {
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
  },
);

const screenWidth = Dimensions.get('window').width;

export const menuItemStyles = StyleSheet.create({
  item: {
    width: screenWidth * 0.43,
    height: screenWidth * 0.43 * 0.74,
    borderRadius: 11,
    shadowOpacity: 0.2,
    marginVertical: '2.5%',
    borderWidth: 1,
    position: 'relative',
  },

  menuCardTextWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  menuCardPopupTrigger: {
    backgroundColor: 'white',
    position: 'absolute',
    paddingRight: 7,
    paddingLeft: 2,
    borderRadius: 80,
    bottom: 10,
    minWidth: 26,
    height: 26,
    right: 10,
  },

  linearGradient: {
    padding: 10,
    flex: 1,
    zIndex: 1,
    borderRadius: 10,
  },

  title: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.5,
    fontSize: 17,
    justifyContent: 'center',
    marginBottom: 3,
  },

  image: {
    borderRadius: 10,
    overflow: 'hidden',
  },

  imageContainer: {
    width: '100%',
    height: '100%',
  },

  counter: {
    marginLeft: 1,
    marginTop: 2,
    color: 'black',
    textAlign: 'center',
  },
});

