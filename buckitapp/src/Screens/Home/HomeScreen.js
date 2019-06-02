import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import LoadingBar from "../../Components/LoadingBar";
import Logo from "../../Components/Logo";
import Graph from "../../Components/Graph";
import { ListItem, Image } from "react-native-elements";

const { height } = Dimensions.get("window");

const list = [
  {
    item: "Santa Monica Pier",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    distance: "3.7 miles away"
  },
  {
    item: "Beat 'SC Week",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    distance: "0.2 miles away"
  },
  {
    item: "First Fridays",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    distance: "7.3 miles away"
  },
  {
    item: "Swimming at Sunset Rec",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    distance: "0.1 miles away"
  }
];

class HomeScreen extends Component {
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
              {list.map((l, i) => (
                <ListItem
                  style={styles.listItem}
                  key={i}
                  leftElement={
                    <Image
                      source={{ uri: l.avatar_url }}
                      style={{ width: 80, height: 80 }}
                    />
                  }
                  title={l.item}
                  // titleStyle={{fontFamily: "SF Pro Text", color: "#767676"}}
                  subtitle={l.distance}
                  checkmark={true}
                  onPress={() => this.props.navigation.navigate("Buckit")}
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
