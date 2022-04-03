import {
  initialiseAuth,
  initialiseFirebase,
  initialiseFirestore,
} from './firebaseSetUp';
import {addDoc, collection, GeoPoint} from 'firebase/firestore';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {getItems} from './helpers';

let db;
let auth;

/**
 * This set of tests intends to test the various ways of getting to the shop page
 * from the landing page and page.
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

    const firstName = 'Jair';
    const lastName = 'Bolsonaro';
    const email = 'forestdestroyer@example.org';
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
    const shopName = 'Liz Cafe';
    const intro =
      'Family run italian cafe, my flatmate used to work here and they compulsively committed tax evasion as well as violating workers rights :)';
    const shopEmail = 'lizcafe@example.org';
    const shopPassword = 'Password123!';
    const items = await getItems(db);
    await addDoc(collection(db, 'coffee_shops'), {
      name: shopName,
      intro: intro,
      email: shopEmail,
      is_open: true,
      items: items,
      location: new GeoPoint(51.503026, -0.223571),
      image:
        'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FLiz%20cafe.jpg?alt=media&token=6aa63217-bb74-4ec0-a3bb-c93f5174b64e',
    });
    await createUserWithEmailAndPassword(auth, shopEmail, shopPassword);
  });

  afterAll(async () => {
    await element(by.id('hamburger_menu_button')).tap();
    await element(by.text('Logout')).tap();
  });
});
