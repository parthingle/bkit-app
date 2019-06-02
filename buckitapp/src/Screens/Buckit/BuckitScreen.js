import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default class BuckitScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      item: null
    }
  }

  componentWillMount() {
    this.setState({item: this.props.navigation.getParam("item")});
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.item.title}</Text>
        <Text>Check local storage for token;</Text>
        <Text>forward to "App" if token is present;</Text>
        <Text>"Auth" otherwise</Text>
        <Button
          title="Go to Auth"
          onPress={() => this.props.navigation.navigate("Auth")}
        />
        <Button
          title="Go to App"
          onPress={() => this.props.navigation.navigate("App")}
        />
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

//make this component available to the app
