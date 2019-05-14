import BlankScreen from "./Screens/BlankScreen";
import Home from "./Screens/Home";
import { createBottomTabNavigator } from "react-navigation";
import FacebookLogin from "./Screens/Onboarding/FacebookLogin";
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
      screen: BlankScreen,
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
