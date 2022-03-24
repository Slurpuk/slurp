import firestore from '@react-native-firebase/firestore';
import {Alerts} from '../data/Alerts';

export function formatOrders(
  formattedOrders,
  isCurrent,
  setCurrentOrders,
  setPastOrders,
) {
  let newOrders = [];
  let periods = [];
  if (!isCurrent) {
    formattedOrders.forEach(order => {
      if (!periods.find(x => x.period === order.period)) {
        periods.push(order.period);
      }
    });
  }
  formattedOrders.forEach(async order => {
    let temp = order;
    let newItems = [];
    for (let item of temp.Items) {
      let newItem;
      await firestore()
        .collection(item.Type + 's')
        .doc(item.ItemRef)
        .get()
        .then(doc => {
          newItem = {
            ...doc.data(),
            type: item.Type,
            key: doc.id,
            quantity: item.Quantity,
            options: item.Options,
          };
          newItems.push(newItem);
        })
        .catch(error => {
          if (error === 'auth/network-request-failed') {
            Alerts.connectionErrorAlert();
          } else {
            Alerts.databaseErrorAlert();
          }
        });
    }
    temp.Items = newItems;

    await firestore()
      .collection('CoffeeShop')
      .doc(order.ShopID)
      .get()
      .then(document => {
        temp.shop = {...document.data()};
        if (isCurrent) {
          newOrders.push(temp);
        } else {
          let curr = newOrders.find(x => x.period === temp.period);
          curr
            ? curr.data.push(temp)
            : newOrders.push({period: temp.period, data: [temp]});
        }
        isCurrent ? setCurrentOrders(newOrders) : setPastOrders(newOrders);
      })
      .catch(error => {
        if (error === 'auth/network-request-failed') {
          Alerts.connectionErrorAlert();
        } else {
          Alerts.databaseErrorAlert();
        }
      });
  });
}
