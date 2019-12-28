# Buckit LA
 The "best" way to explore Los Angeles as a UCLA student
 
 ### TestFlight:
 https://testflight.apple.com/join/1fH1LPgn
 
 
 ## How to install
 
 1. Clone repo: `git clone https://github.com/parthingle/bkit-app.git`
 2. Install packages: `yarn && cd ios/ && pod install`
 3. Start bundler: `yarn start`
 4. Launch simulator: `react-native run-ios`
 

### It'll most likely raise some error

## Common problems

0. Basic Stuff:
   - Run `Cmd + Shift + K` to Clean the project in XCode
   - Run `rm -r buckitapp/ios/build` if it exists
   - Pray to God
1. Problems with FBSDK: https://developers.facebook.com/docs/react-native/configure-ios/
2. "null is not an object ( evaluating <some library>":
   - Delete folder ios/build/ if it exists
   - `open ios/buckitapp.xcworkspace` and make sure all native libraries are in the `build phases` and `header paths`: https://facebook.github.io/react-native/docs/linking-libraries-ios
   - Build the app through xcode instead of the terminal `Cmd + B`
   - Restart your machine and try again
   - https://github.com/kmagiera/react-native-gesture-handler/issues/494 is also a useful link. 
3. "Unrecognized Font Family 'fontname'" (https://medium.com/@maulikdhameliya/how-to-solve-unrecognised-font-family-error-in-react-native-when-using-custom-icons-for-ios-42c2aa1c4f08)
   - Run `react-native link react-native-vector-icons`
   - add `fontname.tff` (where `fontname` is the unrecognized font) into `Copy Bundle Resources` under `Project > Build Phases`
   - Edit `Info.plist` to contain `fontname.tff` under the `Fonts Provided by Application Key`
4. `:CFBundleIdentifier does not exist` after running `react-native run-ios` from terminal (https://github.com/facebook/react-native/issues/7308#issuecomment-219597774)
   - `cd ios && rm -rf Pods/ Podfile.lock && pod install`
   - Run the simulator again. If it fails with the same error, try this:
