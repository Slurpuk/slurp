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
  const paymentIntent = await stripe.paymentIntents.create({
    amount: '3000',
    currency: 'gbp',
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntent: paymentIntent,
  });
});

app.listen(8000, () => console.log('Server up'));
