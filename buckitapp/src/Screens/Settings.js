import React, { Component } from "react";
import { Text, View } from "react-native";
import { LoginButton } from "react-native-fbsdk";
import Button from "../Components/Button";
import AsyncStorage from "@react-native-community/async-storage";

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.onLogoutFinished = this.onLogoutFinished.bind(this);
  }
  onLogoutFinished() {
    this.props.navigation.navigate("Login");
  }
  async deleteJWT() {
    try {
      await AsyncStorage.removeItem("@jwtoken");
      alert("Deleted JWToken");
    } catch (err) {
      alert(err);
    }
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text>This is a settings page.</Text>
        <View style={{ height: 20 }} />
        <LoginButton onLogoutFinished={this.onLogoutFinished} />
        <View style={{ height: 20 }} />
        <Button title="delete JWT" onPress={() => this.deleteJWT()} />
      </View>
    );
  }
}
