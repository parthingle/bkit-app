import Home from "./Screens/Home/HomeScreen";
import Explore from "./Screens/Explore";
import { createBottomTabNavigator } from "react-navigation";
import Settings from "./Screens/Settings";
const AppTab = createBottomTabNavigator(
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
    },
    Camera: {
      screen: Settings,
      navigationOptions: {
        tabBarLabel: "Settings"
      }
    }
  },
  {
    initialRoute: "Home"
  }
);

module.exports = AppTab;
