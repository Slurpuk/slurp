import firestore from '@react-native-firebase/firestore';
import {Alerts} from '../data/Alerts';

/**
 * Separates the items offered by the shop into 3 sections: coffees, drinks and snacks.
 * Formats the data before passing it to the flatlists.
 * @return Array The formatted options data.
 */
async function getOptions() {
  let options = [
    {title: 'Select Milk', data: []},
    {title: 'Add Syrup', data: []},
  ];
  let dairy;
  await firestore()
    .collection('Options')
    .get()
    .then(querySnapShot => {
      querySnapShot.forEach(documentSnapshot => {
        let option = {
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        };
        let index = 0;
        option.Type === 'Syrup' ? (index = 1) : (index = 0);
        if (option.Name === 'Dairy') {
          dairy = option;
        } else {
          options[index].data.push(option);
        }
      });
      options[1].data.sort((a, b) => a.Name.localeCompare(b.Name));
      options[0].data.sort((a, b) => a.Name.localeCompare(b.Name));
      options[0].data.unshift(dairy);
    });

  return options;
}

async function updateUserLocation(userRef, latitude, longitude) {
  await firestore()
    .collection('Users')
    .doc(userRef)
    .update({Location: new firestore.GeoPoint(latitude, longitude)})
    .catch(error => {
      if (error === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    });
}

async function setUserObject(user, setUser) {
  await firestore()
    .collection('Users')
    .where('Email', '==', user.email)
    .get()
    .then(querySnapshot => {
      let userModel = querySnapshot.docs[0];
      let newUser = {...userModel.data(), key: userModel.id};
      setUser(prevState => ({...prevState, userObj: newUser}));
    })
    .catch(error => {
      if (error === 'auth/network-request-failed') {
        Alerts.connectionErrorAlert();
      } else {
        Alerts.databaseErrorAlert();
      }
    });
}

export {getOptions, updateUserLocation, setUserObject};
