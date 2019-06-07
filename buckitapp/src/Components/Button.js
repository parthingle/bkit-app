import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";

const Button = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View
      style={[
        {
          backgroundColor: "#FDB17F",
          borderRadius: 5,
          paddingLeft: 20,
          paddingRight: 20,
          height: 50,
          textAlignment: "center",
          justifyContent: "center",
          alignItems: "center"
        },
        props.style
      ]}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontFamily: "SF Pro Text",
          fontSize: 20,
          letterSpacing: 3
        }}
      >
        {props.title}
      </Text>
    </View>
  </TouchableOpacity>
);

export default Button;
