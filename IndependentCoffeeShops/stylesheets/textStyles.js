import {StyleSheet} from 'react-native';

const textStyles = StyleSheet.create({
  headingOne: {
    fontSize: 25,
    fontFamily: 'JosefinSans-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: 'white',
  },

  bodyText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.3,
    color: '#EDEBE7',
  },

  coffeeSubheading: {
    color: 'White',
    fontFamily: 'JosefinSans-Bold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  coffeePrice: {
    fontFamily: 'JosefinSans-Regular',
    fontSize: 16,
    color: 'F4F4F4',
    letterSpacing: 0.4,
  },

  poppinsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
  },

  poppinsIconText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'White',
    letterSpacing: 0.8,
    fontSize: 15,
  },

  orderDetail: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    color: '#717171',
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: '2%',
    marginTop: '8%',
    marginBottom: '2%',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
  },
});

export default textStyles;
