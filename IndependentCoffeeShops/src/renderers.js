import React from 'react';
import Option from './components/ShopMenu/Option';
import MenuSection from './components/ShopMenu/MenuSection';
import ItemCard from './components/ShopMenu/ItemCard';
import ShopCard from './components/Shops/ShopCard';
import ShopList from "./components/Shops/ShopList";

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

const renderShopCard = ({item}) => (
  <ShopCard name={item.name} likeness={item.likeness} queue={item.queue} image={item.image} />
);
const renderShopList = ({item, renderItem}) => (
  <ShopList DATA={item.data} renderItem={renderItem} />
);


export default {
  renderOption,
  renderMenuSection,
  renderItemCard,
  renderShopCard,
  renderShopList,
};
