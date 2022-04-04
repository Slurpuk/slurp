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
    await element(
      by.label('Yes').and(by.type('_UIAlertControllerActionView')),
    ).tap();
  });
  describe('Navigation to shop page via shop list', function () {
    it('should be able to slide the bottom sheet up', async function () {
      await expect(element(by.id('shop_list'))).not.toBeVisible();

      await element(by.id('scroll_bottom_page')).swipe('up', 'fast', 1, 0.5, 0);
      await expect(element(by.id('shop_list'))).toBeVisible();
    });
    it('should show nearest by cafe in bottom page', async function () {
      await expect(element(by.text('LIZ CAFE'))).toBeVisible();
    });
    it('should show show page on clicking on cafe', async function () {
      await element(by.text('LIZ CAFE')).tap();

      await expect(element(by.id('shop_list'))).not.toBeVisible();
      await expect(element(by.id('shop_intro'))).toBeVisible();
      await expect(element(by.text('LIZ CAFE'))).toBeVisible();
    });
    it('should navigate to the shop list when clicking on the back button', async function () {
      await element(by.id('back_arrow')).tap();

      await expect(element(by.id('shop_list'))).toBeVisible();
      await expect(element(by.id('shop_intro'))).not.toBeVisible();

      await element(by.id('scroll_bottom_page')).swipe(
        'down',
        'fast',
        1,
        0.5,
        0,
      );
    });
  });
  /**
   * This set of test is limited because it relies on the exact location of the marker with respect to the users position,
   * the coffee shops positions and the size of the screen, meaning it is unlikely to work on a different phone,
   * Unfortunately, detox doesn't support clicking on markers and the work-around are tricky and flacky.
   * This means that this test is complete but not sound.
   */
  describe('Navigation to shop page via marker', function () {
    it('should display minimised shop page when clicking on a green marker', async function () {
      await expect(element(by.id('shop_marker_Liz Cafe'))).toExist();
      await element(by.id('landing_map_page')).tap({x: 260, y: 410});

      await expect(element(by.id('shop_intro'))).toBeVisible();
      await expect(element(by.id('coffee_list'))).not.toBeVisible();
    });
    it('should display the whole menu when swiping up', async function () {
      await element(by.id('shop_intro')).swipe('up', 'fast', 1, 0.5, 0.2);

      await expect(element(by.id('shop_intro'))).toBeVisible();
      await expect(element(by.id('coffee_list'))).toBeVisible();
    });
    it('should display minimised version when swiping down partially', async function () {
      await element(by.id('shop_intro')).swipe('down', 'fast', 0.6, 0.5, 0);

      await expect(element(by.id('shop_intro'))).toBeVisible();
      await expect(element(by.id('coffee_list'))).not.toBeVisible();

      await element(by.id('shop_intro')).swipe('up', 'fast', 1, 0.5, 0.2);
    });
    it('should also display minimised version when clicking on down arrow', async function () {
      await element(by.id('back_arrow')).tap();

      await expect(element(by.id('shop_intro'))).toBeVisible();
      await expect(element(by.id('coffee_list'))).not.toBeVisible();
    });
    it('should remove shop intro and display top picks nearby when swiping show intro down', async function () {
      await element(by.id('shop_intro')).swipe('down', 'fast', 1, 0.5, 0.6);

      await expect(element(by.id('shop_intro'))).not.toBeVisible();
      await expect(element(by.text('Top Picks Nearby'))).toBeVisible();
    });
  });
  describe('Navigation to shop page via search bar', function () {
    it('should display shop minimised shop intro when clicking searching for cafe and clicking on it', async function () {
      await expect(element(by.id('shop_intro'))).not.toBeVisible();

      await element(by.id('search_bar')).typeText('Liz Cafe');
      await element(by.id('search_item_Liz Cafe')).tap();

      await expect(element(by.id('shop_intro'))).toBeVisible();
      await expect(element(by.id('coffee_list'))).not.toBeVisible();
    });
  });
});
