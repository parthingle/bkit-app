import React from "react";
import { StyleSheet, View } from "react-native";

const Chevron = props => {
  const styles = getStyles(props);
  return (
    <View style={[styles.chevron, props.style]}>
      <View style={styles.chevronMain} />
      <View style={[styles.chevronTriangle, styles.chevronTopLeft]} />
      <View style={[styles.chevronTriangle, styles.chevronTopRight]} />
      <View style={[styles.chevronTriangle, styles.chevronBottomLeft]} />
      <View style={[styles.chevronTriangle, styles.chevronBottomRight]} />
    </View>
  );
};

Chevron.defaultProps = {
  height: 40,
  width: 6
};

const getStyles = props =>
  StyleSheet.create({
    chevron: {
      width: 0,
      height: props.height
    },
    chevronMain: {
      width: 0,
      height: props.height,
      backgroundColor: props.color
    },
    chevronTriangle: {
      backgroundColor: "transparent",
      borderRightWidth: props.width,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: props.height / 2,
      borderRightColor: "transparent",
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      borderTopColor: props.color
    },
    chevronTopLeft: {
      position: "absolute",
      right: -props.width,
      top: 0
    },
    chevronTopRight: {
      position: "absolute",
      right: -props.width,
      bottom: 0,
      transform: [{ scaleY: -1 }]
    },
    chevronBottomLeft: {
      position: "absolute",
      left: -props.width,
      top: 0,
      transform: [{ scale: -1 }]
    },
    chevronBottomRight: {
      position: "absolute",
      left: -props.width,
      bottom: 0,
      transform: [{ scaleX: -1 }]
    }
  });

export default Chevron;
