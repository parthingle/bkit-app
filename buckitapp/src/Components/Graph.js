import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";

export default function Graph(props) {
  const counts = {};
  for (const unixDate of props.dates) {
    const date = new Date(unixDate);
    if (counts[date.getFullYear()][date.getMonth()]) {
      counts[date.getFullYear()][date.getMonth()] += 1;
    } else {
      counts[date.getFullYear()][date.getMonth()] = 0;
    }
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

  const data = [];
  for (let i = 0; i < 12; i++) {
    const monthIndex = (now.getMonth() - i + 12) % 12;
    const year = now.getFullYear() - Math.floor((i + now.getMonth()) / 12);
    const count = counts[year] ? count[year][monthIndex] || 0 : 0;
    const month = months[monthIndex];
    data.push({ month, key: month, count });
  }
  const [pressedMonth, setPressedMonth] = useState(null);

  function renderItem({ item, separators }) {
    const isPressed = item.key === pressedMonth;
    const barColor = isPressed ? "#FDB17F" : "#C4C4C4";
    const textColor = isPressed ? "#FD9268" : "#767676";

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
            <View style={styles.bubble}>
              <Text style={styles.title}>{item.count}</Text>
              <Text style={styles.text}>
                {item.count == 1 ? "buck given" : "bucks given"}
              </Text>
            </View>
          )}
          {isPressed && <View style={[styles.triangle, styles.arrowDown]} />}
          <View
            style={[
              styles.bar,
              { height: 2 + 10 * item.count, backgroundColor: barColor }
            ]}
          />
          <Text style={[styles.title, { color: textColor }]}>{item.month}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        inverted={true}
        ItemSeparatorComponent={() => <View />}
        data={data}
        renderItem={renderItem}
      />
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
    width: 50,
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
    backgroundColor: "rgba(196, 196, 196, 0.34)",
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
    borderTopColor: "rgba(196, 196, 196, 0.34)",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent"
  }
});
