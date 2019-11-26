import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";
import Spinner from "./Spinner";

export default function Graph(props) {
  const counts = {};
  const dates = props.items.map(item => item.done);
  for (const unixDate of dates) {
    const date = new Date(parseInt(unixDate));
    const year = date.getFullYear();
    const month = date.getMonth();
    if (!counts[year]) {
      counts[year] = {};
    }
    if (!counts[year][month]) {
      counts[year][month] = 0;
    }
    counts[year][month] += 1;
  }
  const now = new Date();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];

  const years = 4;
  const data = [];
  for (let i = 0; i < 12 * years; i++) {
    const monthIndex = (now.getMonth() - i + 12 * years) % 12;
    const year = now.getFullYear() + Math.floor((now.getMonth() - i) / 12);
    if (!counts[year]) {
      counts[year] = {};
    }
    if (!counts[year][monthIndex]) {
      counts[year][monthIndex] = 0;
    }
    const count = counts[year][monthIndex];
    let month = months[monthIndex];
    if (month == "JAN") {
      month = month + " '" + (year % 100);
    }
    data.push({ month, key: i.toString(), count });
  }
  const [pressedMonth, setPressedMonth] = useState(null);
  const [graphHeight, setGraphHeight] = useState(0);

  function renderItem({ item, separators }) {
    const isPressed = item.key === pressedMonth;
    const barColor = isPressed ? "#FDB17F" : "#C4C4C4";
    const textColor = isPressed ? "#FD9268" : "#767676";
    const barHeight = 2 + 20 * item.count;
    return (
      <TouchableHighlight
        style={styles.barContainer}
        underlayColor={null}
        onPress={() => {}}
        onShowUnderlay={() => setPressedMonth(item.key)}
        onHideUnderlay={() => setPressedMonth(null)}
      >
        <View style={styles.barContainer}>
          {isPressed && (
            <View
              style={{
                zIndex: 1,
                top: Math.max(graphHeight / 3, barHeight) - graphHeight / 3,
                alignItems: "center"
              }}
            >
              <View style={styles.bubble}>
                <Text style={styles.title}>{item.count}</Text>
                <Text style={styles.text}>
                  {item.count === 1 ? "buck given" : "bucks given"}
                </Text>
              </View>
              <View style={[styles.triangle, styles.arrowDown]} />
            </View>
          )}
          <View
            style={[
              styles.bar,
              { height: barHeight, backgroundColor: barColor }
            ]}
          />
          <Text style={[styles.title, { color: textColor }]}>{item.month}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <View
      onLayout={event => {
        const { height } = event.nativeEvent.layout;
        setGraphHeight(height);
      }}
      style={styles.container}
    >
      {props.isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          inverted={true}
          ItemSeparatorComponent={() => <View />}
          data={data}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 200
  },
  separator: {
    marginLeft: 0,
    width: 1
  },
  barContainer: {
    flex: 1,
    width: 58,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  bar: {
    borderRadius: 2,
    marginBottom: 10,
    width: 7
  },
  title: {
    color: "#FD9268",
    fontFamily: "Futura",
    fontSize: 15
  },
  text: {
    fontFamily: "Futura",
    fontSize: 11,
    paddingLeft: 3
  },
  bubble: {
    padding: 3,
    minWidth: 70,
    backgroundColor: "rgb(220, 220, 220)",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    marginBottom: 10
  },
  arrowDown: {
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: "rgb(220, 220, 220)",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent"
  }
});
