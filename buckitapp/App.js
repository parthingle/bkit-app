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
  createStackNavigator,
  SafeAreaView
} from "react-navigation";

/* Screen Imports */
import Loading from './src/Screens/Loading'
import LoginOrSignup from './src/Screens/LoginOrSignup'
import Explore from './src/Screens/Explore'
import Home from './src/Screens/Home'
import Camera from './src/Screens/Camera'

const AuthStack = createStackNavigator({
  LoginOrSignup: {
    screen: LoginOrSignup,
  }
},{
  headerMode: 'none'
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
}, {
    initialRoute: "Home"
  });

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Loading: Loading,
    Auth: AuthStack,
    App: AppTab
  })
);

export default class App extends Component {
  render() {
    return (
      // SafeAreaView gives you that extra space at the top so you don't interfere with the iPhone X notch.
      // We can tinker with it to appear better than it does rn
      <SafeAreaView style={{ backgroundColor: '#F3F4F8', flex: 1 }} forceInset={{ bottom: 'never' }}>
        <AppContainer />
      </SafeAreaView>
    )
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
