import React, { Component } from "react";
import { Text, View } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';

export default class Loading extends Component {

  async getJWT() {
    const jwt = await AsyncStorage.getItem('@jwtoken');
    if (jwt === null) {
      // No jwttoken stored, send to Facebook Login
      this.props.navigation.navigate("Login");
    } else {
      // Found jwttoken, send to Main App
      // TODO: load user object
      this.props.navigation.navigate("Main")
    }
    
  }
  componentWillMount() {
    this.getJWT();
  }

  render() {
    return (
      <View>
        <Text> loading screen </Text>
      </View>
    );
  }
}
