import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Logo from "../../Components/Logo";

export default function FirstCheck() {
  const [buckitItems, setBuckitItems] = useState([]);
  const [percentDone, setPercentDone] = useState(0);
  const [isLoading, setLoading] = useState(true);

  // this effect should never be called more than once,
  // so we pass an empty array
  useEffect(() => {
    // loadUserHome();
  }, []);

  // async function loadUserHome() {
  //   const res = await Client.userHome();
  //   if (res.status !== 200) {
  //     alert("Error loading Buckit items: " + res.status);
  //     props.navigation.navigate("Login");
  //     return;
  //   }
  //   setBuckitItems(res.data.items);
  //   setPercentDone(res.data.completionPercentage);
  //   setLoading(false);
  // }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerConstantsContainer}>
          <Logo
            style={{
              fontSize: 40,
              bottom: -10
            }}
          />
          <TouchableOpacity
            containerStyle={{ position: "absolute", left: 100 }}
          >
            <Text>skp</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          opacity: 1,
          width: "100%",
          alignItems: "center"
        }}
      >
        {buckitItems.map((item, i) => (
          <ListItem
            key={i}
            style={styles.listItem}
            containerStyle={styles.listItemContainer}
            rightIcon={<Checkmark done={item.done} />}
            leftElement={
              <React.Fragment>
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
                      "rgba(105, 201, 203," + [0.8, 0.7, 0.6, 0.7][i % 4] + " )"
                  }}
                >
                  <Icon
                    name={categoryToIconMap[`${item.category}`]}
                    size={30}
                    color="#FFF"
                  />
                </View>
                <Chevron
                  width={8}
                  height={80}
                  color={["#FFF6C0", "#FEDBA6", "#FDB17F", "#FD9268"][i % 4]}
                  style={{
                    transform: [{ rotate: "180deg" }]
                  }}
                />
              </React.Fragment>
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
            onPress={() =>
              props.navigation.navigate("ItemScreen", {
                item,
                onRefresh: loadUserHome
              })
            }
          />
        ))}
      </View>
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
    top: -15,
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
