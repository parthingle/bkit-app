import React, { useState, useRef } from "react";
import {
  View,
  Alert,
  StyleSheet,
  Text,
  DatePickerIOS,
  Dimensions,
  ScrollView
} from "react-native";
import { StackActions } from "react-navigation";
import ChevronButton from "../Components/ChevronButton";
import MapboxGL from "@react-native-mapbox-gl/maps";
import Carousel from "react-native-snap-carousel";
import Client from "../Client";
import Button from "../Components/Button";
import SquareButton from "../Components/SquareButton";

const { height, width } = Dimensions.get("window");
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

export default function MapScreen(props) {
  const onRefresh = props.navigation.getParam("onRefresh");
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const navParams = props.navigation.getParam("items");
  const [items, setItems] = useState(navParams);

  const [coords, setCoords] = useState([
    items[0].coordinates._longitude,
    items[0].coordinates._latitude
  ]);
  const [index, setIndex] = useState(0);
  const carouselRef = useRef();

  async function buckItem() {
    const res = await Client.itemBuck(items[index].itemId, date.getTime());
    if (res.status !== 200) {
      Alert.alert("Failed to buckit item", res.errorMessage);
      return;
    }
    const newItems = items;
    newItems[index].done = true;
    setItems(newItems);
    setShowDate(false);
    setDate(new Date());

    Alert.alert(
      randomBuckitMessage(),
      `You completed this bucket list itemt.`,
      [
        {
          text: "Ok",
          onPress: () => {
            carouselRef.current.snapToNext();
          }
        }
      ]
    );
  }

  async function unbuckItem() {
    const res = await Client.itemUnbuck(items[index].itemId);
    if (res.status !== 200) {
      Alert.alert("Failed to unbuckit item", res.errorMessage);
      return;
    }
    const newItems = items;
    newItems[index].done = false;
    setItems(newItems);
    setShowDate(false);
    setDate(new Date());
    Alert.alert(randomUnbuckitMessage(), "You removed this bucket list item.", [
      {
        text: "Ok"
      }
    ]);
  }
  function toggleShowDate() {
    if (showDate) {
      setDate(new Date());
    }
    setShowDate(!showDate);
  }
  _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FEFDF4",
          height: height * 0.3,
          paddingTop: "3%",
          borderRadius: 10,
          shadowOpacity: 0.5,
          alignContent: "center"
        }}
      >
        <Text
          style={{
            paddingLeft: 25,
            paddingRight: 25,
            fontFamily: "Pacifico",
            fontWeight: "bold",
            fontSize: 480 / Math.max(20, item.title.length),
            alignContent: "center",
            color: "#67B4B0"
          }}
        >
          {item.title}
        </Text>
        <View style={{ paddingBottom: "5%", height: height * 0.155 }}>
          <ScrollView>
            <Text
              style={{
                paddingLeft: 25,
                fontSize: 300 / Math.max(20, item.title.length) + 1,
                fontFamily: "SF Pro Display",
                paddingRight: 25
              }}
            >
              {item.content.description.slice(0, 300)}
              {item.content.description.length > 300 ? "..." : ""}
            </Text>
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: "row",

            position: "absolute",
            bottom: "7%",
            left: item.done ? "32.5%" : "27.5%"
          }}
        >
          <Button
            title={!item.done ? "buckit" : "un-buckit"}
            onPress={item.done ? unbuckItem : buckItem}
            height={35}
            width={120}
            fontSize={12}
          />
          {!item.done ? (
            <SquareButton
              onPress={toggleShowDate}
              icon={showDate ? "x" : "clock"}
              iconSize={12}
              height={35}
              width={35}
            />
          ) : null}
        </View>
      </View>
    );
  };
  return (
    <MapboxGL.MapView style={{ flex: 1 }}>
      <MapboxGL.Camera
        animationDuration={750}
        centerCoordinate={coords}
        zoomLevel={13}
      />
      <MapboxGL.PointAnnotation
        key={index}
        id={index.toString()}
        coordinate={[
          items[index ? index : 0].coordinates._longitude,
          items[index ? index : 0].coordinates._latitude
        ]}
      />
      <MapboxGL.UserLocation onPress={this.onUserMarkerPress} />
      <View style={styles.headerConstantsContainer}>
        <ChevronButton
          style={{ right: 150, top: 40, opacity: 1 }}
          onPress={() => {
            onRefresh();
            props.navigation.goBack();
          }}
        />
      </View>
      <View style={styles.carousel}>
        {showDate ? (
          <View
            style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 10 }}
          >
            <DatePickerIOS
              maximumDate={new Date()}
              onDateChange={setDate}
              date={date}
              mode="date"
            />
          </View>
        ) : null}
        <Carousel
          ref={carouselRef}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={325}
          itemWidth={325}
          data={items}
          loop={true}
          layout="default"
          layoutCardOffset={0}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          onBeforeSnapToItem={idx => {
            setIndex(idx);
            setCoords([
              items[idx].coordinates._longitude,
              items[idx].coordinates._latitude
            ]);
          }}
        />
      </View>
    </MapboxGL.MapView>
  );
}
const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#B721FF",
  background2: "#21D4FD"
};

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
  },
  carousel: {
    position: "absolute",
    bottom: "5%",
    paddingLeft: "3%",
    paddingRight: "3%"
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.black
  },
  container: {
    flex: 1,
    backgroundColor: colors.background1
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  scrollview: {
    flex: 1
  },
  exampleContainer: {
    paddingVertical: 30
  },
  exampleContainerDark: {
    backgroundColor: colors.black
  },
  exampleContainerLight: {
    backgroundColor: "white"
  },
  title: {
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  titleDark: {
    color: colors.black
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.75)",
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center"
  },
  slider: {
    marginTop: 15,
    overflow: "visible" // for custom animations
  },
  sliderContentContainer: {
    paddingVertical: 10 // for custom animation
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8
  }
});
