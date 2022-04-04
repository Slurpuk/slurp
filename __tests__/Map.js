import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';

import '@testing-library/jest-native/extend-expect';
import BasketItem from '../src/components/Basket/BasketItem';
import LandingMapPage from '../src/screens/LandingMapPage';
import {NavigationContainer} from '@react-navigation/native';
import MapBackground from '../src/components/LandingMap/MapBackground';
import ShopPage from '../src/screens/ShopPage';
import {check} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {getAllByTestId, getByTestId} from '@testing-library/react';
import {Alert} from 'react-native';
import dot from '../src/assets/images/dot.png';

const globalContextMock = {
  basketContent: null,
  currShop: {Name: 'Eten & Driken', key: 1},
  total: 2.5,
  currentUser: {key: 1, location: {latitude: 51, longitude: -0.01}},
  clearBasket: null,
  addToBasket: jest.fn(),
  removeFromBasket: jest.fn(),
  currentCenterLocation: {latitude: 51, longitude: -0.01},
  markers: [
    {coords: {latitude: 51, longitude: 0.2}, name: 'Starbucks', isOpen: true},
  ],
  shopsData: [
    {
      name: 'Yucky Starbucks',
      is_open: true,
      location: {latitude: 51.1, longitude: -0.012},
    },
    {
      name: 'Black Goat',
      is_open: false,
      location: {latitude: 50.9, longitude: -0.01},
    },
  ],
};

describe('Map page', function () {
  jest.mock('../../assets/images/dot.png', () => 'dot.png');

  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

  jest.mock('../../assets/images/dot.png', () => 1);

  test('Should render correctly and not give an alert if location permission is given', async () => {
    const {getByTestId} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <MapBackground
          searchBarFocused={false}
          setSearchBarFocussed={jest.fn()}
          setFocusMarker={{current: jest.fn()}}
          setRecenterVisible={jest.fn()}
        />
      </GlobalContext.Provider>,
    );

    await waitFor(() => {
      expect(getByTestId('map-background')).toBeTruthy();
      expect(spyAlert).not.toHaveBeenCalled();
      fireEvent(getByTestId('map-background'), 'press');
    });
  });

  it('should click on a marker correctly', () => {
    jest.mock('../src/helpers/locationHelpers', () => {
      const original = jest.requireActual('../src/helpers/locationHelpers');
      original.locationPress = jest.fn();
      return original;
    });

    const locationPress = jest.requireMock(
      '../src/helpers/locationHelpers',
    ).locationPress;
    const {getAllByTestId} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <MapBackground
          searchBarFocused={false}
          setSearchBarFocussed={jest.fn()}
          setFocusMarker={{current: jest.fn()}}
          setRecenterVisible={jest.fn()}
        />
      </GlobalContext.Provider>,
    );

    //click on a mocked marker on the app

    fireEvent(getAllByTestId('marker')[0], 'press');
    //see if the location pressed function gets called when the marker is pressed
    expect(locationPress).toHaveBeenCalled();
  });

  it('Should display that a marker is closed, if the shop is not open', async () => {
    globalContextMock.markers[0].is_open = false;

    const {getAllByTestId, getAllByText, queryByTestId, toJSON} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <MapBackground
          searchBarFocused={false}
          setSearchBarFocussed={jest.fn()}
          setFocusMarker={{current: jest.fn()}}
          setRecenterVisible={jest.fn()}
        />
      </GlobalContext.Provider>,
    );

    expect(getAllByTestId('marker')[1]).toBeTruthy();
    expect(getAllByText('Closed')).toHaveLength(1);
  });
});
