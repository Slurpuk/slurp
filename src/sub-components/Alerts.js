/*
Very simple class to store the components of a RNAlert.
 */
class Alert {
  constructor(title, message) {
    this.title = title;
    this.message = message;
  }
}

/*
Enum with alerts used throughout the app
 */
export const CustomAlerts = {
  NO_NETWORK: new Alert(
    'Too Many Requests',
    'We set a maximum limit of requests per hour for safety. Sorry for the inconvenience!',
  ),
  WRONG_PASSWORD: new Alert(
    'Wrong Password',
    "You can reset your passwork if you can't remember.",
  ),
  MANY_REQUESTS: new Alert(
    'Too many requests',
    "It looks like you've tried that too many times, you will be able to try again later.",
  ),
  ELSE: new Alert(
    'Rare Error!',
    "This is a funky error! We don't really know what went wrong, but something went wrong.",
  ),
  CODE_0001: new Alert(
    'Registration Error',
    'This is our bad, contact technical support. Error code #0001',
  ),
};

/*
CUSTOM ERROR CODES:

#0001: Users have a database model associated with their auth model.
The user model has to be verified to exist before going ahead with authentication
(regardless of whether there is an authentication model or not).
This error code is caused by finding a database model (in users, the 'Users model')
but no auth model. This mean there has been a fault in the creation of the user.
This error should never happen.

 */
