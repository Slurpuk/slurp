import React from 'react';
import Option from './components/ShopMenu/Option';
import MenuSection from './components/ShopMenu/MenuSection';
import ItemCard from './components/ShopMenu/ItemCard';

const renderOption = ({item, updateOptions}) => (
  <Option
    name={item.name}
    price={item.price}
    currency={item.currency}
    updateOptions={updateOptions}
  />
);

const renderMenuSection = ({item, renderItem}) => (
  <MenuSection section={item} renderItem={renderItem} />
);

const renderItemCard = ({item}) => <ItemCard name={item.name} />;

export default {renderOption, renderMenuSection, renderItemCard};
