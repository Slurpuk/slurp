import {initializeApp} from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  getDocs,
  GeoPoint,
  Timestamp,
} from 'firebase/firestore';
import {faker} from '@faker-js/faker';
import {getRandomOptions, getRandomSubarray} from './helpers.js';

const EMULATOR_MODE_ON = true;

const firebaseConfig = {
  apiKey: 'AIzaSyAr1toS2gSr-_6cMS4Jh0R2NhzI70g5nWk',
  authDomain: 'independentcoffeeshops.firebaseapp.com',
  databaseURL:
    'https://independentcoffeeshops-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'independentcoffeeshops',
  storageBucket: 'independentcoffeeshops.appspot.com',
  messagingSenderId: '185382636935',
  appId: '1:185382636935:web:e905902ac500f230f75722',
  measurementId: 'G-5WK60CC02P',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Switch emulator on
if (EMULATOR_MODE_ON) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099', {disableWarnings: true});
}

let jeb;
let val;
let billie;

/**
 * Function to add some users to test the app with. Creates authentication objects as well.
 * @returns {Promise<void>}
 */
async function createTestUsers() {
  const jebEmail = 'jeb@example.org';
  jeb = await addDoc(collection(db, 'users'), {
    first_name: 'Jebediah',
    last_name: 'Smith',
    email: jebEmail,
    location: new GeoPoint(51.503223, -0.1275),
  });
  await createUserWithEmailAndPassword(auth, jebEmail, 'Password123!');
  const valEmail = 'val@example.org';
  val = await addDoc(collection(db, 'users'), {
    first_name: 'Valentina',
    last_name: 'Smith',
    email: valEmail,
    location: new GeoPoint(51.503223, -0.1275),
  });
  await createUserWithEmailAndPassword(auth, valEmail, 'Password123!');
  const billieEmail = 'billie@example.org';
  billie = await addDoc(collection(db, 'users'), {
    first_name: 'Billie',
    last_name: 'Smith',
    email: billieEmail,
    location: new GeoPoint(51.503223, -0.1275),
  });
  await createUserWithEmailAndPassword(auth, billieEmail, 'Password123!');
  console.log('Test users created!');
}

/**
 * Function to add a bunch of users to the database
 * @returns {Promise<void>}
 */
async function createFakeUsers() {
  for (let i = 0; i < 30; i++) {
    const email = faker.internet.email();
    await addDoc(collection(db, 'users'), {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: email,
      location: new GeoPoint(51.503223, -0.1275),
    });
    await createUserWithEmailAndPassword(getAuth(), email, 'Password123!');
  }
  console.log('Users created!');
}

/**
 * Function to add the coffee shops to the database
 * @returns {Promise<void>}
 */
async function createCoffeeShops() {
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Kaffeine',
    email: 'energyboost@gmail.com',
    intro:
      'Inspired by the amazing coffee culture in Australia and New Zealand, Kaffeine is an independently owned, original store that will surprise you daily',
    location: new GeoPoint(51.5185167952972, -0.14044952720959036),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FKaffeine.jpg?alt=media&token=56a5cd27-d39d-463a-bd9c-dd53c2d7e0f5',
    is_open: true,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'energyboost@gmail.com',
    'Password123',
  );
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Espresso Room',
    email: 'espresso@gmail.com',
    intro:
      'Tiny coffee bar for fresh brews, roasted beans and snacks. Sit outside and enjoy watching London in its usual rush',
    location: new GeoPoint(51.508786986572375, -0.12789866477866585),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FTheEspressoRoom.png?alt=media&token=f4147ef9-7b7f-40ae-81b1-8f7686136ff8',
    is_open: true,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'espresso@gmail.com',
    'Password123',
  );
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Eten & Driken',
    email: 'eten@gmail.com',
    intro:
      'Een café waar je je thuis voelt! Café Eten & Drinken is een herkenbaar en toegankelijk horeca concept met vestigingen in Nijmegen en omgeving.',
    location: new GeoPoint(51.51569538069764, -0.11802955923503401),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FShopExterior.png?alt=media&token=aed4e835-ac43-42fd-bc14-a46bef57b0c6',
    is_open: true,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'eten@gmail.com',
    'Password123',
  );
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Unit Six',
    email: 'unitsix@gmail.com',
    intro:
      'The best pastries and bean choices in Stratford. Bring your friends along for an afternoon treat!',
    location: new GeoPoint(51.54421418349301, -0.00043909556173095745),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FUnitSix.jpg?alt=media&token=5795cf8c-dc7e-4e1e-9d79-8c133cef5518',
    is_open: true,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'unitsix@gmail.com',
    'Password123',
  );
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Black Penny Covent Garden',
    email: 'theblackpenny@gmail.com',
    intro:
      'The Black Penny is a true gem among the coffee shops. Single origin beans only. We prepare our drinks with care and full attention',
    location: new GeoPoint(51.5154114687559, -0.12160142849596424),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FblackPenny.jpg?alt=media&token=ce21e4b9-704a-4998-bb93-65189beafa72',
    is_open: true,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'theblackpenny@gmail.com',
    'Password123',
  );
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Vagabond',
    email: 'jamesvagabond@gmail.com',
    intro:
      'Vagabond Coffee Roasters is dedicated to sourcing speciality coffees from around the world in the pursuit of quality and consistency. ',
    location: new GeoPoint(51.54817999763736, -0.10673900193854804),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FVagabond.jpg?alt=media&token=8b794ec4-85cb-4e28-a88b-1a8a92a07a6b',
    is_open: false,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'jamesvagabond@gmail.com',
    'Password123',
  );
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Tramstore',
    email: 'tramstore@hotmail.com',
    intro:
      'Our ethos is quality, style and conscience. Coffee, food, wine, beers produce and products as local as we can source.',
    location: new GeoPoint(51.55965902104797, -0.056225559608669345),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FTramstore.jpg?alt=media&token=9b10bd34-4a10-4366-aac0-6af42adfe2df',
    is_open: true,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'tramstore@hotmail.com',
    'Password123',
  );
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Cafe Combi',
    email: 'cafecombi@gmail.com',
    intro:
      'Cafe Combi combines a deep, individual taste with sustainability. We dine well and we dine eco-friendly',
    location: new GeoPoint(51.50904855275387, -0.12453551905038483),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FCafeCombi.png?alt=media&token=ec7a533d-ac62-4aa7-a9a5-ccbf1d520f94',
    is_open: false,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'cafecombi@gmail.com',
    'Password123',
  );
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Arcade Cafe',
    email: 'arcade.cafe@gmail.com',
    intro:
      'The Arcade cafe is a family business that has been around for decades. We value our customers and prepare drinks that bring smiles on their faces',
    location: new GeoPoint(51.51308871432093, -0.11705853666449072),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FBlackSheep.png?alt=media&token=ac35ea8b-8d9b-46d6-abb9-1fe1812afee5',
    is_open: true,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'arcade.cafe@gmail.com',
    'Password123',
  );
  console.log('Coffee shops created');
}

/**
 * Function to create the items on sale
 * @returns {Promise<void>}
 */
async function createItems() {
  await addDoc(collection(db, 'items'), {
    name: 'Americano',
    price: 2.8,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FAmericano.jpeg?alt=media&token=09fefac7-ab22-414d-b917-be86c11dc88f',
    type: 'coffee',
    has_options: true,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Espresso',
    price: 1.8,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FEspresso.png?alt=media&token=492331da-2d89-487a-b43f-bbbdcd64eb91',
    type: 'coffee',
    has_options: false,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Latte',
    price: 3.4,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FLatte.jpeg?alt=media&token=2e5c10c3-e560-4d63-91d8-740e2a556a3a',
    type: 'coffee',
    has_options: true,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Flat White',
    price: 2.2,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FFlatWhite.jpeg?alt=media&token=1349bc5a-f5aa-402d-b17a-2014d2e15839',
    type: 'coffee',
    has_options: true,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Cappuccino',
    price: 2.7,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FCappuccino.jpeg?alt=media&token=2b2ba0a8-c8df-4de2-9e2d-b73ec2872771',
    type: 'coffee',
    has_options: true,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Apple Juice',
    price: 2.5,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Drinks%2FAppleJuice.jpeg?alt=media&token=dfd54372-49d6-4029-888b-0acee6b9efa4',
    type: 'drink',
    has_options: false,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Lemonade',
    price: 2.6,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Drinks%2FLemonade.jpeg?alt=media&token=69102717-f0eb-4d5f-a076-7fb9d45d19cb',
    type: 'drink',
    has_options: false,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Orange Juice',
    price: 2.8,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Drinks%2FOrangeJuice.jpeg?alt=media&token=04c92cc7-c48e-40fc-9324-4e12280d0d45',
    type: 'drink',
    has_options: false,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Granola Bar',
    price: 1.5,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Snacks%2FGranola.jpeg?alt=media&token=e9e5ad28-0ff8-4ed1-9977-de79bee4071c',
    type: 'snack',
    has_options: false,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Ham and Cheese',
    price: 3.5,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Snacks%2FHamCheese.jpeg?alt=media&token=4d6fa98f-c74e-4667-8434-08a78b5946b7',
    type: 'snack',
    has_options: false,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Croissant',
    price: 2,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Snacks%2FCroissant.jpeg?alt=media&token=1534c88e-490b-4fb8-8313-16a70f344caf',
    type: 'snack',
    has_options: false,
  });
  await addDoc(collection(db, 'items'), {
    name: 'Tuna Mayo',
    price: 3.3,
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Snacks%2FTunaMayo.jpeg?alt=media&token=d78a9d8b-f5b4-451e-8d0a-d9808df857fc',
    type: 'snack',
    has_options: false,
  });
  console.log('Items created!');
}

/**
 * Function to add the items to the coffee shop. Only call when the coffee shops are seeded
 * @returns {Promise<void>}
 */
async function addItemsToCoffeeShops() {
  const items = [];
  const itemsSnapshot = await getDocs(collection(db, 'items'));
  itemsSnapshot.forEach(document => {
    items.push(doc(db, 'items', document.id));
  });
  const completeCoffeeShops = await getDocs(collection(db, 'coffee_shops'));
  await Promise.all(
    completeCoffeeShops.docs.map(document =>
      updateDoc(document.ref, {items: items}),
    ),
  );
  console.log('Items added to Coffee Shops!');
}

/**
 * Function to add the possible options to the database
 * @returns {Promise<void>}
 */
async function createOptions() {
  await addDoc(collection(db, 'options'), {
    name: 'Hazelnut',
    type: 'Syrup',
    price: 0.4,
  });
  await addDoc(collection(db, 'options'), {
    name: 'Oat',
    type: 'Milk',
    price: 0.3,
  });
  await addDoc(collection(db, 'options'), {
    name: 'Dairy',
    type: 'Milk',
    price: 0,
  });
  await addDoc(collection(db, 'options'), {
    name: 'Coconut',
    type: 'Milk',
    price: 0.3,
  });
  await addDoc(collection(db, 'options'), {
    name: 'Caramel',
    type: 'Syrup',
    price: 0.4,
  });
  await addDoc(collection(db, 'options'), {
    name: 'Vanilla',
    type: 'Syrup',
    price: 0.4,
  });
  await addDoc(collection(db, 'options'), {
    name: 'Soy',
    type: 'Milk',
    price: 0.3,
  });
  console.log('Options created!');
}

/**
 * Function to create the database orders. Adds one order of each status for each coffee shop.
 * Randomises the items and options (if item can hold options). Sets the user as jeb, val or billie randomly.
 * @returns {Promise<void>}
 */
async function createOrders() {
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
        const testUsers = [jeb, val, billie];

        const possibleOptions = (
          await getDocs(collection(db, 'options'))
        ).docs.map(option => option.data()); //Gets all the possible options to choose from

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
          user: testUsers[Math.floor(Math.random() * testUsers.length)],
          incoming_time: Timestamp.fromDate(new Date(2022, 1, 4, 9, 30)),
          finished_time:
            orderStatus === 'collected' || orderStatus === 'rejected'
              ? Timestamp.fromDate(new Date(2022, 2, 4, 10))
              : null,
        });
      }
    }),
  );
  console.log('Orders created!');
}

/**
 * Function to run all seed commands
 * @returns {Promise<void>}
 */
async function seed() {
  try {
    const start = Date.now();
    await createTestUsers();
    await createFakeUsers();
    await createCoffeeShops();
    await createItems();
    await addItemsToCoffeeShops();
    await createOptions();
    await createOrders();
    const duration = Date.now() - start;
    console.log('Seeding completed in ' + duration / 1000 + ' seconds.');
  } catch (error) {
    console.log('Error while seeding database: ' + error + '. Sorry!');
  }
}

await seed().then(() => process.exit(0));
