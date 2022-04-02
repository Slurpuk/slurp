import {
  initialiseAuth,
  initialiseFirebase,
  initialiseFirestore,
} from './firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';

let db;
let auth;

/**
 * This set of tests intends to test the login and forgot password features.
 * Verifying reset password email is received and resetting password is
 * untestable for obvious reasons.
 * No network errors are untestable (see signUp.e2e.js doc for more info)
 * As in many other cases, there are untested catch or else alerts that should
 * never be raised but exist a safety and therefore cannot be tested.
 */
describe('Gettting to shop menu via shop list', () => {
  beforeAll(async () => {
    const app = initialiseFirebase();
    db = initialiseFirestore(app);
    auth = initialiseAuth(app);

    await device.launchApp({permissions: {location: 'inuse'}}); // deletes async storage on launch ensuring welcome pages are displayed
    // await element(by.id('welcome_pages_scrollview')).swipe('left');
    // await element(by.id('welcome_pages_scrollview')).swipe('left');
    // await element(by.text('Already have an account? Log in')).tap();
    // const firstName = 'Jair';
    // const lastName = 'Bolsonaro';
    // const email = 'forestdestroyer@example.org';
    // const password = 'Password123!';
    // await addDoc(collection(db, 'users'), {
    //   first_name: firstName,
    //   last_name: lastName,
    //   email: email,
    //   location: new GeoPoint(51.503223, -0.1275),
    // });
    // await createUserWithEmailAndPassword(auth, email, password);
    // await element(by.id('log_in_page_email')).typeText(email);
    // await element(by.id('log_in_page_password')).typeText(password);
    // await element(by.text('Log in')).tap();
  });

  afterAll(async () => {
    // await element(by.id('hamburger_menu_button')).tap();
    // await element(by.text('Logout')).tap();
  });

  it('should be able to slide the bottom sheet up', async function () {
    await element(by.id('scroll_bottom_page')).swipe('up', 'fast', 1, 0.5, 0);
    const name = 'Sunrise Cafe';
    const intro =
      'Family run italian cafe, my flatmate used to work here and they compulsively commited tax evasion as well as violating workers rights :)';
    const email = 'lizcafe@example.org';
    const password = 'Password123!';
    await addDoc(collection(db, 'coffee_shop'), {
      name: name,
      intro: intro,
      email: email,
      location: new GeoPoint(51.503223, -0.1275),
    });
    await createUserWithEmailAndPassword(auth, email, password);
  });
});
