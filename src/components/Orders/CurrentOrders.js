import {FlatList} from 'react-native';
import CollapsableOrder from './CollapsableOrder';
import EmptyListText from '../../sub-components/EmptyListText';
import React, { useContext } from "react";
import { calculateDistance } from "../../helpers/screenHelpers";
import { GlobalContext } from "../../../App";

export const CurrentOrders = props => {
  const context = useContext(GlobalContext);
  props.currentOrders.forEach(order => {
    order.ETA = calculateDistance(order.shop.location, {
      latitude: context.currentUser.location._latitude,
      longitude: context.currentUser.location._longitude,
    });
  });
  props.currentOrders.sort((a, b) => (a.ETA < b.ETA ? - 1 : Number(a.ETA > b.ETA)))
  return (
    <>
      <FlatList
        contentContainerStyle={{backgroundColor: '#EDEBE7', flexGrow: 1}}
        data={props.currentOrders}
        renderItem={({item}) => <CollapsableOrder order={item} />}
        ListEmptyComponent={<EmptyListText text={props.emptyText} />}
      />
    </>
  );
};
