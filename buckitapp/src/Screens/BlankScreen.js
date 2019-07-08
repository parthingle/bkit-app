import React from "react";
import { Text, View } from "react-native";

export default function BlankScreen(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{props.text || "This is a blank screen used for testing."}</Text>
    </View>
  );
}
