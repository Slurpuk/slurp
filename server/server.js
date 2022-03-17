require('dotenv').config();
const express = require('express');
const app = express();
const {resolve} = require('path');
const stripe = require('stripe')(process.env.secret_key); // https://stripe.com/docs/keys#obtain-api-keys
app.use(express.static('.'));
app.use(express.json());
// An endpoint for your checkout
app.post('/checkout', async (req, res) => {

  // This creates a new customer and it should be linked to the user model id.
  let customer = await stripe.customers.create(); // This example just creates a new Customer every time

  // This allows the app to display saved payment methods and save new ones and must be linked to firebase
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'},
  );

  // Create a PaymentIntent with the payment amount, currency, and customer
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 973, //Must be linked to the total price context of the current user // currentUser = auth.getCurrent() //currentUser.totalPrice
    currency: 'gbp',
    customer: customer.id,//Must be linked to the userId
  });

  // Send the object keys to the client
  res.send({
    publishableKey: process.env.publishable_key, // https://stripe.com/docs/keys#obtain-api-keys
    paymentIntent: paymentIntent.client_secret,
    customer: customer.id,
    ephemeralKey: ephemeralKey.secret,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Node server listening on port ${process.env.PORT}!`),
);
