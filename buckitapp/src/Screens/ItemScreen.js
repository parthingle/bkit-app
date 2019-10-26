import React from "react";
import { Text, View, Image, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import { StackActions } from "react-navigation";
import keys from "../keys";
import CircleBar from "../Components/CircleBar";
import Button from "../Components/Button";
import ChevronButton from "../Components/ChevronButton";

function randomBucketedMessage() {
  var messages = [
    "You bucked it up!",
    "That was bucking awesome!",
    "What the buck?",
    "You buck sh!t up",
    "You're doing great honey",
    "For buck's sake",
    "Holy buck!"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

function randomFace() {
  var faces = [":O", ";)", ":P", "¯\\_(ツ)_/¯"];
  return faces[Math.floor(Math.random() * faces.length)];
}

export default function ItemScreen(props) {
  async function handleBuckit() {
    const jwtoken = await AsyncStorage.getItem("@jwtoken");
    console.log(keys.BASE_URL + "/item/buck/" + item.itemId);
    console.log(jwtoken);
    const res = await Axios.post(
      keys.BASE_URL + "/item/buck/" + item.itemId,
      null,
      {
        headers: { "x-auth-token": jwtoken }
      }
    );
    Alert.alert(randomBucketedMessage(), randomFace(), [
      {
        text: "Ok",
        onPress: () => {
          props.navigation.dispatch(StackActions.pop());
        }
      }
    ]);
  }

  const item = props.navigation.getParam("item");
  const {
    usersWhoBucketed,
    title,
    content: { description, thingsToDo },
    album
  } = item;

  const text = [
    ["What's the Deal", description],
    ["What To Do", thingsToDo.map(line => "• " + line + "\n").join("")]
  ];
  const uri = album[0];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FEFDF4",
        alignItems: "center"
      }}
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
        <ChevronButton onPress={() => props.navigation.goBack()} />
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
        overScrollMode="never"
      >
        <Image
          style={{ width: "100%", height: 300 }}
          source={{
            uri:
              uri ||
              "https://upload.wikimedia.org/wikipedia/commons/a/ad/Royce_Hall_post_rain.jpg"
          }}
        />
        <CircleBar
          data={usersWhoBucketed.map(user => {
            if (user.length < 2) {
              return "??";
            }
            return (
              String.fromCharCode(65 + Number(user[0])) +
              String.fromCharCode(65 + Number(user[1]))
            );
          })}
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
                    fontFamily: "SF Pro Display",
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
                    fontFamily: "SF Pro Display",
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
      {!item.done && (
        <Button
          title="buck it"
          onPress={handleBuckit}
          style={{
            bottom: 25,
            shadowOpacity: 0.05,
            shadowRadius: 3
          }}
        />
      )}
    </View>
  );
}
