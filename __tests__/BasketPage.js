import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import BasketPage from '../src/screens/BasketPage';
import {Alert, Text, View} from "react-native";
import BasketContents from "../src/components/Basket/BasketContents";
import {findAllByText, getByText, queryAllByText, queryByTestId, queryByText} from "@testing-library/react";
import '@testing-library/jest-native/extend-expect';
import {toBeEmpty, toHaveTextContent} from "@testing-library/jest-dom/dist/matchers";
import BasketItem from "../src/components/Basket/BasketItem";

expect.extend({ toBeEmpty, toHaveTextContent });

const globalContextMock = {
  basketContent: null,
  currShop: {Name: 'Eten & Driken', key: 1},
  total: 2.5,
  currentUser: {key: 1},
  clearBasket: null,
    addToBasket: jest.fn(),
    removeFromBasket: jest.fn(),
};

describe('Basket page', function () {
  const spyAlert = jest
      .spyOn(Alert, 'alert')
      //@ts-ignore
      .mockImplementation((title, message, callbackOrButtons) =>
          callbackOrButtons[1].onPress(),
      );

    afterEach(() => spyAlert.mockClear());


  it('Should render correctly', function () {

    const {getByTestId, getByText, queryByTestId, toJSON} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <BasketPage />
      </GlobalContext.Provider>,
    );
    expect(true).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should render the price rounded to 2 decimal places', function () {


    const {getByText, queryByTestId, toJSON} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <BasketPage />
        </GlobalContext.Provider>,
    );
    expect(getByText('TOTAL')).toBeTruthy();
    expect(getByText('£2.50')).toBeTruthy();

  });

  it("Should render the correct shop name", function (){

    const {getByText, queryByTestId, toJSON} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <BasketPage />
        </GlobalContext.Provider>,
    );
    expect(getByText(`${globalContextMock.currShop.Name}`, {exact: false}))
  })

  it("Should not allow checkout with an empty basket", function (){

    globalContextMock.total = 0;

    const {getByText} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <BasketPage />
        </GlobalContext.Provider>,
    );

    fireEvent(getByText('Checkout'), 'press');
    expect(spyAlert).toHaveBeenCalled();
    expect(spyAlert.mock.calls[0][0]).toBe('Empty basket.');

  })

  it("Should not create an alert with a valid basket", function (){

    globalContextMock.total = 2.50;
    globalContextMock.basketContent = [{key: 1, ItemRef: 'Americano', Quantity: 1, Price: 2.50, Type: 'Coffee', Options: null}];

    const {getByText} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <BasketPage />
        </GlobalContext.Provider>,
    );

    fireEvent(getByText('Checkout'), 'press');
    expect(spyAlert).toBeCalledTimes(0);

  })
});


describe('Basket Content', function (){

  let testItems = [
      {key: 1, ItemRef: 'Americano', Quantity: 1, Price: 2.50, Type: 'Coffee', options: [{Name: 'Dairy', Type: 'Milk', key: 1}], Bean:'Kenyan Single Origin'},
      {key: 1, ItemRef: 'Espresso', Quantity: 2, Price: 1.70, Type: 'Coffee', options: [{Name: 'Oat', Type: 'Milk', key: 1}], Bean:'Ethiopian Single Origin'},
      {key: 1, ItemRef: 'Latte', Quantity: 3, Price: 1.70, Type: 'Coffee', options: [{Name: 'Soy', Type: 'Milk', key: 1}], Bean:'Kenyan Blend'},
      {key: 1, ItemRef: 'Latte', Quantity: 1, Price: 2.40, Type: 'Coffee', options: [{Name: 'Coconut', Type: 'Milk', key: 1}], Bean:'Yucky Nescafe'},
      {key: 1, ItemRef: 'Latte', Quantity: 1, Price: 2.40, Type: 'Coffee', options: [{Name: 'Coconut', Type: 'Milk', key: 1}, {Name: 'Caramel', Type: 'Syrup', key: 2}], Bean:'Yucky Nescafe'},
      {key: 1, ItemRef: 'Croissant', Quantity: 1, Price: 3.50, Type: 'Snack'},
  ]

  it('Should render a number of items equal to the number of unique recipes in basket', function (){
    const {getByText, getAllByText} = render(
          <BasketContents Items={testItems}/>
    );
    expect(getAllByText('+', {exact: false})).toHaveLength(testItems.length);
    expect(getAllByText('-', {exact: false})).toHaveLength(testItems.length);
  });

  it('Should not render any items when the basket is empty', async () => {
      const {queryAllByText, getByText, findAllByText} = render(
          <BasketContents Items={[]}/>
      );
      //It is safe to assume, if there are none of these symbols on the page, no basket items have been rendered.
      expect(await queryAllByText('+')).toHaveLength(0);
      expect(await queryAllByText('-')).toHaveLength(0);
      expect(await queryAllByText('£')).toHaveLength(0);
  });

  it('Should correctly increase the total when the plus icon is pressed', async function (){

      const singularItem = {count: 1, ItemRef: 'Americano', Quantity: 1, Price: 2.50, Type: 'Coffee', options: [{Name: 'Dairy', Type: 'Milk', key: 1}], Bean:'Kenyan Single Origin'}

      const {getByText, queryAllByText} = render(
    
          <GlobalContext.Provider value={globalContextMock}>
            <BasketItem item={singularItem}/>
          </GlobalContext.Provider>
      );

      // Need to add addToBasket in mockGlobal context for this to work
      expect(getByText('1')).toBeTruthy();
      expect(await queryAllByText('2')).toHaveLength(0);

      fireEvent(getByText('+'), 'press');

      expect(await queryAllByText('1')).toHaveLength(0);
      expect(getByText('2')).toBeTruthy();

  });

    it('Should correctly decrease the total when the minus icon is pressed', async function (){

        const singularItem = {count: 2, ItemRef: 'Americano', Quantity: 2, Price: 2.50, Type: 'Coffee', options: [{Name: 'Dairy', Type: 'Milk', key: 1}], Bean:'Kenyan Single Origin'}

        const {getByText, queryAllByText} = render(

            <GlobalContext.Provider value={globalContextMock}>
                <BasketItem item={singularItem}/>
            </GlobalContext.Provider>
        );

        // Need to add addToBasket in mockGlobal context for this to work
        expect(getByText('2')).toBeTruthy();
        expect(await queryAllByText('1')).toHaveLength(0);

        fireEvent(getByText('-'), 'press');

        expect(await queryAllByText('2')).toHaveLength(0);
        expect(getByText('1')).toBeTruthy();

    })

})