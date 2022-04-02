import {
  initialiseAuth,
  initialiseFirebase,
  initialiseFirestore,
} from './firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';

let db;
let auth;

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
    await expect(element(by.text('Forgot your password?'))).toBeVisible();
    await element(by.text('Forgot your password?')).tap();
    await expect(
      element(by.type('_UIAlertControllerActionView')),
    ).toBeVisible(); // Check raises alert
    await element(by.type('_UIAlertControllerActionView')).tap();
    await expect(element(by.id('log_in_page'))).toBeVisible();
  });
  it('should also raise alert if forgot password with non-existent email', async () => {
    const email = 'thisemaildoesnotexist@example.org';
    await expect(element(by.id('log_in_page'))).toBeVisible();
    await element(by.id('log_in_page_email')).typeText(email);
    await expect(element(by.text('Forgot your password?'))).toBeVisible();
    await element(by.text('Forgot your password?')).tap();
    await expect(
      element(by.type('_UIAlertControllerActionView')),
    ).toBeVisible(); // Check raises alert
    await element(by.type('_UIAlertControllerActionView')).tap();
    await expect(element(by.id('log_in_page'))).toBeVisible();
  });
  it('should raise alert if log in wrong password', async () => {
    const usedFirstName = 'Boris';
    const usedLastName = 'Johnson';
    const usedEmail = 'getbrexitdone@example.org';
    const password = 'Password123!';
    const wrongPassword = 'WrongPassword';
    await addDoc(collection(db, 'users'), {
      first_name: usedFirstName,
      last_name: usedLastName,
      email: usedEmail,
      location: new GeoPoint(51.503223, -0.1275),
    });
    await createUserWithEmailAndPassword(auth, usedEmail, password);
    await element(by.id('sign_up_page_email')).typeText(usedEmail);
    await element(by.id('sign_up_page_password')).typeText(password);
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
});
