// import React from 'react';
// import OptionsPopUp from '../src/components/ShopMenu/OptionsPopUp';
// import {GlobalContext} from '../App';
// import {ShopContext} from '../src/screens/ShopPage';
// import BasketPage from '../src/screens/BasketPage';
// import BasketItem from '../src/components/Basket/BasketItem';
// import BasketContents from '../src/components/Basket/BasketContents';
// import {fireEvent, render} from '@testing-library/react-native';
//
//
// import {
//   toBeEmpty,
//   toHaveTextContent,
// } from '@testing-library/jest-dom/dist/matchers';
// import {
//   fireEvent,
//   getByTestId,
//   getByText,
//   queryByTestId,
//   render,
// } from '@testing-library/react';
// import {Alert} from 'react-native';
// import renderer from 'react-test-renderer';
// import ShopPage from '../src/screens/ShopPage';
// import CustomButton from '../src/sub-components/CustomButton';
//
// expect.extend({toBeEmpty, toHaveTextContent});
//
// let globalContextMock = {
//   basketContent: null,
//   currShop: {Name: 'Eten & Driken', key: 1},
//   total: 2.5,
//   currentUser: {key: 1},
//   clearBasket: null,
//   addToBasket: jest.fn(),
//   removeFromBasket: jest.fn(),
// };
//
//
// let singularItem = {
//   count: 1,
//   ItemRef: 'Americano',
//   Quantity: 1,
//   Price: 2.5,
//   Type: 'Coffee',
//   options: [{Name: 'Dairy', Type: 'Milk', key: 1}],
//   Bean: 'Kenyan Single Origin',
// };
//
// describe('Options Pop Up', function () {
//   const spyAlert = jest
//     .spyOn(Alert, 'alert')
//     //@ts-ignore
//     .mockImplementation((title, message, callbackOrButtons) =>
//       callbackOrButtons[1].onPress(),
//     );
//
//   afterEach(() => spyAlert.mockClear());
//
//   // const {getByTestId, getByText, queryByTestId, toJSON} = render(
//   //   <GlobalContext.Provider value={globalContextMock}>
//   //     <OptionsPopUp />
//   //   </GlobalContext.Provider>,
//   // );
//
//   it('should render correctly', function () {
//     const {toJSON} = render(
//         <GlobalContext.Provider value={globalContextMock}>
//           <BasketContents item={singularItem}>
//             <OptionsPopUp />
//           </BasketContents>
//         </GlobalContext.Provider>,
//       );
//     expect(toJSON()).toMatchSnapshot();
//   });
//
//   // it('Should change the milk', async function () {
//   //   const setStateMock = jest.fn();
//   //   const useStateMock: any = (useState: any) => [useState, setStateMock];
//   //   jest.spyOn(React, 'useState').mockImplementation(useStateMock);
//   //
//   //
//   //   // Need to add addToBasket in mockGlobal context for this to work
//   //   expect(getByText('Dairy')).toBeTruthy();
//   //
//   //   fireEvent(getByText('Oat'), 'press');
//   //   expect(setStateMock).toHaveBeenLastCalledWith('Oat');
//   //   expect(await getByText('Dairy')).toHaveValue('Oat');
//   // });
// });

import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import SignUpPage from '../src/screens/SignUpPage';
import {Alert} from 'react-native';
import OptionsPopUp from '../src/components/ShopMenu/OptionsPopUp';
import renderers from '../src/renderers';
import {ShopContext} from '../src/screens/ShopPage';

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
      const {toJSON} = render(
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
      expect(true).toBe(true);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
