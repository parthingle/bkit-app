import React, { Component } from "react";
import { Text, View } from "react-native";
import CircleBar from "../Components/CircleBar";
import Button from "../Components/Button";

export default class Explore extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
        <Text>Hello, world</Text>
        <Text>test tes test</Text>
        <Text>test tes test</Text>
        <CircleBar style={{ marginTop: 10, marginBottom: 10 }} />

        <Text>
          {this.props.text || "This is a blank screen used for testing."}
        </Text>
        <Button
          title="buck it"
          onPress={() => {
            alert("hi");
          }}
        />
      </View>
    );
  }
}
