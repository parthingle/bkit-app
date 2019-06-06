import Home from "./Screens/Home/HomeScreen";
import Explore from "./Screens/Explore";
import { createStackNavigator } from "react-navigation";
import Settings from "./Screens/Settings";

const AppTab = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Explore: {
      screen: Explore
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: "float"
      }
    }
  },
  {
    headerMode: "None"
  }
);

module.exports = AppTab;
