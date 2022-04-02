import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import BasketPage from '../src/screens/BasketPage';

describe('Basket page', function () {
  it('Should render correctly', function () {
    const globalContextMock = {
      basketContent: null,
      currShop: {Name: 'Eten & Driken', key: 1},
      total: 20.1093,
      currentUser: {key: 1},
      clearBasket: null,
    };

    const {getByTestId, getByText, queryByTestId, toJSON} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <BasketPage />
      </GlobalContext.Provider>,
    );
    expect(true).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should render the price rounded to 2 decimal places', function () {
    const globalContextMock = {
      basketContent: null,
      currShop: {Name: 'Eten & Driken', key: 1},
      total: 20.1093,
      currentUser: {key: 1},
      clearBasket: null,
    };

    const {getByTestId, getByText, queryByTestId, toJSON} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <BasketPage />
        </GlobalContext.Provider>,
    );

  });
});