import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

auth().useEmulator('http://localhost:9099');
firestore().useEmulator('localhost', 8080);

const db = firestore();

// function getSeedData() {
//   try {
//     [...Array(10).keys()].map(() =>
//       db.collection('CoffeeShop').add({
//         author_name: faker.name.firstName() + '' + faker.name.lastName(),
//         author_profile_pic: faker.image.imageUrl(),
//         title: faker.commerce.productName(),
//         description: faker.commerce.productDescription(),
//         address: {
//           addr_1: faker.address.streetAddress(),
//           addr_2: faker.address.secondaryAddress(),
//           city: faker.address.city(),
//           state: faker.address.state(),
//           zipCode: faker.address.zipCode(),
//         },
//       }),
//     );
//     console.log('database seed was successful');
//   } catch (error) {
//     console.log(error, 'database seed failed');
//   }
// }
//
// getSeedData();
