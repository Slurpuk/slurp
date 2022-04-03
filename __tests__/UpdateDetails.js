import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import UpdateDetailsPage from '../src/screens/UpdateDetailsPage';
import {Alert} from 'react-native';
import {GlobalContext} from '../App';

const globalContextMock = {
  currentUser: {
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane@doe.com',
  },
};

describe('Update details page', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

  describe('update details', function () {
    it('should raise alert on empty first name', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <UpdateDetailsPage />
        </GlobalContext.Provider>,
      );
      const textFields = getAllByPlaceholderText('');
      expect(textFields[0]).toBeTruthy();

      fireEvent.changeText(textFields[0], '');
      fireEvent(getByText('Update Details'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty First Name');
    });
    it('should raise alert on empty password', async function () {
      const {getByText} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <UpdateDetailsPage />
        </GlobalContext.Provider>,
      );

      fireEvent(getByText('Update Details'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Password');
    });
    it('should not raise alert on valid data', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <UpdateDetailsPage />
        </GlobalContext.Provider>,
      );
      const textFields = getAllByPlaceholderText('');
      expect(textFields[2]).toBeTruthy();

      fireEvent.changeText(textFields[2], 'Password123!');
      fireEvent(getByText('Update Details'), 'press');

      expect(spyAlert).toHaveBeenCalledTimes(0);
    });
  });
});
