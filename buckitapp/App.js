/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { LoginButton } from "react-native-fbsdk";
import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";

import Authentication from "./src/Screens/Authentication";
import Loading from "./src/Screens/Loading";

const AuthStack = createStackNavigator({
  Authentication: {
    screen: Authentication
  }
});

class Test1 extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Tab 1</Text>
      </View>
    );
  }
}

class Test2 extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Tab 2</Text>
      </View>
    );
  }
}
const tab = createBottomTabNavigator({
  tab1: Test1,
  tab2: Test2
});

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      App: tab,
      Auth: AuthStack
    },
    {
      initialRouteName: "Auth"
    }
  )
);
type Props = {};
export default class App extends Component<Props> {
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
