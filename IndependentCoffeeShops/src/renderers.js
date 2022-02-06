import React from 'react';
import Option from './components/Option';

const renderOption = ({item, updateOptions}) => (
  <Option
    name={item.name}
    price={item.price}
    currency={item.currency}
    updateOptions={updateOptions}
  />
);

export default renderOption;
