import React, { Component } from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";

const Button = props => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View
      style={{
        backgroundColor: "#FDB17F",
        borderRadius: 5,
        padding: 10,
        height: 50,
        width: 130,
        textAlignment: "center",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontFamily: "Arial",
          fontSize: 20,
          letterSpacing: 3
        }}
      >
        {props.title}
      </Text>
    </View>
  </TouchableWithoutFeedback>
);

export default Button;
