import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import LogInPage from '../src/screens/LogInPage';
import {Alert} from 'react-native';

describe('Login page', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

  describe('log in', function () {
    it('should raise alert on submit with empty email', async function () {
      const {getByText} = render(<LogInPage />);

      fireEvent(getByText('Log in'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Email');
    });
    it('should raise alert on email without @', async function () {
      const {getByText, getAllByPlaceholderText} = render(<LogInPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      fireEvent.changeText(inputs[0], 'emailwithoutaroba.com');

      fireEvent(getByText('Log in'), 'press');
      console.log(spyAlert.mock);
      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Bad Email');
    });
    it('should raise alert on email with empty domain name', async function () {
      const {getByText, getAllByPlaceholderText} = render(<LogInPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      fireEvent.changeText(inputs[0], 'email@');

      fireEvent(getByText('Log in'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Bad Email');
    });
    it('should raise alert on empty password', async function () {
      const {getByText, getAllByPlaceholderText} = render(<LogInPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      fireEvent.changeText(inputs[0], 'janedoe@gmail.com');

      expect(inputs[1]).toBeTruthy();

      fireEvent(getByText('Log in'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Password');
    });
    it('should not raise alert on valid data', async function () {
      const {getByText, getAllByPlaceholderText} = render(<LogInPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      const email = 'janedoe@gmail.com';
      const password = 'Password123';

      fireEvent.changeText(inputs[0], email);
      fireEvent.changeText(inputs[1], password);

      expect(inputs[1]).toBeTruthy();

      fireEvent(getByText('Log in'), 'press');

      expect(spyAlert).toHaveBeenCalledTimes(0);
    });
  });
  describe('forgot password', function () {
    it('should raise alert on empty email when clicking forgot password', async function () {
      const {getByText, getAllByPlaceholderText} = render(<LogInPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      fireEvent.changeText(inputs[0], '');

      fireEvent(getByText('Forgot your password?'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Add Email');
    });
    it('should raise alert on faulty email when clicking forgot password', async function () {
      const {getByText, getAllByPlaceholderText} = render(<LogInPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      fireEvent.changeText(inputs[0], 'emailwithoutaroba');

      fireEvent(getByText('Forgot your password?'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Add Email');
    });
    it('should not raise alert when clicking forgot password with valid email', async function () {
      const {getByText, getAllByPlaceholderText} = render(<LogInPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      fireEvent.changeText(inputs[0], '9jumpingpotatoes@gmail.com');

      fireEvent(getByText('Forgot your password?'), 'press');

      expect(spyAlert).toHaveBeenCalledTimes(0);
    });
  });
});
