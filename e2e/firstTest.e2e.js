import {initialiseFirebase, initialiseFirestore} from './firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';

let db;
let auth;

describe('Sign up', () => {
  beforeAll(async () => {
    const app = initialiseFirebase();
    db = initialiseFirestore(app);
    auth = initialiseAuth(app);

    await device.launchApp({delete: true}); // deletes async storage on launch ensuring welcome pages are displayed
  });

  it('should be able to scroll through welcome pages and get to sign up page', async () => {
    await expect(element(by.id('welcome_pages'))).toBeVisible();
    await expect(element(by.id('welcome_page1'))).toExist();
    await element(by.id('welcome_pages_scrollview')).scrollTo('right');
    await expect(element(by.id('welcome_page2'))).toExist();
    //await element(by.id('welcome_pages_scrollview')).scrollTo('right');
    await expect(element(by.id('welcome_page3'))).toExist();
    await expect(element(by.text('Sign Up'))).toBeVisible();
    await element(by.text('Sign Up')).tap();
    await expect(element(by.id('welcome_pages'))).not.toBeVisible();
    await expect(element(by.id('sign_up_page'))).toBeVisible();
  });
});
