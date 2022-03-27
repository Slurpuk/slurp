import firestore from '@react-native-firebase/firestore';
import {fireEvent, render} from '@testing-library/react-native';
import LogInPage from '../src/screens/LogInPage';
import React from 'react';
import auth from '@react-native-firebase/auth';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  //
  it('should be able to sign up', async () => {
    async function registerUser() {
      await auth()
        .createUserWithEmailAndPassword('detoxuser@gmail.com', 'Password123')
        .then(async () => {
          await firestore().collection('Users').add({
            Email: 'detoxuser@gmail.com',
            FirstName: 'Detox',
            LastName: 'Tester',
          });
        });
    }
    await registerUser();

    const {getByText, getAllByPlaceholderText} = render(<LogInPage />);

    const inputs = getAllByPlaceholderText('');
    expect(inputs[0]).toBeTruthy();

    const email = 'detoxuser@gmail.com';
    const password = 'Password123';

    fireEvent.changeText(inputs[0], email);
    fireEvent.changeText(inputs[1], password);

    expect(inputs[1]).toBeTruthy();

    fireEvent(getByText('Log in'), 'press');

    await expect(element(by.id('emailfield'))).toBeVisible();
  });
  //
  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });
  //
  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
