import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import LoadingBar from "../../Components/LoadingBar";
import Logo from "../../Components/Logo";
import Graph from "../../Components/Graph";
import { ListItem, Image } from "react-native-elements";
import Checkmark from "../../Components/Checkmark";
import ChevronButton from "../../Components/ChevronButton";
import Chevron from "../../Components/Chevron";
import Client from "../../Client";

const { height } = Dimensions.get("window");

function HomeScreen(props) {
  const [buckitItems, setBuckitItems] = useState([]);
  const [percentDone, setPercentDone] = useState(0);
  const [isLoading, setLoading] = useState(true);

  // this effect should never be called more than once,
  // so we pass an empty array
  useEffect(() => {
    loadUserHome();
  }, []);

  async function loadUserHome() {
    const res = await Client.userHome();
    if (res.status !== 200) {
      alert("Error loading Buckit items: " + res.status);
      props.navigation.navigate("Login");
      return;
    }
    setBuckitItems(res.data.items);
    setPercentDone(res.data.completionPercentage);
    setLoading(false);
  }

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
            style={{ right: 40, top: 15, opacity: 1 }}
            onPress={() => props.navigation.navigate("Settings")}
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
        <LoadingBar percent={percentDone} />
      </View>
      <Graph isLoading={isLoading} items={buckitItems} />
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
            alignItems: "center",
            minHeight: 60
          }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <ChevronButton
            style={{ transform: [{ rotate: "-90deg" }], top: 10 }}
          />
          {buckitItems.map((item, i) => (
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
              rightIcon={
                item.done ? (
                  <Checkmark
                    style={{
                      marginRight: 14
                    }}
                  />
                ) : (
                  <View />
                )
              }
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
                    color={["#FFF6C0", "#FEDBA6", "#FDB17F", "#FD9268"][i % 4]}
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
                // fontFamily: "SF Pro Text",
                fontSize: 17
              }}
              subtitle={item.tags.join(", ")}
              subtitleStyle={{
                fontSize: 11,
                color: "rgba(118, 118, 118, 0.47)"
              }}
              onPress={() => props.navigation.navigate("ItemScreen", { item })}
            />
          ))}
        </ScrollView>
        <View style={{ width: "100%", height: 30 }} />
      </BottomDrawer>
    </View>
  );
}

function useBuckitItems() {
  return buckitItems;
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
