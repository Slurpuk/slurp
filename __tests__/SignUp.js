import firestore from '@react-native-firebase/firestore';
import {render} from '@testing-library/react';
import App from "../App";

describe('test', function () {
  // beforeAll(async () => {
  //   await firestore()
  //     .collection('Users')
  //     .add({
  //       Name: 'Name',
  //       Email: 'me@name.com',
  //     })
  //     .then(() => console.log('Write'))
  //     .catch(error => {
  //       console.log(error);
  //     });
  // });
  it('test', function () {
    render(<App />);
    expect(true).toBe(true);
  });
});
