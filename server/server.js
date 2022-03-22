//import {GlobalContext} from '../App';
//import react, {useContext} from 'react';
//const globalContext = react.useContext(GlobalContext);
const express = require('express');
const {Stripe} = require('stripe');
const stripe = new Stripe(
  'sk_test_51KRjSVGig6SwlicvjdIQgL4wuz8wkr61CkyJDzTfyUWIM0sXWMHm17ibH4kk4anzkgpwKD14jhjjyKM10GAgFWjJ00r7kJHSov',
  {
    apiVersion: '2020-08-27',
    typescript: true,
  },
);
const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  let customer = await stripe.customers.create();

  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'},
  );

  const paymentIntent = await stripe.paymentIntents.create({
    currency: 'gbp',
    amount: '180',
    customer: customer.id,
  });
  res.send({
    publishableKey: process.env.publishable_key,
    paymentIntent: paymentIntent.client_secret,
    customer: customer.id,
    ephemeralKey: ephemeralKey.secret,
  });
});

app.listen(8000, () => console.log('Server up'));
