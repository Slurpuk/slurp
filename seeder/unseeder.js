import admin from 'firebase-admin';
import serviceAccount from './independentcoffeeshops-firebase-adminsdk-xudgy-4d88ba3c6a.json' assert {type: "json"};
const databaseURL =
  'https://independentcoffeeshops-default-rtdb.europe-west1.firebasedatabase.app';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});


const deleteAllUsers = nextPageToken => {
  let uids = [];
  admin
    .auth()
    .listUsers(100, nextPageToken)
    .then(listUsersResult => {
      uids = uids.concat(
        listUsersResult.users.map(userRecord => userRecord.uid),
      );
      console.log(uids);
      if (listUsersResult.pageToken) {
        deleteAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(error => {
      console.log('Error listing users:', error);
    })
    .finally(() => {
      admin.auth().deleteUsers(uids);
    });
};

deleteAllUsers();
