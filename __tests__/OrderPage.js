import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {CurrentOrders} from '../src/components/Orders/CurrentOrders';
import {OrderStatus} from '../src/data/OrderStatus';
import CollapsableOrder from '../src/components/Orders/CollapsableOrder';
import {PastOrders} from '../src/components/Orders/PastOrders';
import {GlobalContext} from '../src/App';

describe('Order Page', function () {
  const globalContextMock = {
    currentUser: {
      location: {
        _latitude: 51,
        _longitude: 0.01,
      },
    },
  };

  it('Should show a number of items equal to length of currentOrders', function () {
    const {getAllByTestId, queryByText} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <CurrentOrders
          emptyText="no current orders"
          currentOrders={[
            {
              status: OrderStatus.INCOMING,
              items: [],
              shop: {
                name: 'Yucky Starbucks',
                image: null,
                location: {latitude: 51, longitude: -0.01},
              },
              incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
            },
            {
              status: OrderStatus.INCOMING,
              items: [],
              shop: {
                name: 'Black Goat',
                image: null,
                location: {latitude: 51, longitude: -0.01},
              },
              incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
            },
          ]}
        />
      </GlobalContext.Provider>,
    );

    expect(queryByText('no current orders')).toBeFalsy();
    expect(getAllByTestId('order-card')).toHaveLength(2);
    expect(queryByText('no current orders')).toBeFalsy();
  });

  it('Should show the correct title based on the passed in value', function () {
    const {getByText, queryByText} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <CurrentOrders
          emptyText="no current orders"
          currentOrders={[
            {
              status: OrderStatus.INCOMING,
              items: [],
              shop: {
                name: 'Yucky Starbucks',
                image: null,
                location: {latitude: 51, longitude: -0.01},
              },
              incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
            },
          ]}
        />
      </GlobalContext.Provider>,
    );
    expect(getByText('Yucky Starbucks')).toBeTruthy();
  });

  it('Should be pressable', function () {
    const {getByText, getAllByTestId, getByTestId} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <CurrentOrders
          emptyText="no current orders"
          currentOrders={[
            {
              status: OrderStatus.ACCEPTED,
              items: [{name: 'Latte', quantity: 1, has_options: false}],
              shop: {
                name: 'Yucky Starbucks',
                image: null,
                location: {
                  longitude: 51.2,
                  latitude: 0.011,
                },
              },
              incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
            },
            {
              status: OrderStatus.READY,
              items: [],
              shop: {
                name: 'Black Goat',
                image: null,
                location: {
                  longitude: 51.21,
                  latitude: 0.013,
                },
              },
              incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
            },
          ]}
        />
      </GlobalContext.Provider>,
    );
    expect(getByText('Yucky Starbucks')).toBeTruthy();
    fireEvent(getAllByTestId('order-card')[0], 'press');
  });

  it('Should display the name and options of a given item ', function () {
    const {getByText, getAllByText, getAllByTestId, queryByText} = render(
      <CollapsableOrder
        order={{
          status: OrderStatus.ACCEPTED,
          items: [
            {
              name: 'mochacuppafrappechinolatte',
              quantity: 3,
              has_options: false,
            },
            {
              name: 'Latte',
              quantity: 1,
              has_options: true,
              options: [{name: 'Caramel', type: 'Syrup'}],
            },
          ],
          shop: {
            name: 'Yucky Starbucks',
            image: null,
            location: {
              longitude: 51.2,
              latitude: 0.011,
            },
          },
          incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
        }}
      />,
    );
    //check element actually exists
    expect(getAllByTestId('item-wrapper')).toBeTruthy();

    //check element name matches passed name
    expect(
      getByText('mochacuppafrappechinolatte', {exact: false}),
    ).toBeTruthy();

    //check quantity is correct
    expect(getAllByText('3', {exact: false})).toHaveLength(1);

    //check that options are correct on the item
    expect(getByText('Caramel', {exact: false})).toBeTruthy();

    //check that options name is actually correct
    expect(queryByText('Hazelnut', {exact: false})).toBeFalsy();
  });

  it('Should display items wheen they are passed in as props', function () {
    const {getByText, getByTestId, queryAllByText, queryByText} = render(
      <PastOrders
        emptyText="no past orders"
        pastOrders={[
          {
            title: 'January',
            data: [
              {
                shop: {
                  name: 'cafe combi',
                  location: {
                    longitude: 51.2,
                    latitude: 0.011,
                  },
                },
                incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
                status: OrderStatus.INCOMING,
                items: [
                  {
                    name: 'My Special latte',
                    price: 2,
                    quantity: 1,
                    has_options: false,
                  },
                ],
              },
            ],
          },
        ]}
      />,
    );

    expect(queryByText('no past orders', {exact: false})).toBeFalsy();
    expect(queryAllByText('My Special latte', {exact: false})).toBeTruthy();
  });

  it('Should render the empty text when there are no past orders', function () {
    const {getByText, queryByText} = render(
      <PastOrders emptyText="no past orders" pastOrders={[]} />,
    );

    expect(getByText('no past orders')).toBeTruthy();
    expect(queryByText('My Special latte')).toBeFalsy();
  });
});
