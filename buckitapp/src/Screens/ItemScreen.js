import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Alert,
  DatePickerIOS
} from "react-native";
import { StackActions } from "react-navigation";
import CircleBar from "../Components/CircleBar";
import Button from "../Components/Button";
import SquareButton from "../Components/SquareButton";
import ChevronButton from "../Components/ChevronButton";
import Client from "../Client";

function randomBuckitMessage() {
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

function randomUnbuckitMessage() {
  var messages = ["Aww...", "Maybe next time ;)", "Oh well.", "That's too bad"];
  return messages[Math.floor(Math.random() * messages.length)];
}

export default function ItemScreen(props) {
  const item = props.navigation.getParam("item");
  const onRefresh = props.navigation.getParam("onRefresh");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  function toggleShowDate() {
    if (showDate) {
      setDate(new Date());
    }
    setShowDate(!showDate);
  }

  async function buckItem() {
    const res = await Client.itemBuck(item.itemId, date.getTime());
    if (res.status !== 200) {
      Alert.alert("Failed to buckit item", res.errorMessage);
      return;
    }

    Alert.alert(randomBuckitMessage(), "You completed this bucket list item.", [
      {
        text: "Ok",
        onPress: () => {
          onRefresh();
          props.navigation.dispatch(StackActions.pop());
        }
      }
    ]);
  }

  async function unbuckItem() {
    const res = await Client.itemUnbuck(item.itemId);
    if (res.status !== 200) {
      Alert.alert("Failed to unbuckit item", res.errorMessage);
      return;
    }
    Alert.alert(randomUnbuckitMessage(), "You removed this bucket list item.", [
      {
        text: "Ok",
        onPress: () => {
          onRefresh();
          props.navigation.dispatch(StackActions.pop());
        }
      }
    ]);
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
    <React.Fragment>
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
              fontSize: 600 / Math.max(20, title.length)
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
              if (user.length < 5) {
                return "??";
              }
              return (
                ["A", "M", "J", "E", "C", "S", "K", "L", "D"][Number(user[3])] +
                ["W", "J", "M", "S", "B", "R", "H", "T", "P"][Number(user[4])]
              );
            })}
            style={{
              marginTop: 10,
              shadowOpacity: 0.05,
              shadowRadius: 3
            }}
          />
          <View style={{ padding: 10 }}>
            {text.map(([title, content], i) => {
              return (
                <View key={i} style={{ padding: 5 }}>
                  <Text
                    style={{
                      fontFamily: "SF Pro Display",
                      fontSize: 26,
                      color: "#67B4B0"
                    }}
                  >
                    {title}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "SF Pro Display",
                      fontSize: 16,
                      color: "#767676",
                      lineHeight: 20,
                      padding: 5
                    }}
                  >
                    {content}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={{ width: "100%", height: 40 }}></View>
        </ScrollView>
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 10,
          alignItems: "center"
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Button
            title={!item.done ? "buckit" : "un-buckit"}
            onPress={item.done ? unbuckItem : buckItem}
          />
          {!item.done ? (
            <SquareButton
              onPress={toggleShowDate}
              icon={showDate ? "x" : "clock"}
            />
          ) : null}
        </View>
        {!item.done && showDate ? (
          <DatePickerIOS mode="date" date={date} />
        ) : null}
      </View>
      {!item.done && showDate ? (
        <DatePickerIOS
          maximumDate={new Date()}
          onDateChange={setDate}
          date={date}
          mode="date"
        />
      ) : null}
    </React.Fragment>
  );
}
