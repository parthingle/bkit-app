import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

export default function Checkmark(props) {
  return (
    <View
      style={[
        {
          backgroundColor: "#FDAF80",
          borderRadius: 25/2,
          height: 25,
          width: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        props.style
      ]}
    >
    <View
      style={[
        {
          position: 'relative'
        },
        props.style
      ]}>
      <View
          style={[
            { 
              position: 'absolute',
              left: 6,
              bottom: -7,
              transform: [{rotate: '45deg'}],
              rotate: 45,
              width: 5,
              height: 14,
              backgroundColor: 'white',
            },
            props.style
          ]}>
        </View>
        <View
          style={[
            { 
              position: 'absolute',
              left: 0,
              bottom: -3,
              transform: [{rotate: '-45deg'}],
              width: 5,
              height: 5,
              backgroundColor: 'white',
            },
            props.style
          ]}/>
      </View>
    </View>
  );
}
