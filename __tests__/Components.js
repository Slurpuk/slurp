import renderer from 'react-test-renderer';
import React from 'react';
import CustomButton from '../src/sub-components/CustomButton';
import GreenHeader from '../src/sub-components/GreenHeader';
import {fireEvent, render} from '@testing-library/react-native';
import {
  getAllByTestId,
  getByTestId,
  queryByTestId,
} from '@testing-library/react';
import WhiteArrowButton from '../src/sub-components/WhiteArrowButton';
import ShopList from '../src/components/Shops/ShopList';
import {GlobalContext} from '../App';
import WhiteArrowButton from '../src/sub-components/WhiteArrowButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {Alert} from 'react-native';
import {render} from '@testing-library/react';

describe('Components', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

describe('Custom sub-components', function () {
  describe('button', function () {
    it('should render correctly with number indicator', function () {
      const {getByTestId} = render(<CustomButton optionalNumber={5} />);
      expect(getByTestId('custom-button')).toBeTruthy();
    });

    it('Should have the text and optional number match inputs', function () {
      const mockOnPress = jest.fn();
      const {getByText} = render(
        <CustomButton
          optionalNumber={5}
          text="test button"
          onPress={mockOnPress}
        />,
      );
      //button with correct text should exist
      expect(getByText('test button')).toBeTruthy();
      //button should not throw error when pressed
      fireEvent(getByText('test button'), 'press');
      //onPress function should be called when pressed
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });
  describe('green header', function () {
    it('Should have text match the input and render white arrow button', function () {
      const {getByText, getByTestId} = render(
        <GreenHeader headerText={'cafe Combi'} />,
      );
      expect(getByText('cafe Combi')).toBeTruthy();
      expect(getByTestId('white-arrow-pressable')).toBeTruthy();
    });
  });

  describe('White arrow button', function () {
    it('Should render the arrow with pressable working', function () {
      const mockOnPress = jest.fn();
      const {getByTestId} = render(
        <WhiteArrowButton direction="left" onPressAction={mockOnPress} />,
      );
      //pressing the white arrow should not throw an error
      fireEvent(getByTestId('white-arrow-pressable'), 'press');
      //the on press function is called when the button is pressed
      expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Shop list and card', function () {
    it('Should render the shop list with empty text when no shops are passed in', function () {
      const {getByTestId, getByText, queryByTestId} = render(
        <ShopList data={[]} />,
      );

      expect(true).toBeTruthy();
      expect(
        getByText('It looks like there are no coffee shops close by', {
          exact: false,
        }),
      ).toBeTruthy();
      expect(queryByTestId('shop-card-open')).toBeFalsy();
      expect(queryByTestId('shop-card-closed')).toBeFalsy();
    });

    it('Should render the correct amount of items in the shopList', function () {
      const globalContextMock = {
        locationIsEnabled: false,
      };

      const {getByTestId, getByText, queryAllByTestId} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <ShopList
            data={[
              {
                key: 1,
                is_open: true,
                image: null,
                name: 'Yucky Starbucks',
                distance_to: 500,
              },
              {
                key: 2,
                is_open: true,
                image: null,
                name: 'Cafe Combi',
                distance_to: 700,
              },
              {
                key: 3,
                is_open: false,
                image: null,
                name: 'Cafe Combi',
                distance_to: 700,
              },
            ]}
          />
        </GlobalContext.Provider>,
      );
      expect(queryAllByTestId('shop-card-open')).toHaveLength(2);
      expect(queryAllByTestId('shop-card-closed')).toHaveLength(1);
    });
  });
});
