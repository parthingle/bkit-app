import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default function Button(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      style={{
        height: 60,
        width: 160,
        shadowOffset: { width: 0.3, height: 0.3 },
        shadowOpacity: 0.25
      }}
    >
      <View
        style={[
          {
            backgroundColor: "#FDB17F",
            borderRadius: 5,
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
}
