import {FlatList} from 'react-native';
import CollapsableOrder from './CollapsableOrder';
import EmptyListText from '../../sub-components/EmptyListText';
import React from 'react';

export const CurrentOrders = props => {
  return (
    <>
      <FlatList
        contentContainerStyle={{backgroundColor: '#EDEBE7', flexGrow: 1}}
        data={props.currentOrders}
        renderItem={({item}) => <CollapsableOrder order={item} />}
        ListEmptyComponent={<EmptyListText text={props.emptyText}/>}
      />
    </>
  );
};
