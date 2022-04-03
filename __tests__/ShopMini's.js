import {render} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import ShopCard from '../src/components/Shops/ShopCard';

describe('Shop card', function () {
  it('should render a shop card as closed when is_open is false', function () {
    const globalContextMock = {
      locationIsEnabled: false,
      changeShop: jest.fn(),
    };
    const {getByText, getByTestId} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <ShopCard shop={{name: 'cafe', is_open: false, image: null}} />
      </GlobalContext.Provider>,
    );

    //SHould render correct title but be closed when closed
    expect(true).toBe(true);
    expect(getByTestId('shop-card-closed')).toBeTruthy();
    expect(getByText('CLOSED')).toBeTruthy();
    expect(getByText('cafe')).toBeTruthy();
  });

  it('should render a shop card as open', function () {
    const globalContextMock = {
      locationIsEnabled: true,
      changeShop: jest.fn(),
    };
    const {queryByText, getByText, getByTestId} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <ShopCard
          shop={{name: 'cafe', is_open: true, image: null, distanceTo: 500}}
        />
      </GlobalContext.Provider>,
    );

    //check that the card exists
    expect(getByTestId('shop-card-open')).toBeTruthy();
    //check the open status
    expect(queryByText('CLOSED')).toBeFalsy();
    //expect shop title to match arguments
    expect(getByText('cafe')).toBeTruthy();
    //shop details should render if shop is open
    expect(getByTestId('shop-details')).toBeTruthy();
    //shop detail text should match distanceTo
    expect(getByText('7 mins')).toBeTruthy();
  });
});
