# Core Dependancies

npm install @react-native-async-storage/async-storage
npm install @react-native-community/slider
npm install @react-native-firebase/app
npm install @react-native-firebase/auth
npm install @react-native-google-signin/google-signin
npm install @react-navigation/bottom-tabs
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install @react-navigation/stack
npm install react-native-cli
npm install react-native-fbsdk-next
npm install react-native-gesture-handler
npm install react-native-paper
npm install react-native-reanimated
npm install react-native-safe-area-context
npm install react-native-screens
npm install react-native-share
npm install react-native-sound
npm install react-native-vector-icons

## Log in Account

User: tjsgml0806@gmail.com 
Password: password123!

We were not able to get authentication working, so we opted to use the account above.

## Troubleshooting Build Issues

If the app fails to build or run, try these steps:

1. Reset Metro bundler cache:

```bash
npm start -- --reset-cache

OR

cd android
./gradlew clean
cd ..
npm run android
```

