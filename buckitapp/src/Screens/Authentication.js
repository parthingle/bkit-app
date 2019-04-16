import React from "react";
import { createStackNavigator } from "react-navigation";

import MainScreen from "./Authentication/MainScreen";
import EnterDetails from "./Authentication/EnterDetails";

export default createStackNavigator({
  MainScreen: MainScreen,
  EnterDetails: EnterDetails
});
