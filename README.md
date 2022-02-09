Welcome to the readme.
Some Download Instructions:

For downloading dependencies(packages) use "npm install @....." for both Windows and Macos.

Step 1: Initial packages to be installed:
- cd IndependentCoffeeShops
- npm ci

Step 2: For ios:
- cd IndependentCoffeeShops/ios
- pod install

Step 3: For android:
- cd IndependentCoffeeShops/android
- ./gradlew clean

Step 4: Run the project:
- react-native run-ios
- react-native run-android

To update the pods: pod update

Difference between npm ci and npm install:

- https://stackoverflow.com/questions/48524417/should-the-package-lock-json-file-be-added-to-gitignore
- https://docs.npmjs.com/cli/v8/commands/npm-ci

Difference between pod install and pod update: https://guides.cocoapods.org/using/pod-install-vs-update.html

PS: If you encounter problems when running android concerning the "Reanimated" package, refer to the following github commit and apply the changes accordingly: https://github.com/software-mansion-labs/reanimated-2-playground/commit/71642dbe7bd96eb41df5b9f59d661ab15f6fc3f8

