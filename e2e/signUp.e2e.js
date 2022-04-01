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
 * b) Even if one used the cloud database, there is no way of disconnecting
 * the emulator from the internet because it runs on the same network as the
 * computer, so it would require disconnecting your computer from the network.
 * Source: https://github.com/wix/Detox/issues/1501
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
  it('should be able to navigate to log in page and back', async () => {
    await expect(
      element(by.text('Already have an account? Log in')),
    ).toBeVisible();
    await element(by.text('Already have an account? Log in')).tap();
    await expect(element(by.id('sign_up_page'))).not.toBeVisible();
    await expect(element(by.id('log_in_page'))).toBeVisible();
    await expect(element(by.text('New? Create an account'))).toBeVisible();
    await element(by.text('New? Create an account')).tap();
    await expect(element(by.id('sign_up_page'))).toBeVisible();
    await expect(element(by.id('log_in_page'))).not.toBeVisible();
  });
  it('should not be able to sign up with existing user', async () => {
    const usedFirstName = 'Boris';
    const usedLastName = 'Johnson';
    const usedEmail = 'getbrexitdone@example.org';
    const password = 'Password123!';
    await addDoc(collection(db, 'users'), {
      first_name: usedFirstName,
      last_name: usedLastName,
      email: usedEmail,
      location: new GeoPoint(51.503223, -0.1275),
    });
    await createUserWithEmailAndPassword(auth, usedEmail, password);
    await element(by.id('sign_up_page_first_name')).typeText(usedFirstName);
    await element(by.id('sign_up_page_last_name')).typeText(usedLastName);
    await element(by.id('sign_up_page_email')).typeText(usedEmail);
    await element(by.id('sign_up_page_password')).typeText(password);
    await element(by.id('sign_up_page_confirm_password')).typeText(password);
    await element(by.text('Create Account')).tap();
    await expect(
      element(by.type('_UIAlertControllerActionView')),
    ).toBeVisible(); // Check raises alert
    await element(by.type('_UIAlertControllerActionView')).tap();
    await expect(element(by.id('sign_up_page'))).toBeVisible();
    auth.currentUser.delete;
    await element(by.id('sign_up_page_first_name')).replaceText('');
    await element(by.id('sign_up_page_last_name')).replaceText('');
    await element(by.id('sign_up_page_email')).replaceText('');
    await element(by.id('sign_up_page_password')).replaceText('');
    await element(by.id('sign_up_page_confirm_password')).replaceText('');
  });
  it('should be able to sign up with new user', async () => {
    const firstName = 'Joe';
    const lastName = 'Biden';
    const email = 'brandon@example.org';
    const password = 'Password123!';

    await element(by.id('sign_up_page_first_name')).typeText(firstName);
    await element(by.id('sign_up_page_last_name')).typeText(lastName);
    await element(by.id('sign_up_page_email')).typeText(email);
    await element(by.id('sign_up_page_password')).typeText(password);
    await element(by.id('sign_up_page_confirm_password')).typeText(password);
    // await element(by.text('Create Account')).tap();
    // await expect(element(by.id('sign_up_page'))).not.toBeVisible();
  });
});
