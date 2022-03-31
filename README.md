Welcome to the readme.
Some Download Instructions:

For downloading dependencies(packages) use "npm install @....." for both Windows and Macos.

Step 1: npm run refresh

Step 2: Run the project:
- react-native run-ios
- react-native run-android

To update the pods: pod update

Difference between npm ci and npm install:

- https://stackoverflow.com/questions/48524417/should-the-package-lock-json-file-be-added-to-gitignore
- https://docs.npmjs.com/cli/v8/commands/npm-ci

Difference between pod install and pod update: https://guides.cocoapods.org/using/pod-install-vs-update.html

PS: If you encounter problems when running android concerning the "Reanimated" package, refer to the following github commit and apply the changes accordingly: https://github.com/software-mansion-labs/reanimated-2-playground/commit/71642dbe7bd96eb41df5b9f59d661ab15f6fc3f8


## Emulating the database

The database is set by default to be emulated, however, you can change the global variable in index.js 'EMULATOR_MODE_ON' to false to use the cloud version (please don't though, use the emulated version for testing and development, you can interact with the cloud database on the **deployed app**.

Install firbase tools (see reference if you don't have npm):

```
$ npm install -g firebase-tools
```

Log in to the project's account:
```
$ firebase login
```
Select the project (cd into the project folder first):
```
$ firebase use
```
Whenever you want to start using the emulator:
```
$ firebase emulators:start --only firestore,auth
```
Go to another window and seed! (will install the required modules for seeding)
```
$ npm run seed:first
```
When running the seeder after the first seed do:
```
$ npm run seed
```
