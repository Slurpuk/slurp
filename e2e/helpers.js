import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import {getRandomOptions, getRandomSubarray} from '../seeder/helpers';

/**
 * Get all the items to add them to the coffee shop.
 * @param db firestore access
 * @returns {Promise<[]>} items
 */
export async function getItems(db) {
  const items = [];
  const itemsSnapshot = await getDocs(collection(db, 'items'));
  itemsSnapshot.forEach(document => {
    items.push(doc(db, 'items', document.id));
  });
  return items;
}

/**
 * Function to create the database orders. Adds one order of each status for each coffee shop.
 * Randomises the items and options (if item can hold options). Sets the user as the input user.
 * @param db firestore access
 * @param user user to assign the orders to
 * @returns {Promise<void>}
 */
export async function createOrders(db, user) {
  const completeCoffeeShops = await getDocs(collection(db, 'coffee_shops'));
  await Promise.all(
    completeCoffeeShops.docs.map(async coffee_shop => {
      for (let i = 0; i < 5; i++) {
        const shopItems = coffee_shop.data().items; // Represents a list of the items that the coffee shop offers.
        const statuses = [
          'incoming',
          'accepted',
          'rejected',
          'ready',
          'collected',
        ];

        const possibleOptions = (await getDocs(collection(db, 'options'))).docs; //Gets all the possible options to choose from

        const items = await Promise.all(
          getRandomSubarray(shopItems).map(async item => {
            let itemObject;
            if ((await getDoc(doc(db, item.path))).data().has_options) {
              itemObject = {
                item: item,
                quantity: Math.ceil(Math.random() * 3),
                options: getRandomOptions(possibleOptions),
              };
            } else {
              itemObject = {
                item: item,
                quantity: Math.ceil(Math.random() * 3),
              };
            }
            return itemObject;
          }),
        );
        const orderStatus = statuses[i % statuses.length];
        await addDoc(collection(db, 'orders'), {
          items: items,
          status: orderStatus,
          is_displayed: true,
          shop: coffee_shop.ref,
          user: user,
          incoming_time: Timestamp.fromDate(new Date(2022, 1, 4, 9, 30)),
          finished_time:
            orderStatus === 'collected' || orderStatus === 'rejected'
              ? Timestamp.fromDate(new Date(2022, 2, 4, 10))
              : null,
        });
      }
    }),
  );
}
