import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import LoadingBar from "../../Components/LoadingBar";
import Logo from "../../Components/Logo";
import Graph from "../../Components/Graph";
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

        // alert(JSON.stringify(res.data));
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
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Logo
            style={{
              fontSize: 40,
              bottom: -15
            }}
          />
          <LoadingBar />
        </View>
        <Graph />
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
                  checkmark={true}
                  onPress={() => this.props.navigation.navigate("Explore", {
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
  }
});

export default HomeScreen;
