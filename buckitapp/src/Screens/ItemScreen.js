import React from "react";
import { Text, View, Image, ScrollView, Alert } from "react-native";
import { StackActions } from "react-navigation";
import CircleBar from "../Components/CircleBar";
import Button from "../Components/Button";
import ChevronButton from "../Components/ChevronButton";
import Client from "../Client";

function randomBucketedMessage() {
  var messages = [
    "You bucked it up!",
    "That was bucking awesome!",
    "What the buck!?",
    "You buck sh!t up",
    "For buck's sake!",
    "Holy buck!"
  ];
  return messages[Math.floor(Math.random() * messages.length)];
}

export default function ItemScreen(props) {
  const item = props.navigation.getParam("item");
  const onRefresh = props.navigation.getParam("onRefresh");

  async function buckItem() {
    const res = await Client.itemBuck(item.itemId);
    if (res.status === 401) {
      alert("Error authenticating user: " + res.status);
      props.navigation.navigate("Login");
      return;
    } else if (res.status !== 200) {
      alert("Error buckiting item: " + res.status);
      return;
    }

    Alert.alert(
      randomBucketedMessage(),
      "You completed this bucket list item.",
      [
        {
          text: "Ok",
          onPress: () => {
            onRefresh();
            props.navigation.dispatch(StackActions.pop());
          }
        }
      ]
    );
  }

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
          onPress={buckItem}
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
