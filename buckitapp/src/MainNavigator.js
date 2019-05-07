
import BlankScreen from './Screens/BlankScreen'
import {
    createBottomTabNavigator,
} from "react-navigation";

const AppTab = createBottomTabNavigator({
    Explore: {
      screen: BlankScreen,
      navigationOptions: {
        tabBarLabel: "Explore"
      }
    },
    Home: {
      screen: BlankScreen,
      navigationOptions: {
        tabBarLabel: "Home"
      }
    },
    Camera: {
      screen: BlankScreen,
      navigationOptions: {
        tabBarLabel: "Camera"
      }
    },
  }, {
      initialRoute: "Home"
    });

module.exports = AppTab; 