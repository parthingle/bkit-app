import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import Logo from "../../Components/Logo";
import Bars from "../../Components/Bars";
import Spinner from "../../Components/Spinner";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import Client from "../../Client";

export default function FacebookLogin(props) {
  const [loading, setLoading] = useState(false);
  async function authFacebook() {
    const login = await LoginManager.logInWithReadPermissions([
      "public_profile"
    ]);
    if (login.isCancelled) {
      return;
    }
    setLoading(true);
    const data = await AccessToken.getCurrentAccessToken();
    const fat = data.accessToken;
    const res = await Client.authFacebook(fat);
    if (res.status !== 200) {
      Alert.alert("Login Failed", res.errorMessage);
      return;
    }
    props.navigation.navigate("Home");
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#FEFDF4" }}>
      <View style={{ paddingTop: "30%" }} />
      <Logo style={{ top: 30 }} />
      <View style={{ paddingTop: "20%" }} />
      {loading ? <Spinner /> : <View />}
      <View style={styles.buttonBox}>
        {/* <LoginButton onLoginFinished={onLoginFinished} /> */}
      </View>
      <Bars onAuth={authFacebook} />
    </View>
  );
}

var styles = StyleSheet.create({
  buttonBox: {
    top: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  centerBox: {
    position: "relative"
  }
});
