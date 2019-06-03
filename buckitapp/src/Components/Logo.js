import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export default class Graph extends Component {
  render() {
    return <Text style={[styles.logo, this.props.style]}>buckit</Text>;
  }
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
