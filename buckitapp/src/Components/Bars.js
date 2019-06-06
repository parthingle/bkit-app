import React, { Component } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Bars extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.bar, styles.bar1]}>
          <TouchableOpacity onPress={() => this.props.onAuth()}>
            <Text style={[styles.textLogin, { color: "#FEDBA6" }]}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bar, styles.bar2]}>
          <TouchableOpacity onPress={() => this.props.onAuth()}>
            <Text style={[styles.textLogin, { color: "#FDB17F" }]}>LOG IN</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bar, styles.bar3]}>
          <TouchableOpacity onPress={() => this.props.onAuth()}>
            <Text style={[styles.textLogin, { color: "#FFF6C0" }]}>LOG IN</Text>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    left: 0,
    bottom: 0,
    position: "absolute"
  },
  bar1: {
    backgroundColor: "#FFF6C0",
    bottom: 140
    // height:
  },
  bar2: {
    backgroundColor: "#FEDBA6",
    bottom: 70,
    alignItems: "center"
  },
  bar3: {
    backgroundColor: "#FDB17F",
    bottom: 0,
    alignItems: "center"
  },
  textLogin: {
    fontFamily: "Futura",
    fontSize: 24
  }
});
