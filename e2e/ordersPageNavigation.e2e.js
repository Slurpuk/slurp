import {
  initialiseAuth,
  initialiseFirebase,
  initialiseFirestore,
} from './firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {createOrders} from './helpers';

let db;
let auth;

/**
 * Test getting to and switching the tabs of the order page.
 * Note that displaying the orders with exactly the correct information in each subcomponent
 * of an order card is covered via unit tests and therefore not relevant to integration tests.
 * However, testers are recommended to visually inspect the test as it runs.
 */
describe('Navigation to shop menu in diferent ways', () => {
  beforeAll(async () => {
    const app = initialiseFirebase();
    db = initialiseFirestore(app);
    auth = initialiseAuth(app);

    await device.launchApp({permissions: {location: 'inuse'}});
    await element(by.id('welcome_pages_scrollview')).swipe('left');
    await element(by.id('welcome_pages_scrollview')).swipe('left');
    await element(by.text('Already have an account? Log in')).tap();

    const firstName = 'Pedro';
    const lastName = 'Sanchez';
    const email = 'paella@example.org';
    const password = 'Password123!';
    const user = await addDoc(collection(db, 'users'), {
      first_name: firstName,
      last_name: lastName,
      email: email,
      location: new GeoPoint(51.503144, -0.225088),
    });
    await createUserWithEmailAndPassword(auth, email, password);
    await element(by.id('log_in_page_email')).replaceText(email);
    await element(by.id('log_in_page_password')).replaceText(password);
    await element(by.text('Log in')).tap();
    await createOrders(db, user);
  });

  afterAll(async () => {
    await element(by.id('hamburger_menu_button')).tap();
    await element(by.text('Logout')).tap();
    await element(
      by.label('Yes').and(by.type('_UIAlertControllerActionView')),
    ).tap();
  });

  it('should be able to navigate to page', async function () {
    await expect(element(by.id('orders_page'))).not.toBeVisible();

    await element(by.id('hamburger_menu_button')).tap();
    await element(by.label('My orders')).tap();

    await expect(element(by.id('orders_page'))).toBeVisible();
  });
  it('should display current orders and not past orders', async function () {
    await expect(element(by.id('current_orders_page'))).toBeVisible();
    await expect(element(by.id('past_orders_page'))).not.toBeVisible();
  });
  it('should display past orders and not current orders when clicking on past', async function () {
    await element(by.id('orders_page')).tap({x: 300, y: 150});

    await expect(element(by.id('current_orders_page'))).not.toBeVisible();
    await expect(element(by.id('past_orders_page'))).toBeVisible();
  });
  it('should return to current orders when clicking on Current', async function () {
    await element(by.id('orders_page')).tap({x: 100, y: 150});

    await expect(element(by.id('current_orders_page'))).toBeVisible();
    await expect(element(by.id('past_orders_page'))).not.toBeVisible();
  });
  it('should show past orders when swiping left from current', async function () {
    await element(by.id('current_orders_page')).swipe('left');

    await expect(element(by.id('current_orders_page'))).not.toBeVisible();
    await expect(element(by.id('past_orders_page'))).toBeVisible();
  });
  it('should show current orders when swiping right from past', async function () {
    await element(by.id('past_orders_page')).swipe(
      'right',
      'fast',
      1,
      0.2,
      0.5,
    );

    await expect(element(by.id('current_orders_page'))).toBeVisible();
    await expect(element(by.id('past_orders_page'))).not.toBeVisible();
    await element(by.id('back_arrow')).tap();
  });
});
