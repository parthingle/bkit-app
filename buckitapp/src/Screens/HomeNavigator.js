import { createStackNavigator } from "react-navigation";
import HomeScreen from "./Home/HomeScreen";
import BuckitScreen from "./Buckit/BuckitScreen";

const HomeNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Buckit: BuckitScreen
    },
    {
        headerMode: "none"
    }
);

export default HomeNavigator;
