import React, { useEffect } from "react";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

export default function Loading(props) {
  async function getJWT() {
    const jwt = await AsyncStorage.getItem("@jwtoken");
    if (jwt === null) {
      // No jwttoken stored, send to Facebook Login
      console.log("No jwttoken stored: sending to Facebook Login");
      props.navigation.navigate("Login");
    } else {
      // Found jwttoken, send to Main App
      console.log("Found jwttoken: sending to Main App");
      props.navigation.navigate("Main");
    }
  }
  useEffect(() => {
    getJWT();
  }, []);
  return (
    <View>
      <Text> loading screen </Text>
    </View>
  );
}
