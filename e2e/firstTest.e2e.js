import React from 'react';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });
  //
  it('should be able to sign up', async () => {
    await expect(element(by.id('emailfield'))).toBeVisible();

    let email = 're@gmail.com';
    let password = 'Password124';
    await element(by.id('email')).typeText(email);
    await element(by.id('password')).typeText(password);
    await element(by.text('Log in')).tap();
    await expect(element(by.id('emailfield'))).not.toBeVisible();
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
