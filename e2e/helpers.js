import {collection, doc, getDocs} from 'firebase/firestore';

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
