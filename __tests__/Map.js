import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';

import '@testing-library/jest-native/extend-expect';
import BasketItem from "../src/components/Basket/BasketItem";
import LandingMapPage from "../src/screens/LandingMapPage";
import {NavigationContainer} from "@react-navigation/native";
import MapBackground from "../src/components/LandingMap/MapBackground";
import ShopPage from "../src/screens/ShopPage";
import {check} from "react-native-permissions";
import Geolocation from "react-native-geolocation-service";
import {getByTestId} from "@testing-library/react";
import {Alert} from "react-native";

const globalContextMock = {
  basketContent: null,
  currShop: {Name: 'Eten & Driken', key: 1},
  total: 2.5,
  currentUser: {key: 1},
  clearBasket: null,
  addToBasket: jest.fn(),
  removeFromBasket: jest.fn(),
    currentCenterLocation: {latitude: 51, longitude: -0.01},
    markers: [{coords: {latitude: 51, longitude: 0.2}, name: 'Starbucks', isOpen: true}]

};

describe('Map page', function () {

    const spyAlert = jest
        .spyOn(Alert, 'alert')
        //@ts-ignore
        .mockImplementation((title, message, callbackOrButtons) =>
            callbackOrButtons[1].onPress(),
        );

    afterEach(() => spyAlert.mockClear());

  test('Should render correctly and not give an alert if location permission is given', async () => {
      const {getByTestId} = render(
          <GlobalContext.Provider value={globalContextMock}>
              <MapBackground searchBarFocused={false} setSearchBarFocussed={jest.fn()}/>
          </GlobalContext.Provider>,
      );

      await waitFor(() => {
          expect(getByTestId('map-background')).toBeTruthy();
          expect(spyAlert).not.toHaveBeenCalled();
          fireEvent(getByTestId('map-background'), 'press');
      })
  });


    it('should click on a marker correctly', () => {

        jest.mock('../src/components/LandingMap/locationHelpers', () => {
            const original = jest.requireActual('../src/components/LandingMap/locationHelpers');
            original.locationPress = jest.fn();
            return original;
        });

        const locationPress = jest.requireMock('../src/components/LandingMap/locationHelpers').locationPress;
        const {getByTestId} = render(
            <GlobalContext.Provider value={globalContextMock}>
                <MapBackground searchBarFocused={false} setSearchBarFocussed={jest.fn()}/>
            </GlobalContext.Provider>,
        );

        //click on a mocked marker on the app
        fireEvent(getByTestId('marker'), 'press');
        //see if the location pressed function gets called when the marker is pressed
        expect(locationPress).toHaveBeenCalled();
    });

  it('Should display that a marker is closed, if the shop is not open', async ()=>{

      globalContextMock.markers[0].isOpen = false;

      const {getByTestId, getAllByText, queryByTestId, toJSON} = render(
          <GlobalContext.Provider value={globalContextMock}>
              <MapBackground/>
          </GlobalContext.Provider>
      );

      expect(getByTestId('marker')).toBeTruthy();
      expect(getAllByText("Closed")).toHaveLength(1);

  })
})