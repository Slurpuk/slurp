import React from 'react';
import Option from './components/Option';

const renderOption = ({item}) => (
  <Option name={item.name} price={item.price} currency={item.currency} />
);

export default renderOption;
