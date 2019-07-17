import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Logo from "../../Components/Logo";
import Bars from "../../Components/Bars";

export default function SignUp(props) {
  return (
    <View style={{ flex: 1, backgroundColor: "#FEFDF4" }}>
      <Logo style={{ top: 30 }} />
      <View style={styles.buttonBox}>
        <Text>(Future Signup Screen)</Text>
        <Button
          onPress={() => props.navigation.navigate("Main")}
          title="Continue"
        />
      </View>
      <Bars />
    </View>
  );
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
