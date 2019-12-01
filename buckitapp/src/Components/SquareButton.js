import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Feather";

export default function SquareButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View
        style={[
          {
            backgroundColor: "#FDB17F",
            borderRadius: 5,
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10
          },
          props.style
        ]}
      >
        <Icon style={{ color: "white" }} size={25} name={props.icon} />
      </View>
    </TouchableOpacity>
  );
}
