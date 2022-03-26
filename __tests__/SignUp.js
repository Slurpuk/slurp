import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import SignUpPage from '../src/screens/SignUpPage';

describe('sing up', function () {
  it('should sign up a user', function () {
    const globalContextMock = {
      isFirstTime: false,
    };
    const {getByTestId, getByText, queryByTestId, toJSON} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <SignUpPage />
      </GlobalContext.Provider>,
    );
    expect(true).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });
});
