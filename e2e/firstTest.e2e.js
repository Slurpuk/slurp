import React from 'react';
// import {initializeApp} from 'firebase/app';
// import {getAuth} from 'firebase/auth';
// import {getFirestore} from 'firebase/firestore';
// import {collection, addDoc} from 'firebase/firestore';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
    // // Import the functions you need from the SDKs you need
    //
    // // https://firebase.google.com/docs/web/setup#available-libraries
    //
    // // Your web app's Firebase configuration
    // // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    // const firebaseConfig = {
    //   apiKey: 'AIzaSyAr1toS2gSr-_6cMS4Jh0R2NhzI70g5nWk',
    //   authDomain: 'independentcoffeeshops.firebaseapp.com',
    //   databaseURL:
    //     'https://independentcoffeeshops-default-rtdb.europe-west1.firebasedatabase.app',
    //   projectId: 'independentcoffeeshops',
    //   storageBucket: 'independentcoffeeshops.appspot.com',
    //   messagingSenderId: '185382636935',
    //   appId: '1:185382636935:web:e905902ac500f230f75722',
    //   measurementId: 'G-5WK60CC02P',
    // };
    //
    // const app = initializeApp(firebaseConfig);
    // const auth = getAuth(app);
    // const db = getFirestore(app);
    //
    // async function createUsers() {
    //   const email = 'definitelynotafakeemail@gmail.com';
    //   try {
    //     const docRef = await addDoc(collection(db, 'users'), {
    //       first: 'DetoxWithinTest',
    //       last: 'Lovelace',
    //       born: 1815,
    //     });
    //     console.log('Document written with ID: ', docRef.id);
    //   } catch (e) {
    //     console.error('Error adding document: ', e);
    //   }
    // }
    //
    // await createUsers();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should be able to sign up', async () => {
    await expect(element(by.id('emailfield'))).toBeVisible();

    let email = 'me@liamclark.com';
    let password = 'Password123';
    await element(by.id('email')).typeText(email);
    await element(by.id('password')).typeText(password);
    await element(by.text('Log in')).tap();
    await expect(element(by.id('emailfield'))).not.toBeVisible();
  });
  //
  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });
  //
  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
