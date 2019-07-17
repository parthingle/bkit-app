import React, { Component } from "react";
import { Text, View } from "react-native";
import { LoginButton } from "react-native-fbsdk";
import Button from "../Components/Button";
import AsyncStorage from "@react-native-community/async-storage";

export default function Settings(props) {
  function onLogoutFinished() {
    props.navigation.navigate("Login");
  }

  async function deleteJWT() {
    try {
      await AsyncStorage.removeItem("@jwtoken");
      props.navigation.navigate("Login");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>This is a settings page.</Text>
      <View style={{ height: 20 }} />
      <View style={{ height: 20 }} />
      <Button
        title="Log out"
        onPress={() => {
          deleteJWT();
        }}
      />
    </View>
  );
}
