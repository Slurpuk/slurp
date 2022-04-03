import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import ChangePasswordPage from '../src/screens/ChangePasswordPage';
import {Alert} from 'react-native';

describe('Change password page', function () {
  const spyAlert = jest
    .spyOn(Alert, 'alert')
    //@ts-ignore
    .mockImplementation((title, message, callbackOrButtons) =>
      callbackOrButtons[1].onPress(),
    );

  afterEach(() => spyAlert.mockClear());

  describe('change password', function () {
    it('should raise alert on empty old password', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <ChangePasswordPage />,
      );

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      const newPass = 'Password124!';
      const newPassConfirmation = 'Password124!';

      fireEvent.changeText(inputs[1], newPass);
      fireEvent.changeText(inputs[2], newPassConfirmation);

      fireEvent(getByText('Update Password'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Password');
    });
    it('should raise alert on empty new password', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <ChangePasswordPage />,
      );

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      const oldPass = 'Password123!';
      const newPassConfirmation = 'Password124!';

      fireEvent.changeText(inputs[0], oldPass);
      fireEvent.changeText(inputs[2], newPassConfirmation);

      fireEvent(getByText('Update Password'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Password');
    });
    it('should raise alert on empty new password confirmation', async function () {
      const {getByText, getAllByPlaceholderText: getAllByPlaceholderText} =
        render(<ChangePasswordPage />);

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      const oldPass = 'Password123!';
      const newPass = 'Password124!';

      fireEvent.changeText(inputs[0], oldPass);
      fireEvent.changeText(inputs[1], newPass);

      fireEvent(getByText('Update Password'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Empty Password Confirmation');
    });
    it('should raise alert on password mismatch', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <ChangePasswordPage />,
      );

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      const oldPass = 'Password123!';
      const newPass = 'Password124!';
      const newPassConfirmation = 'Password125!';

      fireEvent.changeText(inputs[0], oldPass);
      fireEvent.changeText(inputs[1], newPass);
      fireEvent.changeText(inputs[2], newPassConfirmation);

      expect(inputs[1]).toBeTruthy();

      fireEvent(getByText('Update Password'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Password Mismatch');
    });
    it('should raise alert on weak password', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <ChangePasswordPage />,
      );

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      const oldPass = 'Password123!';
      const newPass = 'Pass12';
      const newPassConfirmation = 'Pass12';

      fireEvent.changeText(inputs[0], oldPass);
      fireEvent.changeText(inputs[1], newPass);
      fireEvent.changeText(inputs[2], newPassConfirmation);

      fireEvent(getByText('Update Password'), 'press');

      expect(spyAlert).toHaveBeenCalled();
      expect(spyAlert.mock.calls[0][0]).toBe('Weak password');
    });
    it('should not raise alert on valid data', async function () {
      const {getByText, getAllByPlaceholderText} = render(
        <ChangePasswordPage />,
      );

      const inputs = getAllByPlaceholderText('');
      expect(inputs[0]).toBeTruthy();

      const oldPass = 'Password123!';
      const newPass = 'Password124$';
      const newPassConfirmation = 'Password124$';

      fireEvent.changeText(inputs[0], oldPass);
      fireEvent.changeText(inputs[1], newPass);
      fireEvent.changeText(inputs[2], newPassConfirmation);

      fireEvent(getByText('Update Password'), 'press');

      expect(spyAlert).toHaveBeenCalledTimes(0);
    });
  });
});
