import React, {useContext, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import ShopIntro from './ShopIntro';
import Menu from '../ShopMenu/Menu';
import {GlobalContext} from '../../../App';

const DraggableShopPage = ({shop, navigation}) => {
  const context = useContext(GlobalContext);
  const sheetRef = useRef();
  const [isFullScreen, setFullScreen] = useState(false);

  function updatePage(index) {
    if (index === 0) {
      setFullScreen(true);
    } else if (index === 2) {
      context.bottomSheet.setOpen(false);
    } else {
      setFullScreen(false);
    }
  }

  return (
    <ScrollBottomSheet
      componentType="FlatList"
      ref={sheetRef}
      snapPoints={['0%', '70%', '100%']}
      onSettle={index => updatePage(index)}
      initialSnapIndex={1}
      renderHandle={() => (
        <View style={styles.header1}>
          <View
            style={[
              styles.panelHandle,
              context.isFullScreen ? {opacity: 0} : {opacity: 1},
            ]}
          />
          <ShopIntro
            shop={shop}
            sheetRef={sheetRef}
            navigation={navigation}
            isFullScreen={isFullScreen}
          />
          <Menu navigation={navigation} />
        </View>
      )}
      contentContainerStyle={styles.contentContainerStyle}
    />
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
