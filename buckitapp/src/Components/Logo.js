import React from "react";
import { Text, StyleSheet } from "react-native";

export default function Logo(props) {
  return <Text style={[styles.logo, props.style]}>buckit</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 65,
    color: "#67B4B0",
    textAlign: "center"
  }
});
