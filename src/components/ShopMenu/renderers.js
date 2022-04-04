import React from 'react';
import Option from './Option';
import MenuItem from './MenuItem';

/**
 * Renderer for rendering item options, reusable throughout the app.
 * @param item The option to display
 * @param updateOptions The setState method for updating the current list of options selected.
 */
const renderOption = ({item, updateOptions}) => (
  <Option option={item} updateOptions={updateOptions} />
);

/**
 * Renderer for rendering menu items, reusable throughout the app.
 * @param item The option to display
 */
const renderMenuItem = ({item}) => <MenuItem item={item} />;

export default {
  renderOption,
  renderMenuItem,
};
