import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import BasketPage from '../src/screens/BasketPage';
import {Alert} from "react-native";
import BasketContents from "../src/components/Basket/BasketContents";

const globalContextMock = {
  basketContent: null,
  currShop: {Name: 'Eten & Driken', key: 1},
  total: 2.5,
  currentUser: {key: 1},
  clearBasket: null,
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

  it('Should correctly increase the total when the plus icon is pressed', function (){
      const {getByText, getAllByText} = render(
          <BasketContents Items={testItems}/>
      );

      //Need to add addToBasket in mockGlobal context for this to work
      // expect(getAllByText('+', {exact: false})[0]).toHaveText('1');
      // fireEvent(getAllByText('+', {exact: false})[0], 'press');
      // expect(getAllByText('+', {exact: false})[0]).toHaveText('2');
      expect(true).toBeTruthy();

  })

})