import Home from "./Screens/Home/HomeScreen";
import ItemScreen from "./Screens/ItemScreen";
import { createStackNavigator } from "react-navigation";

const AppTab = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    ItemScreen: {
      screen: ItemScreen
    }
  },
  {
    headerMode: "None"
  }
);

module.exports = AppTab;
