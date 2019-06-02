import React, { Component } from "react";
import { Text, View } from "react-native";

export default class BlankScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          {this.props.text || "This is a blank screen used for testing."}
        </Text>
      </View>
    );
  }
}
