import React from 'react';
import textStyles from '../../../stylesheets/textStyles';
import OrderDetailsView from './OrderDetailsView';
import CollapsableOrder from './CollapsableOrder';
import {Pressable, StyleSheet} from 'react-native';

const AnimatedCollapsableCard = ({order}) => {
  return (
    <Pressable style={styles.card}>
      <OrderDetailsView order={order} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F2F2F2',
    marginTop: 15,
    borderRadius: 10,
    padding: 8,
    paddingRight: 12,
    width: '100%',
  },
});

export default AnimatedCollapsableCard;
