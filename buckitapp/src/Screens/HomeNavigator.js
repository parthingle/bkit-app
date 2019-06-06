import { createStackNavigator } from "react-navigation";
import HomeScreen from "./Home/HomeScreen";
import BuckitScreen from "./Buckit/BuckitScreen";
import Settings from "./Settings";

const HomeNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Buckit: BuckitScreen,
    Settings: Settings
  },
  {
    headerMode: "none"
  }
);

export default HomeNavigator;
