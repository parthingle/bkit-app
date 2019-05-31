import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onContinue = this.onContinue.bind(this);
  }
  onContinue() {
    this.props.navigation.navigate("Main");
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FEFDF4" }}>
        <Text style={styles.titleText}>buckit</Text>
        <View style={styles.buttonBox}>
          <Text>(Future Signup Screen)</Text>
          <Button onPress={this.onContinue} title="Continue" />
        </View>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    top: 30,
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 65,
    textAlign: "center",
    lineHeight: 114,
    color: "#67B4B0"
  },
  buttonBox: {
    top: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  centerBox: {
    position: "relative"
  },
  box: {
    height: 70,
    width: "100%",
    left: 0,
    position: "absolute"
  },
  box1: {
    backgroundColor: "#FFF6C0",
    bottom: 140
  },
  box2: {
    backgroundColor: "#FEDBA6",
    bottom: 70
  },
  box3: {
    backgroundColor: "#FDB17F",
    bottom: 0
  }
});
