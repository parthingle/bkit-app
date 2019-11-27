import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Triangles from "../Components/Triangles";
const maxSize = 5;

export default function CircleBar(props) {
  const data = props.data;
  const circles = data.slice(0, maxSize - 1);
  const diff = data.length - circles.length;
  if (diff > 0) {
    circles.push("+" + Math.min(diff, 9));
  }
  return (
    <View style={[styles.container, props.style]}>
      <Triangles left={true} />
      {circles.map((initial, i) => (
        <View key={i} style={styles.circle}>
          <Text style={styles.text}>{initial}</Text>
        </View>
      ))}
      <Triangles left={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    height: 45,
    width: 45,
    borderRadius: 25,
    backgroundColor: "#FDB17F",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    opacity: 0.75
  },
  text: {
    fontFamily: "SF Pro Text",
    fontSize: 22,
    textAlign: "center",
    color: "#FEFDF4"
  },
  container: {
    width: "100%",
    height: 55,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  logo: {
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 45,
    color: "#67B4B0",
    textAlign: "center"
  }
});
