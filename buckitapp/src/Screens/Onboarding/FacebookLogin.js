import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Logo from "../../Components/Logo";
import FBSDK from "react-native-fbsdk";
import Bars from "../../Components/Bars";
import * as axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

// import FBLoginButton from '../../Components/FBLoginButton'
import { LoginButton, LoginManager, AccessToken } from "react-native-fbsdk";
import { __asyncDelegator } from "tslib";

export default class FacebookLogin extends Component {
    constructor(props) {
        super(props);
    }
    authFacebook = async () => {
        LoginManager.logInWithReadPermissions(["public_profile"]).then(res => {
            if (res.isCancelled) {
                return;
            }
            AccessToken.getCurrentAccessToken().then(data => {
                axios
                    .post("http://localhost:8080/auth/facebook", {
                        access_token: data.accessToken
                    })
                    .then(res => {
                        if (res.status === 200) {
                            this.props.navigation.navigate("Home");
                        } else {
                            alert(res.status);
                        }
                    })
                    .catch(error => alert(error));
            });
        });
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
