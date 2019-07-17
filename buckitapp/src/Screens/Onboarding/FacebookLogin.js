import React from "react";
import { View, StyleSheet } from "react-native";
import Logo from "../../Components/Logo";
import Bars from "../../Components/Bars";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import keys from "../../keys";

export default function FacebookLogin(props) {
  async function authFacebook() {
    try {
      const login = await LoginManager.logInWithReadPermissions([
        "public_profile"
      ]);
      if (login.isCancelled) {
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();
      const access_token = data.accessToken;
      const res = await Axios.post(keys.BASE_URL + "/auth/facebook", {
        access_token
      });
      console.log(access_token);
      if (res.status === 200) {
        await AsyncStorage.setItem("@jwtoken", res.data.jwtoken);
        props.navigation.navigate("Home");
      } else {
        alert(res.status);
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#FEFDF4" }}>
      <View style={{ paddingTop: "30%" }} />
      <Logo style={{ top: 30 }} />
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
