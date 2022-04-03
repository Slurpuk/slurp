import {SectionList, Text} from 'react-native';
import CollapsableOrder from './CollapsableOrder';
import EmptyListText from '../../sub-components/EmptyListText';
import textStyles from '../../../stylesheets/textStyles';
import React from 'react';

export const PastOrders = props => {
  return (
    <>
      <SectionList
        contentContainerStyle={{backgroundColor: '#EDEBE7', flexGrow: 1}}
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
