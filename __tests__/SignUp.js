import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import SignUpPage from '../src/screens/SignUpPage';
import {Alert} from 'react-native';

describe('Login page', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  describe('sing up', function () {
    it('should sign up a user', function () {
      const globalContextMock = {
        isFirstTime: false,
      };
      const {toJSON} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <SignUpPage />
        </GlobalContext.Provider>,
      );
      expect(true).toBe(true);
      expect(toJSON()).toMatchSnapshot();
    });

    it('should raise alert on submit with empty first name', async function () {
      const {getByText} = render(<SignUpPage />);

      fireEvent(getByText('Sign up'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty First Name');
    });

    it('should raise alert on submit with empty last name', async function () {
      const {getByText, getAllByPlaceholderText} = render(<SignUpPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();
      fireEvent.changeText(inputs[0], 'Jane');
      fireEvent(getByText('Sign up'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Last Name');
    });

    it('should raise alert on empty email', async function () {
      const {getByText, getAllByPlaceholderText} = render(<SignUpPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      fireEvent.changeText(inputs[0], 'Jane');
      fireEvent.changeText(inputs[1], 'Doe');

      fireEvent(getByText('Sign up'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Email');
    });

    it('should not raise alert on valid data', async function () {
      const {getByText, getAllByPlaceholderText} = render(<SignUpPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      const first_name = 'Jane';
      const last_name = 'Doe';
      const email = 'janedoe@gmail.com';
      const password = 'Password123';

      fireEvent.changeText(inputs[0], first_name);
      fireEvent.changeText(inputs[1], last_name);
      fireEvent.changeText(inputs[2], email);
      fireEvent.changeText(inputs[3], password);

      expect(inputs[1]).toBeTruthy();

      fireEvent(getByText('Sign up'), 'press');

      expect(spyAlert).toHaveBeenCalledTimes(0);
    });
  });
});
