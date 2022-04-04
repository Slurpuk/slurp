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
 * This set of tests intends to test the navigation between a shop's menu and
 * the basket, including the actions associated with setting coffee options and
 * modifying the basket contents.
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

    const firstName = 'Olaf';
    const lastName = 'Scholz';
    const email = 'notangelamerkel@example.org';
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
    const shopName = 'Hideaway Coffee';
    const intro =
      "Beautiful hidden cafe in the heart of soho. I saw it in a tiktok that's why it's here";
    const shopEmail = 'hideawaycoffee@example.org';
    const shopPassword = 'Password123!';
    const items = await getItems(db);
    await addDoc(collection(db, 'coffee_shops'), {
      name: shopName,
      intro: intro,
      email: shopEmail,
      is_open: true,
      items: items,
      location: new GeoPoint(51.5113231, -0.1352659521),
      image:
        'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FHideaway%20Coffee.png?alt=media&token=9bbebd34-0839-406b-82f7-998eaf773b7b',
    });
    await createUserWithEmailAndPassword(auth, shopEmail, shopPassword);
    await element(by.id('search_bar')).replaceText(shopName);
    await element(by.id('search_item_' + shopName)).tap();
    await element(by.id('shop_intro')).swipe('up', 'fast', 1, 0.5, 0.2);
  });

  afterAll(async () => {
    await element(by.text('Logout')).tap();
    await element(
      by.label('Yes').and(by.type('_UIAlertControllerActionView')),
    ).tap();
  });
  it('should display at coffee page', async function () {
    await expect(element(by.id('coffee_list'))).toBeVisible();
  });
  it('should display drinks page when swiping left from coffee', async function () {
    await element(by.id('coffee_list')).swipe('left');

    await expect(element(by.id('coffee_list'))).not.toBeVisible();
    await expect(element(by.id('drinks_list'))).toBeVisible();
  });
  it('should display snacks page when swiping left from drinks', async function () {
    await element(by.id('drinks_list')).swipe('left');

    await expect(element(by.id('drinks_list'))).not.toBeVisible();
    await expect(element(by.id('snacks_list'))).toBeVisible();
  });
  it('should display drinks page when clicking on drinks tab', async function () {
    await element(by.id('draggable_shop_page')).tap({x: 200, y: 290});

    await expect(element(by.id('drinks_list'))).toBeVisible();
    await expect(element(by.id('snacks_list'))).not.toBeVisible();
  });
  it('should display coffee page when clicking on coffee tab', async function () {
    await element(by.id('draggable_shop_page')).tap({x: 60, y: 290});

    await expect(element(by.id('coffee_list'))).toBeVisible();
    await expect(element(by.id('drinks_list'))).not.toBeVisible();
  });
  it('should display items', async function () {
    await expect(element(by.id('menu_item_Cappuccino'))).toBeVisible();
    await expect(element(by.id('menu_item_Flat White'))).toBeVisible();
  });
  it('should be able to navigate to basket', async function () {
    await element(by.text('View Basket')).tap();

    await expect(element(by.id('draggable_shop_page'))).not.toBeVisible();
    await expect(element(by.id('basket_page'))).toBeVisible();
  });
  it('should be able to navigate back to shop page', async function () {
    await element(by.id('back_arrow')).tap();

    await expect(element(by.id('draggable_shop_page'))).toBeVisible();
    await expect(element(by.id('basket_page'))).not.toBeVisible();
  });
  it('should show options pop up when clicking on item with options', async function () {
    await expect(element(by.id('options_pop_up'))).not.toBeVisible();

    await element(by.id('menu_item_Cappuccino')).tap();

    await expect(element(by.id('options_pop_up'))).toBeVisible();
  });
  it('should change price when selecting milk and syrup options', async function () {
    await element(by.text('Oat')).tap();
    await element(by.text('Caramel')).tap();

    await expect(element(by.text('Add To Order  £3.40'))).toBeVisible();
  });
  it('should add item with options to basket', async function () {
    await element(by.text('Add To Order  £3.40')).tap();

    await element(by.text('View Basket')).tap();
    await expect(element(by.text('Cappuccino'))).toBeVisible();
    await expect(element(by.id('basket_page_total_price'))).toHaveText('£3.40');
  });
  it('should increase item quantity', async function () {
    await element(by.text('+')).tap();

    await expect(element(by.id('basket_page_total_price'))).toHaveText('£6.80');
  });
  it('should decrease item quantity', async function () {
    await element(by.text('-')).tap();

    await expect(element(by.id('basket_page_total_price'))).toHaveText('£3.40');
  });
  it('should delete item if decrease with quantity 1', async function () {
    await element(by.text('-')).tap();

    await expect(element(by.text('Cappuccino'))).not.toBeVisible();
    await expect(element(by.id('basket_page_total_price'))).toHaveText('£0.00');

    await element(by.id('back_arrow')).tap();
  });
  it('should not show options pop up when clicking on item without options and should add to basket', async function () {
    await element(by.id('draggable_shop_page')).tap({x: 200, y: 290});

    await element(by.id('menu_item_Orange Juice')).tap();

    await expect(element(by.id('options_pop_up'))).not.toBeVisible();

    await element(by.text('View Basket')).tap();

    await expect(element(by.text('Orange Juice'))).toBeVisible();
  });
  it('should reach basket from hamburger button when basket has items', async function () {
    await element(by.id('back_arrow')).tap();
    await element(by.id('back_arrow')).tap();
    await element(by.id('hamburger_menu_button')).tap();

    await expect(element(by.label('My basket'))).toBeVisible();
    await element(by.label('My basket')).tap();

    await expect(element(by.id('basket_page'))).toBeVisible();
  });
  it('should not reach basket from hamburger button when basket is empty', async function () {
    await element(by.text('-')).tap();
    await element(by.id('back_arrow')).tap();
    await element(by.id('hamburger_menu_button')).tap();

    await expect(element(by.label('My basket'))).not.toBeVisible();
  });
});
