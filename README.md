Welcome to the readme.
Some Download Instructions:

For downloading dependencies(packages) use "npm install @....." for both Windows and Macos.

Step 1: Initial packages to be installed:
- npm install @react-navigation/native-stack
- npm install @react-navigation/stack
- npm install @react-native-firebase/app
- npm install @react-native-firebase/database
- npm install @react-native-firebase/firestore

Step 2: For ios:
- cd ios
- pod install

Step 3: For android:
- cd android
- ./gradlew clean

Step 4: Run the project:
react-native run-ios
react-native run-android

PS: If you encounter problems when running android concerning the "Reanimated" package, refer to the following github commit and apply the changes accordingly: https://github.com/software-mansion-labs/reanimated-2-playground/commit/71642dbe7bd96eb41df5b9f59d661ab15f6fc3f8
