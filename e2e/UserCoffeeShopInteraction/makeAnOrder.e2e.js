import {
  initialiseAuth,
  initialiseFirebase,
  initialiseFirestore,
} from '../firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {getItems} from '../helpers/firebaseHelpers';

let db;
let auth;

/**
 * This set of tests intends to test the ability to make an order, including
 * using the stripe server to make a payment.
 */
describe('Menu & Basket', () => {
  beforeAll(async () => {
    const app = initialiseFirebase();
    db = initialiseFirestore(app);
    auth = initialiseAuth(app);

    await device.launchApp({
      permissions: {location: 'inuse'},
    });
    await element(by.id('welcome_pages_scrollview')).swipe('left');
    await element(by.id('welcome_pages_scrollview')).swipe('left');
    await element(by.text('Already have an account? Log in')).tap();

    const firstName = 'Narendra';
    const lastName = 'Modi';
    const email = 'narendramodi@example.org';
    const password = 'Password123!';
    await addDoc(collection(db, 'users'), {
      first_name: firstName,
      last_name: lastName,
      email: email,
      location: new GeoPoint(51.6113231, -0.2959521),
    });
    await createUserWithEmailAndPassword(auth, email, password);
    await element(by.id('log_in_page_email')).replaceText(email);
    await element(by.id('log_in_page_password')).replaceText(password);
    await element(by.text('Log in')).tap();
    const shopName = 'Mysterious Coffee';
    const intro =
      "I'm running out of ideas for sarcastic coffee shop intros so I'll just write this meta-sarcastic one.";
    const shopEmail = 'mysteriouscoffee@example.org';
    const shopPassword = 'Password123!';
    const items = await getItems(db);
    await addDoc(collection(db, 'coffee_shops'), {
      name: shopName,
      intro: intro,
      email: shopEmail,
      is_open: true,
      items: items,
      location: new GeoPoint(51.6113231, -0.2352659521),
      image:
        'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FHideaway%20Coffee.png?alt=media&token=9bbebd34-0839-406b-82f7-998eaf773b7b',
    });
    await createUserWithEmailAndPassword(auth, shopEmail, shopPassword);
    await element(by.id('search_bar')).replaceText(shopName);
    await element(by.id('search_item_' + shopName)).tap();
    await element(by.id('shop_intro')).swipe('up', 'fast', 1, 0.5, 0.2);
    await element(by.id('menu_item_Espresso')).tap();
    await element(by.text('View Basket')).tap();
  });

  afterAll(async () => {
    await element(by.id('back_arrow')).tap();
    await element(by.id('hamburger_menu_button')).tap();
    await element(by.text('Logout')).tap();
    await element(
      by.label('Yes').and(by.type('_UIAlertControllerActionView')),
    ).tap();
  });
  it('should raise stripe pop up when clicking checkout', async function () {
    await element(by.text('Checkout')).tap();

    await expect(
      element(by.text('Add your payment information')),
    ).toBeVisible();
    await element(by.label('Card number'))
      .atIndex(2)
      .replaceText('4242424242424242');
  });
});
