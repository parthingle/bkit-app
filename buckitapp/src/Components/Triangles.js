import React from "react";
import { View, StyleSheet } from "react-native";

const height = 55;

function Triangle(props) {
  return (
    <View
      style={[
        styles.triangle,
        {
          [props.left ? "borderLeftColor" : "borderRightColor"]: props.color
        },
        props.left ? styles.arrowLeft : styles.arrowRight
      ]}
    />
  );
}

function Bar(props) {
  return (
    <View
      style={[
        {
          backgroundColor: props.color,
          height: height,
          width: 8
        },
        props.left ? { marginLeft: -15 } : { marginRight: -15 }
      ]}
    />
  );
}

export default function Triangles(props) {
  return (
    <View
      style={{
        flexDirection: props.left ? "row-reverse" : "row"
      }}
    >
      <Triangle color="#FFF6C0" left={props.left} />
      <Bar color="#FFF6C0" left={props.left} />
      <Triangle color="#FEDBA6" left={props.left} />
      <Bar color="#FEDBA6" left={props.left} />
      <Triangle color="#FDB17F" left={props.left} />
    </View>
  );
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid"
  },
  arrowLeft: {
    borderTopWidth: height / 2,
    borderBottomWidth: height / 2,
    borderRightWidth: 0,
    borderLeftWidth: 15,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "transparent"
  },
  arrowRight: {
    borderTopWidth: height / 2,
    borderBottomWidth: height / 2,
    borderRightWidth: 15,
    borderLeftWidth: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent"
  }
});
