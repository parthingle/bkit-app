import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { blue } from "ansi-colors";

export default class LoadingBar extends Component {
  createBar(num, percentage) {
    let progressBar = [];
    let numBlue = Math.floor(num * percentage);
    let r = 223,
      g = 240;
    for (let i = 0; i < numBlue; i++) {
      progressBar.push(
        <View
          style={{
            backgroundColor: `rgb(${r}, ${g}, 255)`,
            width: 7,
            height: 34,
            margin: 2
          }}
          key={i}
        />
      );
      r = r - 14;
      g = g - 7;
    }
    for (let i = numBlue; i < num; i++) {
      progressBar.push(
        <View
          style={{
            backgroundColor: "#C4C4C4",
            opacity: 0.3,
            width: 7,
            height: 34,
            margin: 2
          }}
          key={i}
        />
      );
    }
    return progressBar;
  }

  render() {
    return (
      <View style={styles.BarContainer}>
        <Text> Progress </Text>
        {this.createBar(12, 0.5)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  BarContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    flexDirection: "row",
    height: 80,
    width: 1000
  }
});
