/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import Loading from "./src/Screens/Onboarding/Loading";
import MainNavigator from "./src/MainNavigator";
import SignUp from "./src/Screens/Onboarding/SignUp";

import { createAppContainer, createSwitchNavigator } from "react-navigation";

import FacebookLogin from "./src/Screens/Onboarding/FacebookLogin";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      SignUp: {
        screen: SignUp
      },
      Login: {
        screen: FacebookLogin
      },
      Loading: {
        screen: Loading
      },
      Main: {
        screen: MainNavigator
      }
    },
    {
      initialRouteName: "Loading"
    }
  )
);

// const AppContainer = createAppContainer(
//   createSwitchNavigator(
//     {
//       Loading: Loading,
//       App: TabNavigator,
//       Auth: Authentication
//     },
//     {
//       initialRouteName: "Auth"
//     }
//   )
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
