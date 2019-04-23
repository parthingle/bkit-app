import React from "react";
import { createStackNavigator } from "react-navigation";

import MainScreen from "./Authentication/MainScreen";
import EnterDetails from "./Authentication/EnterDetails";
import HomeScreen from "./Home";

export default createStackNavigator({
  HomeScreen: HomeScreen,  
  MainScreen: MainScreen,
  EnterDetails: EnterDetails,

});
