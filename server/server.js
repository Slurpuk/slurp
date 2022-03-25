require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.secret_key); // https://stripe.com/docs/keys#obtain-api-keys
app.use(express.static('.'));
app.use(express.json());

// An endpoint for your checkout
app.post('/checkout', async (req, res) => {
  //Basically creates a new customer each time and stores their key.
  let customer = await stripe.customers.create();
  let amount = (req.body.amount * 100).toFixed(0);
  //App displays saved payment methods and save new ones
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
  res.send({
    publishableKey: process.env.publishable_key,
    paymentIntent: paymentIntent.client_secret,
    customer: customer.id,
    ephemeralKey: ephemeralKey.secret,
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Node server listening on port ${process.env.PORT}!`),
);


