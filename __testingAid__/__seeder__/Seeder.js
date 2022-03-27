import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

auth().useEmulator('http://localhost:9099');
firestore().useEmulator('localhost', 8080);

const db = firestore();

function getSeedData() {
  try {
    [...Array(20).keys()].map(() => {
      createUsers();
    });
    console.log('database seed was successful');
  } catch (error) {
    console.log(error, 'database seed failed');
  }
}

function createUsers() {
  const email = faker.email.email();
  db.collection('users').add({
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: email,
  });
  auth().createUserWithEmailAndPassword(email, 'Password123');
}

getSeedData();
