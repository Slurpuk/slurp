import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


const mapStyles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
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
    maxWidth: 220,
  },
  searchBar: {
    borderRadius: 10,
    marginTop: '15%',
    margin: '5%',
    color: '#000',
    borderColor: '#666',
    backgroundColor: '#FFF',
    borderWidth: 1,
    height: screenHeight / 19,
    width: screenWidth / 1.4,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  inputContainerStyle: {
    backgroundColor: 'yellow',
  },
});

export default mapStyles;
