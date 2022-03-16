import React from 'react';
import Option from './components/ShopMenu/Option';
import MenuSection from './components/ShopMenu/MenuSection';
import MenuItem from './components/ShopMenu/MenuItem';

const renderOption = ({item, updateOptions}) => (
  <Option
    name={item.name}
    price={item.price}
    currency={item.currency}
    updateOptions={updateOptions}
  />
);

const renderMenu = menu => menu;

const renderMenuSection = ({item, renderItem}) => {
  return <MenuSection section={item} renderItem={renderItem} />;
};

const renderMenuItem = ({item}) => <MenuItem item={item} />;

export default {
  renderOption,
  renderMenuSection,
  renderMenuItem,
  renderMenu,
};
