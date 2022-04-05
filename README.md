## Project Name: Jumping Potatoes

# Software Name: Slurp

**Members:**
- Ardan Kavuklu
- Jad Sbaï
- Liam Clark Gutiérrez
- Meyad Golmakani
- Sara Latif
- Sean Stanfield
- Sonia Koszut
- Pascual Merita Torres
- Vicente Sebastião

### Significant source code dependencies:

- Stripe: *https://www.npmjs.com/package/@stripe/stripe-react-native*
- MapView: *https://www.npmjs.com/package/react-native-maps*
- ReactNative Firebase: *https://rnfirebase.io/*
- ScrollBottomSheet: *https://www.npmjs.com/package/react-native-scroll-bottom-sheet*

### Deployment:

Will be deployed to Appetizer by the 15th of April.

### Users:

All passwords are "Password123!", the following users are seeded with orders. All coffee shops are seeded with orders and items.

#### Default Users

- jeb@example.org <br>
- val@example.org <br>
- billie@example.org <br>

#### Current unsolved issues:

- With the current implementation using firestore, tracking the conection state of logged-in user is impossible. As a workaround, we set a timeout on critical queries that would return a connection alert after expiring.
