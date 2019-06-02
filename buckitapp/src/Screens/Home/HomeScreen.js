import React, { Component } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import LoadingBar from "../../Components/LoadingBar";
import { ListItem, Image } from "react-native-elements";
import Axios from "axios";

const { height } = Dimensions.get("window");

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      completion: 0.0,
      items: []
    }
  }

  async getBuckitItems() {
    const instance = Axios.create({
      baseURL: "http://localhost:8080"
    });
    try {
      console.log("GET /user/home");
      const res = await instance.get("/user/home");
      if (res.status === 200) {
        // Request succeeded
        console.log("request succeeded");

        alert(JSON.stringify(res.data));
        this.setState({
          completion: res.data.completionPercentage,
          items: res.data.items
        })
      }
      else {
        // User does not exist: sending to sign up page
        this.props.navigation.navigate("SignUp");
        console.log("request failed. nav to signup");
      }
    } catch (err) {
      console.log("/user/home: error");
    }
  }

  componentWillMount() {
    this.getBuckitItems();
  }

  render() {
    return (
      <View style={styles.homeScreenStyle}>
        <Text>Cool Chris Club</Text>
        <LoadingBar/>
        <BottomDrawer
          downDisplay={height / 2}
          containerHeight={height}
          backgroundColor={"#F9F9F9"}
          startUp={false}
          roundedEdges={true}
        >
          <View style={styles.bottomDrawerStyle}>
            <ScrollView contentContainerStyle={{ alignItems: "center" }}>
              {this.state.items.map((l, i) => (
                <ListItem
                  style={styles.listItem}
                  key={i}
                  leftElement={
                    <Image
                      source={{ uri: l.album[0] }}
                      style={{ width: 80, height: 80 }}
                    />
                  }
                  title={l.title}
                  // titleStyle={{fontFamily: "SF Pro Text", color: "#767676"}}
                  subtitle={l.distance}
                  checkmark={l.done ? true : false}
                  onPress={() => this.props.navigation.navigate("Buckit", {
                    item: l
                  })}
                />
              ))}
            </ScrollView>
          </View>
        </BottomDrawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeScreenStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  listItem: {
    marginTop: 20,
    flexDirection: "column",
    flex: 1,
    width: "80%",
    borderRadius: 20,
  },
  bottomDrawerStyle: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#F2F2F2",
  }
});

export default HomeScreen;
