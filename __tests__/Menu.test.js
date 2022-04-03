import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from "../App";
import {ShopContext} from "../src/screens/ShopPage";
import Menu from "../src/components/ShopMenu/Menu";

const myItem={
    image:
        'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18',
    price:5,
    has_options:false,
    key:1,
    name:'Latte',
    count:0,
};



const globalContextMock = {
    currShop: {name: 'Eten & Driken', key: 1},
    currentUser: {key: 1},
    clearBasket: null,
    addToBasket: jest.fn(),
    removeFromBasket: jest.fn(),
    currBasket:{
        data:[myItem]
    }
};

const shopContextMock = {
};


describe('Menu  Component', function () {


    it('Should display item image and name', function () {

        const {getByTestId} = render(
            <GlobalContext.Provider value={globalContextMock}>
                <ShopContext.Provider value={shopContextMock}>
                    <Menu/>
                </ShopContext.Provider>
            </GlobalContext.Provider>,
        );

    });


});
