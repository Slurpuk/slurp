import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import SignUpPage from '../src/screens/SignUpPage';
import {Alert} from 'react-native';

describe('Signup page', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );
  afterEach(() => spyAlert.mockClear());

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

      fireEvent(getByText('Create Account'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Name');
    });

    it('should raise alert on submit with empty last name', async function () {
      const {getByText, getAllByPlaceholderText} = render(<SignUpPage />);

      const inputs = getAllByPlaceholderText('Jane');
      expect(inputs[0]).toBeTruthy();
      fireEvent.changeText(inputs[0], 'Jane');
      fireEvent(getByText('Create Account'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Name');
    });

    it('should raise alert on empty email', async function () {
      const {getByText, getByPlaceholderText} = render(<SignUpPage />);

      const name = getByPlaceholderText('Jane');
      const last_name = getByPlaceholderText('Doe');
      const email = getByPlaceholderText('janedoe@gmail.com');

      expect(name).toBeTruthy();
      expect(last_name).toBeTruthy();

      fireEvent.changeText(name, 'Jane');
      fireEvent.changeText(last_name, 'Doe');
      fireEvent.changeText(email, '');

      fireEvent(getByText('Create Account'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Email');
    });

    it('should raise alert on email with empty domain name', async function () {
      const {getByText, getByPlaceholderText} = render(<SignUpPage />);

      const name = getByPlaceholderText('Jane');
      const last_name = getByPlaceholderText('Doe');
      const email = getByPlaceholderText('janedoe@gmail.com');

      expect(name).toBeTruthy();
      expect(last_name).toBeTruthy();

      fireEvent.changeText(name, 'Jane');
      fireEvent.changeText(last_name, 'Doe');
      fireEvent.changeText(email, 'email@');

      fireEvent(getByText('Create Account'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Bad Email');
    });

    it('should raise alert on weak password', async function () {
      const {getByText, getByPlaceholderText, getAllByPlaceholderText} = render(<SignUpPage />);

      const name = getByPlaceholderText('Jane');
      const last_name = getByPlaceholderText('Doe');
      const email = getByPlaceholderText('janedoe@gmail.com');
      const password = getAllByPlaceholderText('');


      expect(name).toBeTruthy();
      expect(last_name).toBeTruthy();
      expect(email).toBeTruthy();

      fireEvent.changeText(name, 'Jane');
      fireEvent.changeText(last_name, 'Doe');
      fireEvent.changeText(email, 'janedoe@gmail.com');
      fireEvent.changeText(password[0], 'pass');
      fireEvent.changeText(password[1], 'pass');

      fireEvent(getByText('Create Account'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Weak password');
    });

    it('should raise alert on password confirmation not matching', async function () {
      const {getByText, getByPlaceholderText, getAllByPlaceholderText} = render(<SignUpPage />);

      const name = getByPlaceholderText('Jane');
      const last_name = getByPlaceholderText('Doe');
      const email = getByPlaceholderText('janedoe@gmail.com');
      const password = getAllByPlaceholderText('');


      expect(name).toBeTruthy();
      expect(last_name).toBeTruthy();
      expect(email).toBeTruthy();

      fireEvent.changeText(name, 'Jane');
      fireEvent.changeText(last_name, 'Doe');
      fireEvent.changeText(email, 'janedoe@gmail.com');
      fireEvent.changeText(password[0], 'Password123');
      fireEvent.changeText(password[1], 'Passw');

      fireEvent(getByText('Create Account'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Passwords do not match');
    });

    it('should not raise alert on valid data', async function () {
      const {getByText, getByPlaceholderText, getAllByPlaceholderText} = render(
        <SignUpPage />,
      );

      const name = getByPlaceholderText('Jane');
      const last_name = getByPlaceholderText('Doe');
      const email = getByPlaceholderText('janedoe@gmail.com');
      const password = getAllByPlaceholderText('');

      expect(name).toBeTruthy();
      expect(last_name).toBeTruthy();
      expect(email).toBeTruthy();
      expect(password).toBeTruthy();

      fireEvent.changeText(name, 'Jane');
      fireEvent.changeText(last_name, 'Doe');
      fireEvent.changeText(email, 'janedoe@gmail.com');
      fireEvent.changeText(password[0], 'Password123');
      fireEvent.changeText(password[1], 'Password123');


      fireEvent(getByText('Create Account'), 'press');

      expect(spyAlert).toHaveBeenCalledTimes(1);
    });
  });
});
