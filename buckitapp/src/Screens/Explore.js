import React, { Component } from "react";
import { Text, View, Image, ScrollView } from "react-native";
import CircleBar from "../Components/CircleBar";
import Button from "../Components/Button";
import Chevron from "../Components/Chevron";

export default class Explore extends Component {
  render() {
    const title = "Santa Monica Pier";
    const text = [
      [
        "What's the Deal",
        "Santa Monica Pier is just a ten minute uber ride away from UCLA. Enjoy the sandy breeze as you escape from midterms"
      ],
      [
        "What To Do",
        " • Watch the sunset\n • Bird around the pier\n • Get some fresh mango"
      ]
    ];
    const uri =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Santa_monica_pier_entrance_evening.jpg/1200px-Santa_monica_pier_entrance_evening.jpg";
    return (
      <View
        style={{ flex: 1, backgroundColor: "#FEFDF4", alignItems: "center" }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            shadowOpacity: 0.5,
            shadowRadius: 30,
            paddingTop: 35,
            paddingLeft: 10,
            paddingRight: 10
          }}
        >
          <Text style={{ fontSize: 30 }}>⇦</Text>
          <Text
            style={{
              fontFamily: "Pacifico",
              color: "#67B4B0",
              fontSize: 28
            }}
          >
            {title}
          </Text>
          <Text style={{ fontSize: 30, opacity: 0 }}>⇦</Text>
        </View>
        <ScrollView
          style={{ width: "100%" }}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        >
          <Image style={{ width: "100%", height: 300 }} source={{ uri }} />
          <CircleBar
            style={{
              marginTop: 10,
              marginBottom: 10,
              shadowOpacity: 0.05,
              shadowRadius: 3
            }}
          />
          <View style={{ padding: 10, top: -20 }}>
            {text.map(([title, content], i) => {
              return (
                <View key={i}>
                  <Text
                    style={{
                      fontFamily: "Arial",
                      fontSize: 26,
                      color: "#67B4B0",
                      paddingTop: 20,
                      paddingBottom: 10
                    }}
                  >
                    {title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "Arial",
                      fontSize: 16,
                      color: "#767676",
                      lineHeight: 20
                    }}
                  >
                    {content}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{ height: 50 }} />
        </ScrollView>
        <Button
          title="buck it"
          onPress={() => {
            alert("hi");
          }}
          style={{
            position: "absolute",
            bottom: 15,
            shadowOpacity: 0.05,
            shadowRadius: 3
          }}
        />
      </View>
    );
  }
}
