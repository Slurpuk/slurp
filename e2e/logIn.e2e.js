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
describe('Log in', () => {
  beforeAll(async () => {
    const app = initialiseFirebase();
    db = initialiseFirestore(app);
    auth = initialiseAuth(app);

    await device.launchApp({permissions: {location: 'inuse'}}); // deletes async storage on launch ensuring welcome pages are displayed
  });

  afterAll(async () => {
    await element(by.id('hamburger_menu_button')).tap();
    await element(by.text('Logout')).tap();
  });

  it('should be able to navigate to log in page from welcome pages', async function () {
    await element(by.id('welcome_pages_scrollview')).swipe('left');
    await element(by.id('welcome_pages_scrollview')).swipe('left');
    await expect(
      element(by.text('Already have an account? Log in')),
    ).toBeVisible();
    await element(by.text('Already have an account? Log in')).tap();
  });

  it('should raise confirmatory alert if forgot password with existing email', async () => {
    const usedFirstName = 'Xi';
    const usedLastName = 'Jinping';
    const usedEmail = 'winniethepooh@example.org';
    const password = 'Password123!';
    await addDoc(collection(db, 'users'), {
      first_name: usedFirstName,
      last_name: usedLastName,
      email: usedEmail,
      location: new GeoPoint(51.503223, -0.1275),
    });
    await createUserWithEmailAndPassword(auth, usedEmail, password);
    await expect(element(by.id('log_in_page'))).toBeVisible();

    await element(by.id('log_in_page_email')).typeText(usedEmail);
    await element(by.text('Forgot your password?')).tap();
    await expect(element(by.text('Reset Sent'))).toBeVisible();
    await expect(
      element(by.type('_UIAlertControllerActionView')),
    ).toBeVisible(); // Check raises alert
    await element(by.type('_UIAlertControllerActionView')).tap();
    await expect(element(by.id('log_in_page'))).toBeVisible();

    await element(by.id('log_in_page_email')).replaceText('');
  });

  it('should also raise alert if forgot password with non-existent email', async () => {
    const email = 'thisemaildoesnotexist@example.org';

    await element(by.id('log_in_page_email')).typeText(email);
    await element(by.text('Forgot your password?')).tap();
    await expect(element(by.text('Reset Sent'))).toBeVisible();
    await expect(
      element(by.type('_UIAlertControllerActionView')),
    ).toBeVisible(); // Check raises alert
    await element(by.type('_UIAlertControllerActionView')).tap();
    await expect(element(by.id('log_in_page'))).toBeVisible();

    await element(by.id('log_in_page_email')).replaceText('');
  });
  it('should raise alert if log in wrong password', async () => {
    const firstName = 'Emmanuel';
    const lastName = 'Macron';
    const email = 'enmarche@example.org';
    const password = 'Password123!';
    const wrongPassword = 'WrongPassword';
    await addDoc(collection(db, 'users'), {
      first_name: firstName,
      last_name: lastName,
      email: email,
      location: new GeoPoint(51.503223, -0.1275),
    });
    await createUserWithEmailAndPassword(auth, email, password);

    await element(by.id('log_in_page_email')).typeText(email);
    await element(by.id('log_in_page_password')).typeText(wrongPassword);
    await element(by.text('Log in')).tap();

    await expect(element(by.text('Wrong Password'))).toBeVisible();
    await expect(
      element(by.type('_UIAlertControllerActionView')),
    ).toBeVisible(); // Check raises alert
    await element(by.type('_UIAlertControllerActionView')).tap();
    await expect(element(by.id('log_in_page'))).toBeVisible();

    await element(by.id('log_in_page_password')).replaceText('');
  });
  it('should be able to log in with valid details', async () => {
    const password = 'Password123!';

    await element(by.id('log_in_page_password')).typeText(password);
    await element(by.text('Log in')).tap();

    await expect(element(by.id('log_in_page'))).not.toBeVisible();
    await expect(element(by.id('landing_map_page'))).toBeVisible();
  });
});
