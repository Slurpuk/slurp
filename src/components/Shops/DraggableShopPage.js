import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import ShopIntro from './ShopIntro';
import Menu from '../ShopMenu/Menu';
import {ShopContext} from '../../screens/ShopPage';
import {VisibleContext} from '../../navigation/HamburgerSlideBarNavigator';

export const DraggableContext = React.createContext();
const DraggableShopPage = ({shop, navigation, sheetRef}) => {
  const setHamburgerVisible = useContext(VisibleContext);
  const context = useContext(ShopContext);

  function updatePage({index}) {
    if (index === 0) {
      setHamburgerVisible(false);
      context.setFullScreen(true);
    } else if (index === 2) {
      context.setShopIntro(false);
    } else {
      setHamburgerVisible(true);
      context.setFullScreen(false);
    }
  }

  return (
    <DraggableContext.Provider value={{bottomSheetRef: sheetRef}}>
      <ScrollBottomSheet
        ref={sheetRef}
        componentType="FlatList"
        snapPoints={['0%', '70%', '100%']}
        onSettle={index => updatePage({index})}
        initialSnapIndex={1}
        renderHandle={() => (
          <View style={styles.header1}>
            <View
              style={[
                styles.panelHandle,
                context.isFullScreen ? {opacity: 0} : {opacity: 1},
              ]}
            />
            <ShopIntro shop={shop} />
            <Menu navigation={navigation} />
          </View>
        )}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </DraggableContext.Provider>
  );
};

const styles = StyleSheet.create({
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
    opacity: 0,
  },
});

export default DraggableShopPage;
