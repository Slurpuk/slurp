import {StyleSheet} from 'react-native';

export const ScreenOptionsStyles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.3,
    textTransform: 'capitalize',
    transform: [{translateY: -7}],
  },
  tabBarIndicatorStyle: {
    top: 0,
    height: null,
    backgroundColor: '#046D66',
    borderRadius: 13,
  },
  tabBarActiveTintColor: '#FFFFFF',
  tabBarInactiveTintColor: '#6D6D6D',
  tabBarStyle: {
    //borderRadius: 13,
    height: 42,
    backgroundColor: '#E5E5E5',
    elevation: 0,
    //borderColor: '#919191',
  },
});
