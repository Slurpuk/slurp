import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {CurrentOrders} from '../src/components/Orders/CurrentOrders';
import {OrderStatus} from '../src/data/OrderStatus';
import {
  getAllByTestId,
  getByText,
  queryByTestId,
  queryByText,
} from '@testing-library/react';
import OrderItemsList from '../src/components/Orders/OrderItemsList';
import CollapsableOrder from '../src/components/Orders/CollapsableOrder';
import {PastOrders} from '../src/components/Orders/PastOrders';
import {SectionList, SectionListData, Text, View} from 'react-native';

describe('Order Page', function () {
  it('Should show the empty text when current orders is empty', function () {
    const {toJSON, getByText} = render(
      <CurrentOrders emptyText="no current orders" currentOrders={[]} />,
    );

    expect(true).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
    expect(getByText('no current orders')).toBeTruthy();
  });

  it('Should show a number of items equal to length of currentOrders', function () {
    const {getAllByTestId, queryByText} = render(
      <CurrentOrders
        emptyText="no current orders"
        currentOrders={[
          {
            status: OrderStatus.INCOMING,
            items: [],
            shop: {name: 'Yucky Starbucks', image: null},
            incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
          },
          {
            status: OrderStatus.INCOMING,
            items: [],
            shop: {name: 'Black Goat', image: null},
            incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
          },
        ]}
      />,
    );

    expect(true).toBeTruthy();
    expect(queryByText('no current orders')).toBeFalsy();
    expect(getAllByTestId('order-card')).toHaveLength(2);
    expect(queryByText('no current orders')).toBeFalsy();
  });

  it('Should show the correct title based on the passed in value', function () {
    const {getByText, queryByText} = render(
      <CurrentOrders
        emptyText="no current orders"
        currentOrders={[
          {
            status: OrderStatus.INCOMING,
            items: [],
            shop: {name: 'Yucky Starbucks', image: null},
            incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
          },
        ]}
      />,
    );
    expect(getByText('Yucky Starbucks')).toBeTruthy();
  });

  it('Should be pressable', function () {
    const {getByText, getAllByTestId, getByTestId} = render(
      <CurrentOrders
        emptyText="no current orders"
        currentOrders={[
          {
            status: OrderStatus.ACCEPTED,
            items: [{name: 'Latte', quantity: 1, has_options: false}],
            shop: {name: 'Yucky Starbucks', image: null},
            incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
          },
          {
            status: OrderStatus.READY,
            items: [],
            shop: {name: 'Black Goat', image: null},
            incoming_time: {toDate: jest.fn(() => new Date(Date.now()))},
          },
        ]}
      />,
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
          shop: {name: 'Yucky Starbucks', image: null},
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
    expect(getAllByText('3', {exact: false})).toHaveLength(2);

    //check that options are correct on the item
    expect(getByText('Caramel', {exact: false})).toBeTruthy();

    //check that options name is actually correct
    expect(queryByText('Hazelnut', {exact: false})).toBeFalsy();
  });

  // it('Should display the no past orders text when past orders is empty', function () {
  //   const {getByText, getByTestId, queryByTestId, queryByText} = render(
  //     <PastOrders
  //       emptyText="no past orders"
  //       pastOrders={[
  //         {
  //           title: 'January',
  //           data: [{name: 'Latte', price: 2, quantity: 1, has_options: false}],
  //         },
  //         {
  //           title: 'February',
  //           data: [{name: 'Flat', price: 2.5, quantity: 1, has_options: false}],
  //         },
  //       ]}
  //     />,
  //   );
  //
  //   expect(getByText('no past orders', {exact: false})).toBeTruthy();
  // });
});

export default function TestingScreen() {
  const _renderItem = ({section}: {section: SectionListData<any>}) => {
    return (
      <View style={{width: '100%', height: 10}}>
        {/*<Text>{'Hi! ' + section.data[0].id}</Text>*/}
      </View>
    );
  };

  return (
    <View>
      <SectionList
        renderItem={_renderItem}
        sections={[
          {
            title: 'Section1',
            data: [{name: 'Flat', price: 2.5, quantity: 1, has_options: false}],
          },
          {
            title: 'Section2',
            data: [{name: 'Flat', price: 2.5, quantity: 1, has_options: false}],
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
}

// Tests ------

test('Testing sectionlist', async () => {
  const wrapper = <TestingScreen />;

  const {debug, unmount} = render(wrapper);

  debug();

  unmount();
});
