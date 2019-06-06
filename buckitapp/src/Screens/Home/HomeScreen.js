import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import LoadingBar from "../../Components/LoadingBar";
import Logo from "../../Components/Logo";
import Graph from "../../Components/Graph";
import { ListItem, Image } from "react-native-elements";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import ChevronButton from "../../Components/ChevronButton";
import Chevron from "../../Components/Chevron";

const { height } = Dimensions.get("window");

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completion: 0.0,
      items: []
    };
  }

  async getBuckitItems() {
    try {
      console.log("GET /user/home");
      const jwt = await AsyncStorage.getItem("@jwtoken");
      if (!jwt) {
        this.props.navigation.navigate("Loading");
      }
      const instance = Axios.create({
        baseURL: "http://localhost:8080",
        headers: { "x-auth-token": jwt }
      });
      console.log(jwt);
      const res = await instance.get("/user/home");
      if (res.status === 200) {
        // Request succeeded
        this.setState({
          completion: res.data.completionPercentage,
          items: res.data.items
        });
      } else {
        // User does not exist: sending to sign up page
        this.props.navigation.navigate("SignUp");
      }
    } catch (err) {
      const msg = err + " -- " + err.response.data.message;
      alert(msg);
      console.log(msg);
    }
  }

  componentWillMount() {
    this.getBuckitItems();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-evenly"
            }}
          >
            <ChevronButton
              style={{ right: 40, top: 15, opacity: 0 }}
              onPress={() => this.props.navigation.navigate("Settings")}
            />
            <Logo
              style={{
                fontSize: 40,
                bottom: -15
              }}
            />
            <View
              style={{
                height: 10,
                width: 10
              }}
            />
          </View>
          <LoadingBar />
        </View>
        <Graph />
        <BottomDrawer
          downDisplay={height / 2}
          containerHeight={height}
          backgroundColor={"rgba(0,0,0,0)"}
          startUp={false}
          roundedEdges={true}
          borderRadius={40}
          shadow={false}
        >
          <ScrollView
            contentContainerStyle={{
              backgroundColor: "#F9F9F9",
              borderRadius: 40,
              alignItems: "center"
            }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <ChevronButton
              style={{ transform: [{ rotate: "-90deg" }], top: 10 }}
            />
            {this.state.items.map((item, i) => (
              <ListItem
                key={i}
                style={styles.listItem}
                tension={100}
                activeScale={0.95}
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: "#FEFDF4",
                  padding: 0,
                  shadowOffset: { width: 0.3, height: 0.3 },
                  shadowOpacity: 0.25
                }}
                leftElement={
                  <View
                    style={{
                      margin: 0,
                      padding: 0,
                      height: 80,
                      width: 80,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      backgroundColor:
                        "rgba(105, 201, 203," +
                        (Math.sin((i % 6) / 7) + 0.2) +
                        " )"
                    }}
                  >
                    <Image
                      source={{
                        uri:
                          item.album[0] ||
                          "https://upload.wikimedia.org/wikipedia/commons/a/ad/Royce_Hall_post_rain.jpg"
                      }}
                      style={{
                        width: 60,
                        height: 60,
                        backgroundColor: "rgba(0,0,0,0)"
                      }}
                    />
                    <Chevron
                      height={80}
                      color={
                        ["#FFF6C0", "#FEDBA6", "#FDB17F", "#FD9268"][i % 4]
                      }
                      style={{
                        transform: [{ rotate: "180deg" }],
                        left: 10
                      }}
                    />
                  </View>
                }
                title={item.title}
                titleStyle={{
                  color: "#767676",
                  fontFamily: "SF Pro Text",
                  fontSize: 17
                }}
                subtitle={item.tags.join(", ")}
                subtitleStyle={{
                  fontSize: 11,
                  color: "rgba(118, 118, 118, 0.47)"
                }}
                onPress={() =>
                  this.props.navigation.navigate("Explore", { item })
                }
              />
            ))}
          </ScrollView>
          <View style={{ width: "100%", height: 30 }} />
        </BottomDrawer>
      </View>
    );
  }
}

class Item extends Component {
  render() {
    return (
      <View style={{ backgroundColor: "red" }}>{this.props.children}</View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    top: -20,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFDF4"
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#CBEDED"
  },
  bottomDrawer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  listItem: {
    marginTop: 20,
    flexDirection: "column",
    flex: 1,
    width: "80%",
    borderRadius: 20
  },
  contentContainer: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#F2F2F2"
  },
  bottomDrawerStyle: {
    backgroundColor: "green",
    borderRadius: 60
  }
});

export default HomeScreen;
