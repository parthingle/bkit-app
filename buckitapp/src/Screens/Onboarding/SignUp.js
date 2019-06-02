import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Logo from "../../Components/Logo";
import Bars from "../../Components/Bars";

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
        <Logo style={{ top: 30 }} />
        <View style={styles.buttonBox}>
          <Text>(Future Signup Screen)</Text>
          <Button onPress={this.onContinue} title="Continue" />
        </View>
        <Bars />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonBox: {
    top: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  centerBox: {
    position: "relative"
  }
});
