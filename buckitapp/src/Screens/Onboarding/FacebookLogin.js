import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Logo from "../../Components/Logo";
import FBSDK from "react-native-fbsdk";
import Bars from "../../Components/Bars";
import * as axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

// import FBLoginButton from '../../Components/FBLoginButton'
import { LoginButton } from "react-native-fbsdk";

const { AccessToken } = FBSDK;

export default class FacebookLogin extends Component {
  constructor(props) {
    super(props);
    this.onLoginFinished = this.onLoginFinished.bind(this);
  }

  async authFacebook() {
    const data = await AccessToken.getCurrentAccessToken();
    console.log("authFacebook");
    if (!data) {
      // No access token, wait for Facebook login
      console.log("no access token, waiting for Facebook login");
      return;
    }
    const access_token = data.accessToken;

    // TODO: globalize the instance
    const instance = axios.create({
      baseURL: "http://localhost:8080"
    });
    const params = { access_token };

    try {
      console.log("GET /auth/facebook");
      console.log(params);
      const res = await instance.get("/auth/facebook", { params });
      if (res.status === 201) {
        // User does not exist: sending to sign up page
        this.props.navigation.navigate("SignUp");
        console.log("nav to signup");
      } else if (res.status === 200) {
        // User exists: sending to Main App
        // TODO: load user data
        await AsyncStorage.setItem("@jwtoken", res.data.jwtoken);
        this.props.navigation.navigate("Main");
        console.log("nav to main");
      } else {
        console.log("no nav");
      }
    } catch (err) {
      console.log("/auth/facebook: error");
    }
  }

  componentDidMount() {
    //this.authFacebook();
    console.log("FacebookLogin");
    this.authFacebook();
  }

  onLoginFinished(error, result) {
    if (error) {
      alert("Login failed with error: " + error.message);
    } else if (result.isCancelled) {
      alert("Login was cancelled");
    } else {
      this.authFacebook();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FEFDF4" }}>
        <Logo style={{ top: 30 }} />
        <View style={styles.buttonBox}>
          <LoginButton onLoginFinished={this.onLoginFinished} />
        </View>
        <Bars />
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
