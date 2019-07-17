import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Loading from "./src/Screens/Onboarding/Loading";
import MainNavigator from "./src/MainNavigator";
import SignUp from "./src/Screens/Onboarding/SignUp";
import FacebookLogin from "./src/Screens/Onboarding/FacebookLogin";

export default function App(props) {
  return <AppContainer />;
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
