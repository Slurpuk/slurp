// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  setDoc,
  addDoc,
  getDocs,
  GeoPoint,
} from 'firebase/firestore';
import {faker} from '@faker-js/faker';

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
};

// Initialize Firebase
let app = initializeApp(firebaseConfig);
let db = getFirestore(app);
let auth = getAuth(app);

// Switch emulator on
if (EMULATOR_MODE_ON) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

import {createUserWithEmailAndPassword} from 'firebase/auth';

async function createTestUsers() {
  const email1 = 'jeb@example.org';
  await addDoc(collection(db, 'users'), {
    first_name: 'Jebediah',
    last_name: 'Smith',
    email: email1,
    location: new GeoPoint(51.503223, -0.1275),
  });
  await createUserWithEmailAndPassword(getAuth(app), email1, 'Password123!');
  const email2 = 'val@example.org';
  await addDoc(collection(db, 'users'), {
    first_name: 'Valentina',
    last_name: 'Smith',
    email: email2,
    location: new GeoPoint(51.503223, -0.1275),
  });
  await createUserWithEmailAndPassword(getAuth(), email2, 'Password123!');
  const email3 = 'billie@example.org';
  await addDoc(collection(db, 'users'), {
    first_name: 'Billie',
    last_name: 'Smith',
    email: email3,
    location: new GeoPoint(51.503223, -0.1275),
  });
  await createUserWithEmailAndPassword(getAuth(), email3, 'Password123!');
  console.log('Test users created!');
}

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

async function createCoffeeShops() {
  await addDoc(collection(db, 'coffee_shops'), {
    name: 'Kaffeine',
    email: 'kaffeine@gmail.com',
    intro:
      'Inspired by the amazing coffee culture in Australia and New Zealand, Kaffeine is an independently owned, original store that will surprise you daily',
    location: new GeoPoint(51.5185167952972, -0.14044952720959036),
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/CoffeeShops%2FKaffeine.jpg?alt=media&token=56a5cd27-d39d-463a-bd9c-dd53c2d7e0f5',
    is_open: true,
  });
  await createUserWithEmailAndPassword(
    getAuth(),
    'kaffeine@gmail.com',
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

async function createItems() {
  await addDoc(collection(db, 'items'), {
    name: 'Americano',
    price: '2.8',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FAmericano.jpeg?alt=media&token=09fefac7-ab22-414d-b917-be86c11dc88f',
    type: 'coffee',
    has_options: 'true',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Espresso',
    price: '1.8',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FEspresso.png?alt=media&token=492331da-2d89-487a-b43f-bbbdcd64eb91',
    type: 'coffee',
    has_options: 'false',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Latte',
    price: '3.4',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FLatte.jpeg?alt=media&token=2e5c10c3-e560-4d63-91d8-740e2a556a3a',
    type: 'coffee',
    has_options: 'true',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Flat White',
    price: '2.2',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FFlatWhite.jpeg?alt=media&token=1349bc5a-f5aa-402d-b17a-2014d2e15839',
    type: 'coffee',
    has_options: 'true',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Cappuccino',
    price: '2.7',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FCappuccino.jpeg?alt=media&token=2b2ba0a8-c8df-4de2-9e2d-b73ec2872771',
    type: 'coffee',
    has_options: 'true',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Cappuccino',
    price: '2.7',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Coffees%2FCappuccino.jpeg?alt=media&token=2b2ba0a8-c8df-4de2-9e2d-b73ec2872771',
    type: 'coffee',
    has_options: 'true',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Apple Juice',
    price: '2.5',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Drinks%2FAppleJuice.jpeg?alt=media&token=dfd54372-49d6-4029-888b-0acee6b9efa4',
    type: 'drink',
    has_options: 'false',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Lemonade',
    price: '2.6',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Drinks%2FLemonade.jpeg?alt=media&token=69102717-f0eb-4d5f-a076-7fb9d45d19cb',
    type: 'drink',
    has_options: 'false',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Orange Juice',
    price: '2.8',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Drinks%2FOrangeJuice.jpeg?alt=media&token=04c92cc7-c48e-40fc-9324-4e12280d0d45',
    type: 'drink',
    has_options: 'false',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Granola Bar',
    price: '1.5',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Snacks%2FGranola.jpeg?alt=media&token=e9e5ad28-0ff8-4ed1-9977-de79bee4071c',
    type: 'snack',
    has_options: 'false',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Ham and Cheese',
    price: '3.5',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Snacks%2FHamCheese.jpeg?alt=media&token=4d6fa98f-c74e-4667-8434-08a78b5946b7',
    type: 'snack',
    has_options: 'false',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Croissant',
    price: '2',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Snacks%2FCroissant.jpeg?alt=media&token=1534c88e-490b-4fb8-8313-16a70f344caf',
    type: 'snack',
    has_options: 'false',
  });
  await addDoc(collection(db, 'items'), {
    name: 'Tuna Mayo',
    price: '3.3',
    image:
      'https://firebasestorage.googleapis.com/v0/b/independentcoffeeshops.appspot.com/o/Snacks%2FTunaMayo.jpeg?alt=media&token=d78a9d8b-f5b4-451e-8d0a-d9808df857fc',
    type: 'snack',
    has_options: 'false',
  });
  console.log('Items created');
}

/*
Function to add the items to the coffee shop. Only call when the coffee shops are seeded
 */
async function addItemsToCoffeeShops() {
  let loadingCoffeeShops = true;
  let isFirstTry = true;
  let items = [];

  const itemsSnapshot = await getDocs(collection(db, 'items'));
  itemsSnapshot.forEach(doc => {
    items.push(doc.data());
  });

  while (loadingCoffeeShops) {
    const possiblyIncompleteCoffeeShops = await getDocs(
      collection(db, 'coffee_shop'),
    );

    let i = 0;
    possiblyIncompleteCoffeeShops.forEach(doc => {
      i++;
    });
    if (!isFirstTry) {
      function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }
      delay(1000).then(() => console.log('ran after 1 second passed'));
      isFirstTry = false;
    }
    loadingCoffeeShops = items.length !== i;
  }

  const completeCoffeeShops = await getDocs(collection(db, 'coffee_shop'));

  completeCoffeeShops.forEach(doc => {
    let coffeeShopWithOptions = {
      ...doc.data(),
      items: items,
    };
    setDoc(doc(db, 'coffee_shop', doc.id), coffeeShopWithOptions);
  });
}

async function createOptions() {
  await addDoc(
    collection(db, 'options'),
    {
      name: 'dairy',
      price: 2.8,
      type: 'milk',
    },
    {
      name: 'dairy',
      price: 2.8,
      type: 'milk',
    },
  );
  // await createUserWithEmailAndPassword(auth, email, 'Password123');
  console.log('Coffee Shops created!');
}

async function getCoffeeShops() {
  const querySnapshot = await getDocs(collection(db, 'CoffeeShop'));
  querySnapshot.forEach(doc => {
    console.log("await addDoc(collection(db, 'coffee_shops'),");
    console.log('{');
    console.log("   name: '" + doc.data().Name + "',");
    console.log("   email: '" + doc.data().Email.toLowerCase() + "',");
    console.log("   intro: '" + doc.data().Intro + "',");
    console.log(
      '   location: new GeoPoint(' +
        doc.data().Location.latitude +
        ', ' +
        doc.data().Location.longitude +
        '),',
    );
    console.log("   image: '" + doc.data().Image + "',");
    console.log('   is_open:', doc.data().IsOpen + ',');
    console.log('   items: [],');
    console.log('});');
    console.log(
      'await createUserWithEmailAndPassword(getAuth(), ' +
        "'" +
        doc.data().Email.toLowerCase() +
        "'" +
        ', ' +
        "'Password123');",
    );
  });
}

async function getItems() {
  const querySnapshot = await getDocs(collection(db, 'Snacks'));
  querySnapshot.forEach(doc => {
    console.log("await addDoc(collection(db, 'items'),");
    console.log('{');
    console.log("   name: '" + doc.data().Name + "',");
    console.log("   price: '" + doc.data().Price + "',");
    console.log("   image: '" + doc.data().Image + "',");
    console.log("   type: 'snack',");
    console.log("   has_options: 'false',");
    console.log('});');
  });
}

async function getOptions() {
  const querySnapshot = await getDocs(collection(db, 'Options'));
  querySnapshot.forEach(doc => {
    console.log("await addDoc(collection(db, 'options'),");
    console.log('{');
    console.log("   name: '" + doc.data().Name + "',");
    console.log("   price: '" + doc.data().Price + "',");
    console.log("   image: '" + doc.data().Image + "',");
    console.log("   type: 'snack',");
    console.log("   has_options: 'false',");
    console.log('});');
  });
}

async function seed() {
  try {
    await createFakeUsers();
    await createCoffeeShops();
    await createItems().then(async () => await addItemsToCoffeeShops());
  } catch (error) {
    console.log('Error while seeding database: ' + error.code + '. Sorry!');
  }
}

await seed().then(() => process.exit(0));

// await getItems().then(()=>process.exit(0))
