import React from 'react';
import Option from './components/ShopMenu/Option';
import MenuItem from './components/ShopMenu/MenuItem';

const renderOption = ({item, updateOptions}) => (
  <Option option={item} updateOptions={updateOptions} />
);

const renderMenu = menu => menu;



const renderMenuItem = ({item}) => <MenuItem item={item} />;

export default {
  renderOption,
  renderMenuItem,
  renderMenu,
};
