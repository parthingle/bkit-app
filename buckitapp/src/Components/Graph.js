import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableHighlight
} from "react-native";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { pressStatus: false };
    this.renderItem = this.renderItem.bind(this);
    this.onShowUnderlay = this.onShowUnderlay.bind(this);
    this.onHideUnderlay = this.onHideUnderlay.bind(this);
    this.data = [
      { month: "JAN", count: 2, key: "JAN" },
      { month: "FEB", count: 0, key: "FEB" },
      { month: "MAR", count: 1, key: "MAR" },
      { month: "APR", count: 6, key: "APR" },
      { month: "MAY", count: 3, key: "MAY" },
      { month: "JUN", count: 7, key: "JUN" },
      { month: "JUL", count: 4, key: "JUL" },
      { month: "AUG", count: 3, key: "AUG" },
      { month: "SEP", count: 9, key: "SEP" },
      { month: "OCT", count: 11, key: "OCT" },
      { month: "NOV", count: 10, key: "NOV" },
      { month: "DEC", count: 2, key: "DEC" }
    ].reverse();
  }

  renderItem({ item, separators }) {
    const isPressed = item.key === this.state.pressedKey;
    const barColor = isPressed ? "#FDB17F" : "#C4C4C4";
    const textColor = isPressed ? "#FD9268" : "#767676";

    return (
      <TouchableHighlight
        style={styles.barContainer}
        underlayColor={null}
        onPress={() => {}}
        onShowUnderlay={() => this.onShowUnderlay(item.key)}
        onHideUnderlay={this.onHideUnderlay}
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
              { height: 10 * item.count, backgroundColor: barColor }
            ]}
          />
          <Text style={[styles.title, { color: textColor }]}>{item.month}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  onShowUnderlay(key) {
    this.setState({ pressedKey: key });
  }
  onHideUnderlay() {
    this.setState({ pressedKey: null });
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          inverted={true}
          ItemSeparatorComponent={() => <View />}
          data={this.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
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
