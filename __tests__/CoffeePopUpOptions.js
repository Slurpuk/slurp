import {render} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../src/contexts';
import {Alert} from 'react-native';
import OptionsPopUp from '../src/components/ShopMenu/OptionsPopUp';
import renderers from '../src/components/ShopMenu/renderers';
import {ShopContext} from '../src/screens/ShopPage';
import {getByTestId} from '@testing-library/react';

describe('Coffee Pop Up', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );
  afterEach(() => spyAlert.mockClear());

  const shopContextMock = {
    setOptionsVisible: jest.fn(),
    setCurrItem: jest.fn(),
    menuData: {
      defaultMilk: 'Dairy',
    },
  };

  describe('coffee options', function () {
    it('should sign up a user', function () {
      const globalContextMock = {
        isFirstTime: false,
      };
      const {getByTestId} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <ShopContext.Provider value={shopContextMock}>
            <OptionsPopUp
              data={[]}
              item={{
                name: 'Latte',
                price: 2.5,
                quantity: 2,
                has_options: false,
              }}
              renderer={renderers.renderOption}
            />
          </ShopContext.Provider>
        </GlobalContext.Provider>,
      );
      expect(getByTestId('options_pop_up')).toBeTruthy();
    });
  });
});
