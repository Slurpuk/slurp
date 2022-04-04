import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import {ShopContext} from "../src/screens/ShopPage";
import MenuItem from "../src/components/ShopMenu/MenuItem";


const myCount2Item={
    image:
        'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18',
    price:5,
    has_options:false,
    key:1,
    name:'Latte',
    count:2,
};
const myCount0Item={
    image:
        'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18',
    price:5,
    has_options:false,
    key:1,
    name:'Latte',
    count:0,
};
const myOptionsItem={
    image:
        'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18',
    price:5,
    has_options:true,
    key:1,
    name:'Latte',
    count:0,
};


const count2GlobalContextMock = {
    currShop: {name: 'Eten & Driken', key: 1},
    currentUser: {key: 1},
    clearBasket: null,
    addToBasket: jest.fn(),
    removeFromBasket: jest.fn(),
    currBasket:{
        data:[myCount2Item]
    }
};
const count0GlobalContextMock = {
    currShop: {name: 'Eten & Driken', key: 1},
    currentUser: {key: 1},
    clearBasket: null,
    addToBasket: jest.fn(),
    removeFromBasket: jest.fn(),
    currBasket:{
        data:[myCount0Item]
    }
};
const optionsGlobalContextMock = {
    currShop: {name: 'Eten & Driken', key: 1},
    currentUser: {key: 1},
    clearBasket: null,
    addToBasket: jest.fn(),
    removeFromBasket: jest.fn(),
    currBasket:{
        data:[myOptionsItem]
    }
};

const shopContextMock = {
};


describe('Menu Item Component', function () {

    it('Should display item image and name', function () {

        const {getByTestId} = render(
            <GlobalContext.Provider value={count2GlobalContextMock}>
                <ShopContext.Provider value={shopContextMock}>
                    <MenuItem item={myCount2Item}/>
                </ShopContext.Provider>
            </GlobalContext.Provider>,
        );
        const image=getByTestId('menuItemImage');
        expect(image).toBeTruthy();
        const name=getByTestId('menuItemName');
        expect(name).toBeTruthy();
        expect(name.props.children).toBe('Latte');
        expect(image.props.source.uri).toBe('https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FDefaultICS.jpeg?alt=media&token=f76c477f-b60a-4c0d-ac15-e83c0e179a18');
    });
    it('Should display price to 2 decimal places', function () {

        const {getByTestId} = render(
            <GlobalContext.Provider value={count2GlobalContextMock}>
                <ShopContext.Provider value={shopContextMock}>
                    <MenuItem item={myCount2Item}/>
                </ShopContext.Provider>
            </GlobalContext.Provider>,
        );

        const price=getByTestId('menuItemPrice');
        expect(price).toBeTruthy();
        expect(price.props.children[1]).toBe('5.00');


    });
    it('Should display add item icon when count=0 and item doesnt have options', function () {

        const {getByTestId} = render(
            <GlobalContext.Provider value={count0GlobalContextMock}>
                <ShopContext.Provider value={shopContextMock}>
                    <MenuItem item={myCount0Item}/>
                </ShopContext.Provider>
            </GlobalContext.Provider>,
        );

        const icon=getByTestId('menuItemAddIcon');
        expect(icon).toBeTruthy();
        expect(icon.props.children[0]).toBe(' ');
        expect(icon.props.children[1]).toBe('+');


    });
    it('Should display number 2 icon when count!=0 and item doesnt have options', function () {

        const {getByTestId} = render(
            <GlobalContext.Provider value={count2GlobalContextMock}>
                <ShopContext.Provider value={shopContextMock}>
                    <MenuItem item={myCount2Item}/>
                </ShopContext.Provider>
            </GlobalContext.Provider>,
        );

        const icon=getByTestId('menuItemAddIcon');
        expect(icon).toBeTruthy();
        expect(icon.props.children[0]).toBe(' ');
        expect(icon.props.children[1]).toBe(2);


    });
    it('Should call respective function item HAS options', function () {

        const {getByTestId} = render(
            <GlobalContext.Provider value={optionsGlobalContextMock}>
                <ShopContext.Provider value={shopContextMock}>
                    <MenuItem item={myOptionsItem}/>
                </ShopContext.Provider>
            </GlobalContext.Provider>,
        );

        const buttonMenuItem=getByTestId('buttonMenuItem');
        fireEvent(buttonMenuItem,'press');
        const overallButtonMenuItem=getByTestId('overallButtonMenuItem');
        fireEvent(overallButtonMenuItem,'press');


    });
    it('Should call respective function item doesnt have options', function () {


        const {getByTestId} = render(
            <GlobalContext.Provider value={count0GlobalContextMock}>
                <ShopContext.Provider value={shopContextMock}>
                    <MenuItem item={myCount0Item}/>
                </ShopContext.Provider>
            </GlobalContext.Provider>,
        );

        const buttonMenuItem=getByTestId('buttonMenuItem');
        fireEvent(buttonMenuItem,'press');
        const overallButtonMenuItem=getByTestId('overallButtonMenuItem');
        fireEvent(overallButtonMenuItem,'press');


    });


});
