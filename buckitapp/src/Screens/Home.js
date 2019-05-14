import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import BottomDrawer from "rn-bottom-drawer";
import LoadingBar from "../Components/LoadingBar";
import { ListItem } from 'react-native-elements'

const {height} = Dimensions.get('window');

const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
]

class Home extends Component {
  renderContent = () => {
    return (
      <View style={styles.contentContainer}>
        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={l.name}
              subtitle={l.subtitle}
              checkmark={true}
            />
          ))
        }
      </View>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>Home Page!</Text>
        <LoadingBar />
        <BottomDrawer
          downDisplay={height / 2}
          containerHeight={height * .96}
          backgroundColor={"#F9F9F9"}
          onExpanded={() => {
            console.log("expanded");
          }}
          onCollapsed={() => {
            console.log("collapsed");
          }}
          startUp={false}
        >
          {this.renderContent()}
        </BottomDrawer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  bottomdrawer: {
    backgroundColor: "#F9F9F9"
  },
  // listItem: {
  //   flex: 1,
  //   height: 200,
  //   backgroundColor: "#FEFDF4"
  // },
  contentContainer: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#F2F2F2"
    // justifyContent: "space-around"
  }
});

export default Home;
