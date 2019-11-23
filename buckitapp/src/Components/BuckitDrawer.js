import React, { useState } from "react";
import Drawer from "./Drawer";
import { ListItem } from "react-native-elements";
import Checkmark from "./Checkmark";
import Chevron from "./Chevron";
import ChevronButton from "./ChevronButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";

export default function BuckitDrawer(props) {
  const [offset, setOffset] = useState(0);
  const buckitItems = props.items;
  const { loadUserHome } = props;
  const categoryToIconMap = {
    Food: "silverware",
    Outdoors: "hiking",
    Shopping: "shopping",
    "Night Life": "weather-night",
    Art: "brush",
    Advocacy: "flower-tulip-outline",
    UCLA: "school"
  };
  return (
    <React.Fragment>
      <View
        onLayout={event => {
          const { y } = event.nativeEvent.layout;
          setOffset(y + 25);
        }}
        style={{ width: "100%", height: 0 }}
      ></View>
      <Drawer
        offset={offset}
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
          <ChevronButton
            style={{ transform: [{ rotate: "-90deg" }], top: 10 }}
          />
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
                        "rgba(105, 201, 203," +
                        [0.8, 0.7, 0.6, 0.7][i % 4] +
                        " )"
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
        <View style={{ width: "100%", height: 30 }} />
      </Drawer>
    </React.Fragment>
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
