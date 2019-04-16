/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { LogingButton } from "react-native-fbsdk";
import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

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
