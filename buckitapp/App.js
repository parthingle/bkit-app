/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

/* Screen Imports */
import LoginOrSignup from './src/Screens/LoginOrSignup'
import Explore from './src/Screens/Explore'
import Home from './src/Screens/Home'
import Camera from './src/Screens/Camera'

const AuthStack = createStackNavigator({
  LoginOrSignup: {
    screen: LoginOrSignup,
  }
})
const AppTab = createBottomTabNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: "Explore"
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home"
    }
  },
  Camera: {
    screen: Camera,
    navigationOptions: {
      tabBarLabel: "Camera"
    }
  },
},{
  initialRoute: "Home"
});

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Auth: AuthStack,
    App: AppTab
  })
);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

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
