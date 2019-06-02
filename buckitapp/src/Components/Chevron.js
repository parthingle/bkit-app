import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

class Triangle extends Component {
  render() {
    return (
      <View
        style={[
          styles.triangle,
          this.props.left
            ? { borderLeftColor: this.props.color }
            : { borderRightColor: this.props.color },
          this.props.left ? styles.arrowLeft : styles.arrowRight
        ]}
      />
    );
  }
}
class Bar extends Component {
  render() {
    return (
      <View
        style={[
          {
            backgroundColor: this.props.color,
            height: 70,
            width: 8
          },
          !this.props.left ? { marginRight: -15 } : { marginLeft: -15 }
        ]}
      />
    );
  }
}
export default class Chevron extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: this.props.left ? "row-reverse" : "row"
        }}
      >
        <Triangle color="#FFF6C0" left={this.props.left} />
        <Bar color="#FFF6C0" left={this.props.left} />
        <Triangle color="#FEDBA6" left={this.props.left} />
        <Bar color="#FEDBA6" left={this.props.left} />
        <Triangle color="#FDB17F" left={this.props.left} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid"
  },
  arrowLeft: {
    borderTopWidth: 35,
    borderBottomWidth: 35,
    borderRightWidth: 0,
    borderLeftWidth: 15,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderRightColor: "transparent"
  },
  arrowRight: {
    borderTopWidth: 35,
    borderBottomWidth: 35,
    borderRightWidth: 15,
    borderLeftWidth: 0,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent"
  }
});
