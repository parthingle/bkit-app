import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function Checkmark(props) {
  if (props.done) {
    return (
      <View
        style={[
          {
            marginRight: 14,
            backgroundColor: "#FDAF80",
            borderRadius: 25 / 2,
            height: 25,
            width: 25,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          },
          props.style
        ]}
      >
        <View
          style={[
            {
              position: "relative"
            },
            props.style
          ]}
        >
          <Icon name="check" size={16} color="#FFF" />
        </View>
      </View>
    );
  } else {
    return <View />;
  }
}
