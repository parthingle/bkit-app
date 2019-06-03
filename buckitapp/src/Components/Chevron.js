import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

const Chevron = props => {
  const styles = getStyles(props);
  return (
    <View style={styles.chevron}>
      <View style={styles.chevronMain} />
      <View style={[styles.chevronTriangle, styles.chevronTopLeft]} />
      <View style={[styles.chevronTriangle, styles.chevronTopRight]} />
      <View style={[styles.chevronTriangle, styles.chevronBottomLeft]} />
      <View style={[styles.chevronTriangle, styles.chevronBottomRight]} />
    </View>
  );
};

const height = 40;
const width = 6;

const getStyles = props =>
  StyleSheet.create({
    chevron: {
      width: 0,
      height: height
    },
    chevronMain: {
      width: 0,
      height: height,
      backgroundColor: props.color
    },
    chevronTriangle: {
      backgroundColor: "transparent",
      borderRightWidth: width,
      borderBottomWidth: 0,
      borderLeftWidth: 0,
      borderTopWidth: height / 2,
      borderRightColor: "transparent",
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      borderTopColor: props.color
    },
    chevronTopLeft: {
      position: "absolute",
      right: -width,
      top: 0
    },
    chevronTopRight: {
      position: "absolute",
      right: -width,
      bottom: 0,
      transform: [{ scaleY: -1 }]
    },
    chevronBottomLeft: {
      position: "absolute",
      left: -width,
      top: 0,
      transform: [{ scale: -1 }]
    },
    chevronBottomRight: {
      position: "absolute",
      left: -width,
      bottom: 0,
      transform: [{ scaleX: -1 }]
    }
  });

export default Chevron;
