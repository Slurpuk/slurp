const functions = require('firebase-functions');
const express = require('express');
const app = express();
const stripe = require('stripe')(
  'sk_test_51KRjSVGig6SwlicvjdIQgL4wuz8wkr61CkyJDzTfyUWIM0sXWMHm17ibH4kk4anzkgpwKD14jhjjyKM10GAgFWjJ00r7kJHSov',
);
app.use(express.static('.'));
app.use(express.json());

exports.payWithStripe = functions.https.onRequest(async (request, response) => {
  // Set your secret key: remember to change this to your live secret key in production
  // See your keys here: https://dashboard.stripe.com/account/apikeys

  let customer = await stripe.customers.create();
  let amount = (request.body.amount * 100).toFixed(0);

  //Create ephemeral key and assign it to the customer.
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'},
  );

  // Create a PaymentIntent with the payment amount, currency, and customer
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'gbp',
    customer: customer.id,
  });

  // Send the object keys to the client
  response.send({
    publishableKey:
      'pk_test_51KRjSVGig6SwlicvL06FM1BDNZr1539SwuDNXond8v6Iaigyq1NRZsleWNK5PTPEwo1bAWfTQqYHEfXCJ4OWq348000jVuI6u1',
    paymentIntent: paymentIntent.client_secret,
    customer: customer.id,
    ephemeralKey: ephemeralKey.secret,
  });
});
