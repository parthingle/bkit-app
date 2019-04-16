import React, { Component } from "react";
import { Text, View, Button } from "react-native";

export default class MainScreen extends Component {
  render() {
    return (
      <View>
        <Button
          title="to enter details"
          onPress={() => this.props.navigation.navigate("EnterDetails")}
        />
        <Button
          title="To tabs"
          onPress={() => this.props.navigation.navigate("App")}
        />
      </View>
    );
  }
}
