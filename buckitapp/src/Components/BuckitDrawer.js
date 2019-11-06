import React from "react";
import Drawer from "./Drawer";
import { ListItem, Image } from "react-native-elements";
import Checkmark from "./Checkmark";
import Chevron from "./Chevron";
import ChevronButton from "./ChevronButton";
import Icon from "react-native-vector-icons/FontAwesome";
import { View, StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default function BuckitDrawer(props) {
  const buckitItems = props.items;
  const { loadUserHome } = props;
  return (
    <Drawer
      offset={height / 2}
      style={{
        borderRadius: 40,
        backgroundColor: "white",
        shadowColor: "#CECDCD",
        shadowRadius: 3,
        shadowOpacity: 5
      }}
    >
      <View
        style={{
          opacity: 1,
          width: "100%",
          alignItems: "center"
        }}
      >
        <ChevronButton style={{ transform: [{ rotate: "-90deg" }], top: 10 }} />
        {buckitItems.map((item, i) => (
          <ListItem
            key={i}
            style={styles.listItem}
            containerStyle={styles.listItemContainer}
            rightIcon={<Checkmark done={item.done} />}
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
                    (Math.sin((i % 6) / 10) + 0.4) +
                    " )"
                }}
              >
                <Icon name="cutlery" size={35} color="#FFF" />
                <Chevron
                  height={80}
                  color={["#FFF6C0", "#FEDBA6", "#FDB17F", "#FD9268"][i % 4]}
                  style={{
                    transform: [{ rotate: "180deg" }],
                    left: 25
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
            onPress={() =>
              props.navigation.navigate("ItemScreen", {
                item,
                onRefresh: loadUserHome
              })
            }
          />
        ))}
      </View>
      <View style={{ width: "100%", height: 30 }} />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  listItem: {
    marginTop: 20,
    flexDirection: "column",
    flex: 1,
    width: "80%",
    borderRadius: 10
  },
  listItemContainer: {
    borderRadius: 10,
    backgroundColor: "#FEFDF4",
    padding: 0,
    shadowOffset: { width: 0.3, height: 0.3 },
    shadowOpacity: 0.25
  }
});
