import React from "react";
import { View, StyleSheet } from "react-native";

export default function LoadingBar(props) {
  const count = 16;
  let bars = [...Array(count)];
  bars = bars.map((bar, i) => {
    const isFilledIn = i < count * props.percent;
    const filledInStyle = {
      backgroundColor: "#FDB17F",
      opacity: 1 - (0.5 / count) * i
    };
    return <View key={i} style={[styles.bar, isFilledIn && filledInStyle]} />;
  });
  return <View style={styles.BarContainer}>{bars}</View>;
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
    backgroundColor: "#C4C4C4",
    opacity: 0.3,
    borderRadius: 3,
    width: 7,
    height: 30,
    margin: 2
  }
});
