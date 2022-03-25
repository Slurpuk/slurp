import {StyleSheet} from 'react-native';

export const basketContentStyles = StyleSheet.create({
  basket_content: {
    display: 'flex',
    height: '100%',
  },
  my_order: {
    fontWeight: '700',
    fontSize: 26,
    color: '#212121',
    paddingBottom: '5%',
  },
  items_list: {
    display: 'flex',
    flex: 2,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C0C0C0',
  },
});
