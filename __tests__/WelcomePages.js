import {render} from '@testing-library/react-native';
import React from 'react';
import {GlobalContext} from '../App';
import SignUpPage from '../src/screens/SignUpPage';
import WelcomePages from "../src/screens/WelcomePages";
import {fireEvent} from "@testing-library/react";
import {ScrollView, Text} from "react-native";

describe('Welcome pages', function () {

  const globalContextMock = {
    isFirstTime: false,
    enterApp: jest.fn(),
  };

  it('Should render correctly', function () {

    const {toJSON} = render(
      <GlobalContext.Provider value={globalContextMock}>
        <WelcomePages navigation={{navigate: jest.fn()}}/>
      </GlobalContext.Provider>,
    );

    expect(true).toBe(true);
    expect(toJSON()).toMatchSnapshot();
  });

  it('Should render the first page on first render', function (){
    const {toJSON, getByTestId, getByText} = render(
        <GlobalContext.Provider value={globalContextMock}>
          <WelcomePages navigation={{navigate: jest.fn()}}/>
        </GlobalContext.Provider>,
    );
    expect(getByTestId('welcome-wrapper')).toBeTruthy();
    expect(getByTestId('welcome-header-one')).toHaveTextContent('Welcome');
    expect(getByText('Welcome to Slurp!')).toBeTruthy();
  });

  it('Should trigger the scroll handler when a scroll event is called', function (){
    // const {toJSON, getByTestId, getByText} = render(
    //     <GlobalContext.Provider value={globalContextMock}>
    //       <WelcomePages navigation={{navigate: jest.fn()}}/>
    //     </GlobalContext.Provider>,
    // );

    const onScrollMock = jest.fn();
    const {getByTestId} = render(
        <ScrollView testID="scroll-view" onScroll={onScrollMock}>
          <Text>XD</Text>
        </ScrollView>
    )

    const eventData = {
      nativeEvent: {
        contentOffset: {
          y: 200,
        },
      },
    };

    console.log((getByTestId('scroll-view')));

    fireEvent.scroll(getByTestId('scroll-view'), eventData);

  });
});