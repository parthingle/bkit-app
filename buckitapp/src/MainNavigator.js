import Home from "./Screens/Home/HomeScreen";
import Explore from "./Screens/Explore";
import { createStackNavigator } from "react-navigation";

const AppTab = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home"
      }
    },
    Explore: {
      screen: Explore,
      navigationOptions: {
        tabBarLabel: "Explore"
      }
    }
  },
  {
    headerMode: "None"
  }
);

module.exports = AppTab;
