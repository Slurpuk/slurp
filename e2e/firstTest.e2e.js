import {initialiseFirebase, initialiseFirestore} from './firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';

let db;
let auth;

/**
 * This set of tests intends to test the transition from welcome pages to
 * sign up and the possible backend errors one may encounter.
 * The 'too many requests' error is untestable as:
 * a) It would require making 101 sign up attempts.
 * b) Firebase emulator doesn't actually consider this rule, this only applies
 * to the cloud version.
 * Network error is untestable on iOS as:
 * a) The emulator works offline anyway so the only way to trigger a no network
 * error would be to disconnect the emulator but this has to be done from the
 * terminal.
 * b)
 * As in many other cases, there are untested catch or else alerts that should
 * never be raised but exist a safety and therefore cannot be tested.
 */
describe('Sign up', () => {
  beforeAll(async () => {
    const app = initialiseFirebase();
    db = initialiseFirestore(app);
    auth = initialiseAuth(app);

    await device.launchApp({delete: true}); // deletes async storage on launch ensuring welcome pages are displayed
  });

  it('should be able to scroll through welcome pages and get to sign up page', async () => {
    await expect(element(by.id('welcome_pages'))).toBeVisible();
    await expect(element(by.id('welcome_page1'))).toBeVisible();
    await expect(element(by.id('welcome_page2'))).not.toBeVisible();
    await expect(element(by.id('welcome_page3'))).not.toBeVisible();

    await element(by.id('welcome_pages_scrollview')).swipe('left');

    await expect(element(by.id('welcome_page1'))).not.toBeVisible();
    await expect(element(by.id('welcome_page2'))).toBeVisible();
    await expect(element(by.id('welcome_page3'))).not.toBeVisible();

    await element(by.id('welcome_pages_scrollview')).swipe('left');

    await expect(element(by.id('welcome_page1'))).not.toBeVisible();
    await expect(element(by.id('welcome_page2'))).not.toBeVisible();
    await expect(element(by.id('welcome_page3'))).toBeVisible();

    await expect(element(by.text('Sign Up'))).toBeVisible();
    await element(by.text('Sign Up')).tap();
    await expect(element(by.id('welcome_pages'))).not.toBeVisible();
    await expect(element(by.id('sign_up_page'))).toBeVisible();
  });
});
