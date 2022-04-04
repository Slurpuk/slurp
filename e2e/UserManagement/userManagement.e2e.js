import {
  initialiseAuth,
  initialiseFirebase,
  initialiseFirestore,
} from '../firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';

let db;
let auth;

/**
 * This set of tests intends to test the update details and change password features,
 * including the navigation through the hamburger menu.
 * The same limitation that sign-up page apply.
 */
describe('User management pages', () => {
  beforeAll(async () => {
    const app = initialiseFirebase();
    db = initialiseFirestore(app);
    auth = initialiseAuth(app);

    await device.launchApp({permissions: {location: 'inuse'}});
    await element(by.id('welcome_pages_scrollview')).swipe('left');
    await element(by.id('welcome_pages_scrollview')).swipe('left');
    await element(by.text('Already have an account? Log in')).tap();

    const firstName = 'Vladimir';
    const lastName = 'Zelenskyy';
    const email = 'slavaukraini@example.org';
    const password = 'Password123!';
    await addDoc(collection(db, 'users'), {
      first_name: firstName,
      last_name: lastName,
      email: email,
      location: new GeoPoint(51.503144, -0.225088),
    });
    await createUserWithEmailAndPassword(auth, email, password);
    await element(by.id('log_in_page_email')).replaceText(email);
    await element(by.id('log_in_page_password')).replaceText(password);
    await element(by.text('Log in')).tap();
  });

  afterAll(async () => {
    await element(by.id('hamburger_menu_button')).tap();
    await element(by.text('Logout')).tap();
    await element(
      by.label('Yes').and(by.type('_UIAlertControllerActionView')),
    ).tap();
  });
  describe('Update details page', function () {
    it('should be able to navigate to page', async function () {
      await expect(element(by.id('update_details_page'))).not.toBeVisible();

      await element(by.id('hamburger_menu_button')).tap();
      await element(by.label('Change details')).tap();

      await expect(element(by.id('update_details_page'))).toBeVisible();
    });
    it('should display current user names', async function () {
      await expect(element(by.text('Vladimir'))).toBeVisible();
      await expect(element(by.text('Zelenskyy'))).toBeVisible();
    });
    it('should raise alert when changing details with wrong password', async function () {
      const wrongPassword = 'WrongPassword';

      await element(by.id('update_details_page_password')).typeText(
        wrongPassword,
      );
      await element(by.text('Update Details')).tap();

      await expect(element(by.text('Wrong Password'))).toBeVisible();
      await expect(
        element(by.type('_UIAlertControllerActionView')),
      ).toBeVisible(); // Check raises alert

      await element(by.type('_UIAlertControllerActionView')).tap();
      await element(by.id('update_details_page_password')).clearText();
    });
    it('should raise confirmatory pop up when changing with correct password', async function () {
      const newName = 'Volodymyr';
      const password = 'Password123!';

      await element(by.id('update_details_page_first_name')).clearText();
      await element(by.id('update_details_page_first_name')).typeText(newName);
      await element(by.id('update_details_page_password')).typeText(password);
      await element(by.text('Update Details')).tap();

      await expect(element(by.text('Details Updated!'))).toBeVisible();
      await expect(
        element(by.type('_UIAlertControllerActionView')),
      ).toBeVisible(); // Check raises alert
    });
    it('should dismissing confirmatory pop up should navigate back to home page', async function () {
      await expect(element(by.id('landing_map_page'))).not.toBeVisible();

      await element(by.type('_UIAlertControllerActionView')).tap();

      await expect(element(by.id('landing_map_page'))).toBeVisible();
    });
    it('should display new name when going back to page', async function () {
      await element(by.id('hamburger_menu_button')).tap();
      await expect(element(by.text('Change details'))).toBeVisible();
      await element(by.label('Change details')).tap();

      await expect(element(by.text('Volodymyr'))).toBeVisible();
      await expect(element(by.text('Zelenskyy'))).toBeVisible();
    });
    it('should go back to home page when clicking on back button', async function () {
      await expect(element(by.id('landing_map_page'))).not.toBeVisible();
      await expect(element(by.id('update_details_page'))).toBeVisible();

      await element(by.id('back_arrow')).tap();

      await expect(element(by.id('update_details_page'))).not.toBeVisible();
      await expect(element(by.id('landing_map_page'))).toBeVisible();
    });
  });
  describe('Change Password page', function () {
    it('should be able to navigate to page', async function () {
      await element(by.id('hamburger_menu_button')).tap();
      await expect(element(by.id('change_password_page'))).not.toBeVisible();

      await element(by.label('Change password')).tap();

      await expect(element(by.id('change_password_page'))).toBeVisible();
    });
    it('should raise alert when changing password with wrong old password', async function () {
      const wrongPassword = 'WrongPassword';
      const newPassword = 'Password124$';

      await element(by.id('change_password_page_old_password')).typeText(
        wrongPassword,
      );
      await element(by.id('change_password_page_new_password')).typeText(
        newPassword,
      );
      await element(
        by.id('change_password_page_new_password_confirmation'),
      ).typeText(newPassword);
      await element(by.text('Update Password')).tap();

      await expect(element(by.text('Wrong Password'))).toBeVisible();
      await expect(
        element(by.type('_UIAlertControllerActionView')),
      ).toBeVisible(); // Check raises alert

      await element(by.type('_UIAlertControllerActionView')).tap();
      await element(by.id('change_password_page_old_password')).clearText();
    });
    it('should raise confirmatory pop up when changing with correct password', async function () {
      const password = 'Password123!';

      await element(by.id('change_password_page_old_password')).typeText(
        password,
      );
      await element(by.text('Update Password')).tap();

      await expect(element(by.text('Password Updated!'))).toBeVisible();
      await expect(
        element(by.type('_UIAlertControllerActionView')),
      ).toBeVisible(); // Check raises alert
    });
    it('should dismissing confirmatory pop up should navigate back to home page', async function () {
      await expect(element(by.id('landing_map_page'))).not.toBeVisible();

      await element(by.type('_UIAlertControllerActionView')).tap();

      await expect(element(by.id('landing_map_page'))).toBeVisible();
    });
    it('should display empty fields when going back to page', async function () {
      await element(by.id('hamburger_menu_button')).tap();
      await expect(element(by.text('Change password'))).toBeVisible();
      await expect(element(by.id('change_password_page'))).not.toBeVisible();
      await element(by.label('Change password')).tap();

      await expect(
        element(by.id('change_password_page_old_password')),
      ).toHaveText('');
      await expect(
        element(by.id('change_password_page_new_password')),
      ).toHaveText('');
      await expect(
        element(by.id('change_password_page_new_password_confirmation')),
      ).toHaveText('');
    });
    it('should go back to home page when clicking on back button', async function () {
      await expect(element(by.id('landing_map_page'))).not.toBeVisible();
      await expect(element(by.id('change_password_page'))).toBeVisible();

      await element(by.id('back_arrow')).tap();

      await expect(element(by.id('change_password_page'))).not.toBeVisible();
      await expect(element(by.id('landing_map_page'))).toBeVisible();
    });
  });
});
