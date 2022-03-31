// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth, connectAuthEmulator} from 'firebase/auth';
import {getFirestore, connectFirestoreEmulator} from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

// Switch emulator on
if (EMULATOR_MODE_ON) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

/*
Delete all database
 */
