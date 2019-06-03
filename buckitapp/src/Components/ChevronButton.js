import React, { Component } from "react";
import { TouchableWithoutFeedback, View, Text } from "react-native";
import Chevron from "../Components/Chevron";

const ChevronButton = props => (
  <TouchableWithoutFeedback onPress={props.onPress}>
    <View
      style={{
        width: 25,
        flexDirection: "row",
        justifyContent: "space-evenly"
      }}
    >
      <Chevron color="#FD9268" />
      <Chevron color="#FEDBA6" />
    </View>
  </TouchableWithoutFeedback>
);

export default ChevronButton;
