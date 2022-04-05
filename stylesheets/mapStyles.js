import {Dimensions, StyleSheet} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const mapStyles = {
  container: {
    flex: 1,
  },
  MapBackgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'flex-end',
    zIndex: -3,
  },
  map: {
    flex: 1,
    display: 'flex',
  },
  mapWithAbsoluteFill: {...StyleSheet.absoluteFillObject, flex: 1},
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    top: screenHeight * 0.07,
  },

  newHamburger: {
    width: 0.07 * screenHeight,
    height: 0.07 * screenHeight,
    backgroundColor: 'whitesmoke',
    marginLeft: '3%',
    borderRadius: 16,
    borderColor: '#046D66',
    borderWidth: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    borderRadius: 10,
    borderColor: '#666',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: screenHeight / 19,
    width: screenWidth / 1.4,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  markerBg: {
    backgroundColor: '#FAFAFA',
    padding: 5,
    marginBottom: 4,
    borderRadius: 11,
  },
  markerStyle: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: 300,
  },
};

export default mapStyles;
