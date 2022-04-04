import {SectionList, Text, StyleSheet} from 'react-native';
import CollapsableOrder from './CollapsableOrder';
import EmptyListText from '../../sub-components/EmptyListText';
import textStyles from '../../../stylesheets/textStyles';
import React from 'react';

export const PastOrders = props => {
  return (
    <>
      <SectionList
        contentContainerStyle={styles.container}
        sections={props.pastOrders}
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => <CollapsableOrder order={item} />}
        ListEmptyComponent={<EmptyListText text={props.emptyText} />}
        renderSectionHeader={({section: {period}}) => (
          <Text style={[textStyles.darkGreyPoppinsHeading]}>{period}</Text>
        )}
        testID={'past_orders_page'}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDEBE7',
    flexGrow: 1,
    paddingTop: '5%',
  },
});
