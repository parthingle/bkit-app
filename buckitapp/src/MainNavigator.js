import Home from "./Screens/Home/HomeScreen";
import ItemScreen from "./Screens/ItemScreen";
import MapScreen from "./Screens/MapScreen";
import { createStackNavigator } from "react-navigation";

const AppTab = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    ItemScreen: {
      screen: ItemScreen
    },
    MapScreen: {
      screen: MapScreen
    }
  },
  {
    headerMode: "None"
  }
);

module.exports = AppTab;
