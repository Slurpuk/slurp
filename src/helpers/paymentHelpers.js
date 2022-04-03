import {Alerts} from '../data/Alerts';

/**
 * Fetch the payments' sheet parameters from the server.
 * @return  Return the encapsulated details about the transaction.
 * @param total The total amount to pay
 */
async function fetchPaymentSheetParams(total) {
  let body = {amount: total};
  const response = await fetch(
    'https://us-central1-independentcoffeeshops.cloudfunctions.net/payWithStripe',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  ).catch(error => {
    if (error.toString() === 'TypeError: Network request failed') {
      Alerts.networkAlert();
    } else {
      Alerts.elseAlert();
    }
  });
  if (response) {
    const {paymentIntent, ephemeralKey, customer} = await response.json();
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  }
}

/**
 * Initialize the stripe payment sheet.
 * @param initPaymentSheet The method for initiating the payment sheet.
 * @param total The total amount to pay
 */
async function initializePaymentSheet(initPaymentSheet, total) {
  const response = await fetchPaymentSheetParams(total);
  if (response) {
    const {error} = await initPaymentSheet({
      customerId: response.customer,
      customerEphemeralKeySecret: response.ephemeralKey,
      paymentIntentClientSecret: response.paymentIntent,
      merchantDisplayName: 'Slurp',
    });
    if (error) {
      Alerts.elseAlert();
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

// /**
//  * Initialize the user's payment.
//  * @param initPaymentSheet The method for initiating the payment sheet.
//  * @param total The total amount to pay
//  * @return boolean Return true if initialization is successful, false otherwise.
//  */
// async function initializePayment(initPaymentSheet, total) {
//   return await initializePaymentSheet(initPaymentSheet, total);
// }

/**
 * Open the payment sheet if no error occurs
 * @param presentPaymentSheet Function for opening the payment sheet.
 * @return boolean Return true if the payment sheet can be open, false otherwise.
 */
async function openPaymentSheet(presentPaymentSheet) {
  const response = await presentPaymentSheet();
  const error = response.error;
  if (error) {
    if (error.code === 'Canceled') {
      return false;
    }
    Alerts.networkAlert();
    return false;
  } else {
    return true;
  }
}

export {initializePaymentSheet, openPaymentSheet};
