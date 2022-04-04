import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import BasketPage from '../src/screens/BasketPage';
import {Alert, Text, View} from 'react-native';
import BasketContents from '../src/components/Basket/BasketContents';
import {
  findAllByText,
  getByText,
  queryAllByText,
  queryByTestId,
  queryByText,
} from '@testing-library/react';
import '@testing-library/jest-native/extend-expect';
import {
  toBeEmpty,
  toHaveTextContent,
} from '@testing-library/jest-dom/dist/matchers';
import BasketItem from '../src/components/Basket/BasketItem';

expect.extend({toBeEmpty, toHaveTextContent});

const globalContextMock = {
  basketContent: null,
  currShop: {name: 'Eten & Driken', key: 1},
  total: 2.5,
  currentUser: {key: 1},
  clearBasket: null,
  addToBasket: jest.fn(),
  removeFromBasket: jest.fn(),
  currBasket: {
    data: [{key: 1, name: 'Latte', price: 2.5, quantity: 1, has_options: false}],
  },
};

describe('Basket page', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

  it('Should render the page', function () {
    const {getByTestId, getByText, queryByTestId} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <BasketPage />
      </GlobalContext.Provider>,
    );
    expect(true).toBe(true);
    expect(getByTestId('basket-page')).toBeTruthy();
  });

  it('Should render the price rounded to 2 decimal places', function () {
    const {getByText, queryByTestId, getAllByText} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <BasketPage />
      </GlobalContext.Provider>,
    );
    expect(getByText('TOTAL')).toBeTruthy();
    expect(getAllByText('£2.50')).toBeTruthy();
  });

  it('Should render the correct shop name', function () {
    const {getByText, queryByTestId, toJSON} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <BasketPage />
      </GlobalContext.Provider>,
    );
    expect(getByText(`${globalContextMock.currShop.name}`, {exact: false}));
  });

  it('Should not allow checkout with an empty basket', function () {
    globalContextMock.total = 0;

    globalContextMock.currBasket.data = [];

    const {getByText} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <BasketPage />
      </GlobalContext.Provider>,
    );

    fireEvent(getByText('Checkout'), 'press');
    expect(spyAlert).toHaveBeenCalled();
    expect(spyAlert.mock.calls[0][0]).toBe('Your basket is empty!');
  });

  it('Should throw location inaccessable if basket is valid but location permission is not given', function () {
    globalContextMock.total = 2.5;
    globalContextMock.currBasket.data = [
      {
        key: 1,
        ItemRef: 'Americano',
        Quantity: 1,
        Price: 2.5,
        Type: 'Coffee',
        Options: null,
      },
    ];

    const {getByText} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <BasketPage />
      </GlobalContext.Provider>,
    );

    fireEvent(getByText('Checkout'), 'press');
    expect(spyAlert).toHaveBeenCalled();
    expect(spyAlert.mock.calls[0][0]).toBe('Location inaccessible');
  });
});

describe('Basket Content', function () {
  let testItems = [
    {
      key: 1,
      ItemRef: 'Americano',
      Quantity: 1,
      Price: 2.5,
      Type: 'Coffee',
      options: [{Name: 'Dairy', Type: 'Milk', key: 1}],
      Bean: 'Kenyan Single Origin',
    },
    {
      key: 2,
      ItemRef: 'Espresso',
      Quantity: 2,
      Price: 1.7,
      Type: 'Coffee',
      options: [{Name: 'Oat', Type: 'Milk', key: 2}],
      Bean: 'Ethiopian Single Origin',
    },
    {
      key: 3,
      ItemRef: 'Latte',
      Quantity: 3,
      Price: 1.7,
      Type: 'Coffee',
      options: [{Name: 'Soy', Type: 'Milk', key: 3}],
      Bean: 'Kenyan Blend',
    },
    {
      key: 4,
      ItemRef: 'Latte',
      Quantity: 1,
      Price: 2.4,
      Type: 'Coffee',
      options: [{Name: 'Coconut', Type: 'Milk', key: 4}],
      Bean: 'Yucky Nescafe',
    },
    {
      key: 5,
      ItemRef: 'Latte',
      Quantity: 1,
      Price: 2.4,
      Type: 'Coffee',
      options: [
        {Name: 'Coconut', Type: 'Milk', key: 5},
        {Name: 'Caramel', Type: 'Syrup', key: 6},
      ],
      Bean: 'Yucky Nescafe',
    },
    {key: 8, ItemRef: 'Croissant', Quantity: 1, Price: 3.5, Type: 'Snack'},
  ];

  it('Should render a number of items equal to the number of unique recipes in basket', function () {
    const {getByText, getAllByText} = render(
      <BasketContents Items={testItems} />,
    );
    expect(getAllByText('+', {exact: false})).toHaveLength(testItems.length);
    expect(getAllByText('-', {exact: false})).toHaveLength(testItems.length);
  });

  it('Should not render any items when the basket is empty', async () => {
    const {queryAllByText, getByText, findAllByText} = render(
      <BasketContents Items={[]} />,
    );
    //It is safe to assume, if there are none of these symbols on the page, no basket items have been rendered.
    expect(await queryAllByText('+')).toHaveLength(0);
    expect(await queryAllByText('-')).toHaveLength(0);
    expect(await queryAllByText('£')).toHaveLength(0);
  });
});
