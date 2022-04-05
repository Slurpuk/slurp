import {Dimensions, Platform, StyleSheet} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const DetailIconsStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  spacing: {
    paddingRight: '3%',
  },
});

const ShopIntroStyles = StyleSheet.create({
  heading: {
    paddingVertical: 7,
  },

  content: {
    marginLeft: '2%',
  },

  cardImg: {
    position: 'absolute',
    width: screenWidth * 1,
    height: screenWidth * 0.7,
    left: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },

  container: {
    height: screenWidth * 0.7,
    width: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },

  body: {
    paddingVertical: 7,
  },

  back_button: {
    marginTop: '5%',
  },

  linearGradient: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 22,
    width: screenWidth * 1,
  },
});

const OptionStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkBoxView: {
    ...Platform.select({
      ios: {
        borderColor: '#717171',
        borderRadius: 2,
        borderWidth: 2,
        height: 18,
        width: 18,
        marginVertical: '1.5%',
        marginHorizontal: '2%',
      },
      android: {},
    }),
  },

  checkedCheckBoxView: {
    ...Platform.select({
      ios: {
        borderColor: '#087562',
        backgroundColor: '#087562',
        borderRadius: 2,
        borderWidth: 2,
        height: 18,
        width: 18,
        marginVertical: '1.5%',
        marginHorizontal: '2%',
      },
      android: {},
    }),
  },

  checkBox: {
    ...Platform.select({
      ios: {
        height: 14,
      },
      android: {
      },
    }),
  },
});

const OptionPopUpStyles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '7%',
    width: 0.9128 * screenWidth,
    height: 0.6 * screenHeight,
    backgroundColor: 'white',
    paddingVertical: '6%',
    position: 'absolute',
    top: '20%',
    bottom: '23%',
    left: '4%',
    right: '4%',
    elevation: 200,
    zIndex: 100,
    borderRadius: 5,
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  product_name: {
    color: 'black',
    marginLeft: '2%',
  },

  list: {
    flex: 1,
    height: '60%',
  },

  icon: {
    marginRight: '7%',
    marginBottom: '2%',
  },
});

const BasketItemStyles = StyleSheet.create({
  item_container: {
    flex: 1,
    borderColor: '#C0C0C0',
    borderStyle: 'solid',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: '5%',
    justifyContent: 'space-between',
  },
  item_information: {
    alignSelf: 'flex-start',
    flex: 1,
  },
  item_name: {
    color: '#173C4F',
    fontSize: 21,
    fontWeight: '600',
    paddingBottom: '2%',
    alignSelf: 'flex-start',
  },
  item_specification_list: {},
  item_specification: {
    color: '#717171',
    fontWeight: '300',
    fontSize: 13,
  },
  price: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    minWidth: 30,
    flex: 0.25,
    display: 'flex',
    fontWeight: '600',
    fontSize: 17,
    textAlign: 'right',
    alignSelf: 'flex-start',
    color: '#434343',
  },
  amount_selection_container: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    backgroundColor: '#1B947E',
    borderRadius: 3,
    paddingVertical: '2%',
    paddingHorizontal: '6%',
    flex: 0.25,
    marginEnd: '5%',
    justifyContent: 'center',
  },
  amount: {
    color: '#F1F1F1',
    fontWeight: '600',
    fontSize: 20,
  },
  change_amount_button: {
    color: '#FFFFFF',
    fontSize: 20,
  },

  plus: {
    paddingLeft: 12,
  },

  minus: {
    paddingRight: 12,
  },
});

export {
  DetailIconsStyles,
  ShopIntroStyles,
  OptionStyles,
  OptionPopUpStyles,
  BasketItemStyles,
  screenWidth,
  screenHeight,
};
