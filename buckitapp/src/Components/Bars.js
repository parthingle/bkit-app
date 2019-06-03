import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class Bars extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.bar, styles.bar1]} />
        <View style={[styles.bar, styles.bar2]} />
        <View style={[styles.bar, styles.bar3]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    left: 0,
    bottom: 0,
    position: "absolute"
  },
  bar: {
    height: 70,
    width: "100%",
    left: 0,
    bottom: 0,
    position: "absolute"
  },
  bar1: {
    backgroundColor: "#FFF6C0",
    bottom: 140
  },
  bar2: {
    backgroundColor: "#FEDBA6",
    bottom: 70
  },
  bar3: {
    backgroundColor: "#FDB17F",
    bottom: 0
  }
});
