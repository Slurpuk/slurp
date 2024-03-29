
# Software Name: Slurp

**Members:**
- Ardan Kavuklu
- Jad Sbaï
- Liam Clark Gutiérrez
- Meyad Golmakani
- Sara Latif
- Sean Stanfield
- Pascual Merita Torres

### Significant source code dependencies:

- Stripe: *https://www.npmjs.com/package/@stripe/stripe-react-native*
- MapView: *https://www.npmjs.com/package/react-native-maps*
- ReactNative Firebase: *https://rnfirebase.io/*
- ScrollBottomSheet: *https://www.npmjs.com/package/react-native-scroll-bottom-sheet*

### Deployment:

Deployed to Appetizer by the 15th of April.

### Users:

All passwords are "Password123!", the following users are seeded with orders. All coffee shops are seeded with orders and items.

#### Default Users

- jeb@example.org <br>
- val@example.org <br>
- billie@example.org <br>


## Stripe credit card details, used for payments:
![image](https://user-images.githubusercontent.com/31474291/161755323-f3e05eb6-7a9a-422a-8466-a9fc45e5be80.png)


## Development guidelines

### Recommendations:
- Use webstorm as an IDE.
- Set up auto save on your IDE.
- [Set ESlint to run on file save](https://www.jetbrains.com/help/idea/eslint.html#ws_eslint_configure_run_eslint_on_save).

### Rules
- Code on a separate branch appropriately named.
- Commit rules:
  - Name your commits [properly](https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/).
  - Separate your commits into logical chunks of code.
- Pull request rules:
  - Don't leave print statements
  - Don't leave commented code unless it is highly likely to serve a future purpose.
  - Check your ESlint warnings, they are (usually) there for a reason.
  - Describe what you have done in detail proportional to the complexity of the task.
  - Review your own code as if you were reviewing someone else's request.
  - Test your code locally and then make sure it passes CI/CD workflows
- Update the Kanban board when you start/finish/approve a task.


### Processes and standards 

- Write DRY, SOLID and commented code.
- Refactor the whole code base at the end of each sprint.
- Run code coverage regularly (look into how to do it with Detox)
- Most of the team members should be involved in reviewing the pull requests 
- Every team member should test their code on both ios and android (detox) before making a pull request.
- Branch naming convention: ReleaseVersionTrelloID/branchname


### Stripe payment Firebase extension docs:
https://github.com/stripe/stripe-firebase-extensions/blob/master/firestore-stripe-payments/POSTINSTALL.md


## Testing

  ```npm run test```
