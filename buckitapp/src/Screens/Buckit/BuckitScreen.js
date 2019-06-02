import React, { Component } from "react";
import { Text, View, Image, StyleSheet, FlatList } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  stretch: {
    flex: 1,
    height: undefined,
    width: undefined,
    alignSelf: "stretch"
  },
  InfoSection: {
    flex: 1,
    margin: 15
  },
  header: {
    fontSize: 24,
    marginBottom: 5
  },
  text: {
    fontSize: 14
  },
  TextSection: {
    marginTop: 10,
    marginBottom: 10
  }
});

export default class BuckitScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.stretch}
          resizeMode="contain"
          source={require("../../SantaMonica.png")}
        />
        <View style={styles.InfoSection}>
          <View style={styles.TextSection}>
            <Text style={styles.header}>What's the Deal</Text>
            <Text style={styles.text}>
              Santa Monica Pier is just a ten minute uber ride away from UCLA.
              Enjoy the sandy breeze as you escape from midterms
            </Text>
          </View>
          <View style={styles.TextSection}>
            <Text style={styles.header}>What To Do</Text>
            <FlatList
              data={[
                { bullet: "Bird around the pier" },
                { bullet: "Play volleyball on the beach" },
                { bullet: "Take cool pictures" }
              ]}
              renderItem={({ item }) => <Text>{`\u2022 ${item.bullet}`}</Text>}
            />
          </View>
        </View>
      </View>
    );
  }
}
