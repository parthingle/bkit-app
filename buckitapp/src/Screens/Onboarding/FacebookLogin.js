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
    console.log("hitting auth2");
    const data = await AccessToken.getCurrentAccessToken();
    const access_token = data.accessToken;
    if (!access_token) {
      // No access token, wait for Facebook login
      console.log("no fb access token");
      return;
    } else {
      console.log("yes access token => lets hit api");
    }

    // TODO: globalize the instance
    const instance = axios.create({
      baseURL: "http://localhost:8080"
    });
    const params = { access_token };

    try {
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
    this.authFacebook();
    console.log("FacebookLogin");
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
      <View>
        <Text style={styles.messageBoxTitleText}>Authenticate yourself!</Text>
        <LoginButton onLoginFinished={this.onLoginFinished} />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  // …

  messageBox: {
    backgroundColor: "#ef553a",
    width: 300,
    paddingTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10
  },
  messageBoxTitleText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    marginBottom: 10
  },
  messageBoxBodyText: {
    color: "#fff",
    fontSize: 16
  }
});
