import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import LoadingBar from "../../Components/LoadingBar";
import Logo from "../../Components/Logo";
import Graph from "../../Components/Graph";
import ChevronButton from "../../Components/ChevronButton";
import Client from "../../Client";
import BuckitDrawer from "../../Components/BuckitDrawer";

export default function HomeScreen(props) {
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
      Alert.alert("Loading Content Failed", res.errorMessage);
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
        <View style={styles.headerConstantsContainer}>
          <ChevronButton
            style={{ right: 40, top: 15, opacity: 1 }}
            onPress={() => {
              Alert.alert("Are you sure you want to log out?", null, [
                {
                  text: "Cancel",
                  style: "cancel"
                },
                {
                  text: "Log Out",
                  style: "destructive",
                  onPress: () => {
                    props.navigation.navigate("Login");
                  }
                }
              ]);
            }}
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
      <BuckitDrawer
        loadUserHome={loadUserHome}
        navigation={props.navigation}
        items={buckitItems}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#CBEDED"
  },
  headerContainer: {
    top: -20,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEFDF4"
  },
  headerConstantsContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  bottomDrawer: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#F2F2F2"
  }
});
