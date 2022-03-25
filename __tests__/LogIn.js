import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import App, {GlobalContext} from '../App';
import LogInPage from '../src/screens/LogInPage';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

describe('Login page', function () {
  it('should render correctly', function () {
    const {getByTestId, getByText, queryByTestId, toJSON} = render(
      <LogInPage />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("clicking on the 'new?' button takes you to sign up page", async function () {
    const component = <App />;

    const {queryByText, findByText} = render(component);
    const oldScreen = queryByText('Log in');
    const button = await findByText('New? Create an account');

    expect(oldScreen).toBeTruthy();

    fireEvent(button, 'press');
    const newScreen = await findByText('Sign up');

    expect(newScreen).toBeTruthy();
  });
  it('should trigger password reset on forgot password link', async function () {
    const logInPage = render(<LogInPage />);
    const toClick = await logInPage.findByText('Forgot your password?');
    fireEvent(toClick, 'press');
    jest.spyOn(Alert, 'alert');
    expect(Alert.alert).toHaveBeenCalledWith(
      'Please enter your email correctly in the field above to reset your password.',
    );
  });
});
