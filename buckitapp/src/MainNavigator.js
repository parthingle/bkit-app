import Home from "./Screens/Home/HomeScreen";
import ItemScreen from "./Screens/ItemScreen";
import { createStackNavigator } from "react-navigation";
import Settings from "./Screens/Settings";

const AppTab = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    ItemScreen: {
      screen: ItemScreen
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
