import React from "react";
import { ActivityIndicator } from "react-native";

export default function Spinner(props) {
  return <ActivityIndicator size="large" style={[props.style]} />;
}
