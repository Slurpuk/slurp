import {initialiseFirebase, initialiseFirestore} from './firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';

let db;
let auth;

describe('Sign up', () => {
  beforeAll(async () => {
    const app = initialiseFirebase();
    db = initialiseFirestore(app);
    auth = initialiseFirebase(app);

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should be able to sign up', async () => {
    await expect(element(by.id('emailfield'))).toBeVisible();

    let email = 'me@liamclark.com';
    let password = 'Password123';
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
