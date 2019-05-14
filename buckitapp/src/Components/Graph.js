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
      { month: "JAN", count: 2, key: 1 },
      { month: "FEB", count: 0, key: 2 },
      { month: "MAR", count: 1, key: 3 },
      { month: "APR", count: 6, key: 4 },
      { month: "MAY", count: 3, key: 5 },
      { month: "JUN", count: 7, key: 6 },
      { month: "JUL", count: 4, key: 7 },
      { month: "AUG", count: 3, key: 8 },
      { month: "SEP", count: 9, key: 9 },
      { month: "OCT", count: 11, key: 10 },
      { month: "NOV", count: 10, key: 11 },
      { month: "DEC", count: 2, key: 12 }
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
    fontSize: 12
  },
  text: {
    fontFamily: "Futura",
    fontSize: 8,
    paddingLeft: 3
  },
  bubble: {
    width: 75,
    height: 25,
    backgroundColor: "rgba(196, 196, 196, 0.34)",
    borderRadius: 3,
    flexDirection: "row",
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
    borderTopWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 0,
    borderLeftWidth: 5,
    borderTopColor: "rgba(196, 196, 196, 0.34)",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent"
  }
});
