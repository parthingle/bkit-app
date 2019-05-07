import BlankScreen from "./Screens/BlankScreen";
import Home from "./Screens/Home";
import { createBottomTabNavigator } from "react-navigation";

const AppTab = createBottomTabNavigator(
  {
    Explore: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home"
      }
    },
    Home: {
      screen: BlankScreen,
      navigationOptions: {
        tabBarLabel: "Explore"
      }
    },
    Camera: {
      screen: BlankScreen,
      navigationOptions: {
        tabBarLabel: "Camera"
      }
    }
  },
  {
    initialRoute: "Home"
  }
);

module.exports = AppTab;
