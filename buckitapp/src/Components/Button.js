import React, { useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function Button(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        disabled={props.disabled}
        onPress={props.onPress}
        style={{
          shadowOffset: { width: 0.3, height: 0.3 },
          shadowOpacity: 0.25
        }}
      >
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
      <View
        style={{
          borderLeftWidth: 1,
          borderLeftColor: "white"
        }}
      />
      {props.done ? (
        <View />
      ) : (
        <TouchableOpacity onPress={props.toggleShowDate}>
          <View
            style={[
              {
                backgroundColor: "#FDB17F",
                borderRadius: 5,
                height: 50,
                width: 50,
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              },
              props.style
            ]}
          >
            <Icon style={{ color: "white" }} size={25} name="clock" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
