import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

export default class LoadingBar extends Component {
  createBar(num, percentage) {
    let progressBar = [];
    let numBlue = Math.floor(num * percentage);
    for (let i = 0; i < numBlue; i++) {
      progressBar.push(
        <View
          style={[
            styles.bar,
            { backgroundColor: "#FDB17F", opacity: 0.5 + i * 0.05 }
          ]}
          key={i}
        />
      );
    }
    for (let i = numBlue; i < num; i++) {
      progressBar.push(
        <View style={[{ backgroundColor: "#C4C4C4" }, styles.bar]} key={i} />
      );
    }
    return progressBar;
  }

  render() {
    return <View style={styles.BarContainer}>{this.createBar(16, 0.7)}</View>;
  }
}

const styles = StyleSheet.create({
  BarContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    height: 50,
    width: 1000
  },
  bar: {
    opacity: 0.3,
    borderRadius: 3,
    width: 7,
    height: 30,
    margin: 2
  }
});
