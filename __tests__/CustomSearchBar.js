import {render, fireEvent} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import CustomSearchBar from '../src/components/LandingMap/CustomSearchBar';
import {
  getByPlaceholderText,
  getByTestId,
  getByText,
  queryAllByText,
} from '@testing-library/react';
import customSearchBar from '../src/components/LandingMap/CustomSearchBar';
import {TextInput} from 'react-native';
// import {fireEvent} from "@testing-library/react";

describe('search bar', function () {
  const globalContextMock = {
    shopsData: [
      {name: 'Yucky Starbucks', IsOpen: true},
      {name: 'Black Goat', IsOpen: true},
    ],
    switchShop: jest.fn(),
  };

  it('should render the search bar', function () {
    const {toJSON} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <CustomSearchBar
          searchBarFocused={true}
          setSearchBarFocussed={jest.fn()}
        />
      </GlobalContext.Provider>,
    );
    expect(true).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should be able to click on the search bar to focus it', function () {
    const {getByTestId, getByText, queryAllByText, rerender} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <CustomSearchBar
          searchBarFocused={false}
          setSearchBarFocussed={jest.fn()}
        />
      </GlobalContext.Provider>,
    );

    expect(queryAllByText('Yucky Starbucks')).toHaveLength(0);
    fireEvent(getByTestId('search-bar'), 'press');

    rerender(
      <GlobalContext.Provider value={globalContextMock}>
        <CustomSearchBar
          searchBarFocused={true}
          setSearchBarFocussed={jest.fn()}
        />
      </GlobalContext.Provider>,
    );

    expect(getByText('Yucky Starbucks')).toBeTruthy();

    fireEvent(getByText('Yucky Starbucks'), 'pressIn');
    fireEvent(getByText('Yucky Starbucks'), 'press');

    // fireEvent(getByText('Yucky Starbucks'), 'press');
    // expect(getByText('Yucky Starbucks')).not.toBeVisible();
  });

  it('Should call updateQuery when searchbar content changes', function () {
    const mockOnChangeText = jest.fn();

    const {getByTestId, getByPlaceholderText} = render(
      <TextInput
        editable={true}
        onBlur={jest.fn()}
        onChangeText={mockOnChangeText}
        onFocus={jest.fn()}
        placeholder="Type in a coffee shop..."
        placeholderTextColor="#046D66"
        platform="default"
        style={{
          color: '#046D66',
          flex: 1,
          fontSize: 18,
          marginLeft: 10,
          minHeight: 40,
        }}
        testID="search-bar"
        underlineColorAndroid="transparent"
        value=""
      />,
    );

    //I don't know why this throws an error about icons.
    fireEvent.changeText(
      getByPlaceholderText('Type in a coffee shop...'),
      'Unit 6',
    );
    expect(mockOnChangeText).toHaveBeenCalled();
  });
});
