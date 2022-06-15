import admin from 'firebase-admin';
import serviceAccount from './slurp-59784-firebase-adminsdk-if35x-7cadeb6bf2.json'assert {type: 'json'};
const databaseURL =
  'https://slurp-59784-default-rtdb.europe-west1.firebasedatabase.app';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

/**
 * Uses firebase admin tools to delete all users from the cloud version.
 * PLEASE DO NOT RUN THIS FUNCTION. As it will mess with the database of the deployed app.
 * @param nextPageToken
 */
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
    .finally(async () => {
      await admin.auth().deleteUsers(uids);
    });
};

deleteAllUsers();
