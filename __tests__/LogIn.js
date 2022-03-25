import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import LogInPage from '../src/screens/LogInPage';

describe('Login page', function () {
  it('should render correctly', function () {
    const globalContextMock = {
      isFirstTime: false,
    };
    const {getByTestId, getByText, queryByTestId, toJSON} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <LogInPage />
      </GlobalContext.Provider>,
    );
    expect(true).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });
});
