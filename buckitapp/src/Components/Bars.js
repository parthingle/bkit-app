import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Bars(props) {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, styles.bar1]}></View>
      <View style={[styles.bar, styles.bar2]}>
        <TouchableOpacity onPress={() => props.onAuth()}>
          <Text style={[styles.textLogin, { color: "#FF945B" }]}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.bar, styles.bar3]}>
        <TouchableOpacity onPress={() => props.onAuth()}>
          <Text style={[styles.textLogin, { color: "#FFF6C0" }]}>LOG IN</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.bar, styles.bar4]}></View>
    </View>
  );
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
    bottom: 210
  },
  bar2: {
    backgroundColor: "#FEDBA6",
    bottom: 140,
    alignItems: "center"
  },
  bar3: {
    backgroundColor: "#FDB17F",
    bottom: 70,
    alignItems: "center"
  },
  bar4: {
    backgroundColor: "#FF945B",
    bottom: 0
  },
  textLogin: {
    fontFamily: "Futura",
    fontSize: 24
  }
});
