import React from 'react';
import Option from './components/ShopMenu/Option';
import MenuSection from './components/ShopMenu/MenuSection';
import ItemCard from './components/ShopMenu/ItemCard';
import ShopIntro from './components/shopIntro';

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

const renderItemCard = ({item}) => <ItemCard item={item} />;

export default {
  renderOption,
  renderMenuSection,
  renderItemCard,
};
