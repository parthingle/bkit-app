import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Logo from "../../Components/Logo";
import FBSDK from "react-native-fbsdk";
import Bars from "../../Components/Bars";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import keys from "../../keys";

export default class FacebookLogin extends Component {
  constructor(props) {
    super(props);
  }

  authFacebook = async () => {
    try {
      const login = await LoginManager.logInWithReadPermissions([
        "public_profile"
      ]);
      if (login.isCancelled) {
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();
      const access_token = data.accessToken;
      const res = await axios.post(keys.BASE_URL + "/auth/facebook", {
        access_token: data.accessToken
      });
      console.log(access_token);
      if (res.status === 200) {
        await AsyncStorage.setItem("@jwtoken", res.data.jwtoken);
        this.props.navigation.navigate("Home");
      } else {
        alert(res.status);
      }
    } catch (err) {
      alert(err);
      console.log(err);
    }
  };
  componentDidMount() {}
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FEFDF4" }}>
        <View style={{ paddingTop: "30%" }} />
        <Logo style={{ top: 30 }} />
        <View style={styles.buttonBox}>
          {/* <LoginButton onLoginFinished={this.onLoginFinished} /> */}
        </View>
        <Bars onAuth={this.authFacebook} />
      </View>
    );
  }
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
