import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import FBSDK from "react-native-fbsdk";
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
      if (res.status === 202) {
        // User does not exist: sending to sign up page
        this.props.navigation.navigate("SignUp");
        console.log("nav to signup");
      } else if (res.status === 201) {
        // User exists: sending to Main App
        // TODO: load user data
        await AsyncStorage.setItem("@jwtoken", res.jwtoken);
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
        <Text style={styles.titleText}>buckit</Text>
        <View style={styles.buttonBox}>
          <LoginButton onLoginFinished={this.onLoginFinished} />
        </View>
        <View style={[styles.box, styles.box1]} />
        <View style={[styles.box, styles.box2]} />
        <View style={[styles.box, styles.box3]} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  titleText: {
    top: 30,
    fontFamily: "Pacifico",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 65,
    textAlign: "center",
    lineHeight: 114,
    color: "#67B4B0"
  },
  buttonBox: {
    top: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  centerBox: {
    position: "relative"
  },
  box: {
    height: 70,
    width: "100%",
    left: 0,
    position: "absolute"
  },
  box1: {
    backgroundColor: "#FFF6C0",
    bottom: 140
  },
  box2: {
    backgroundColor: "#FEDBA6",
    bottom: 70
  },
  box3: {
    backgroundColor: "#FDB17F",
    bottom: 0
  }
});
