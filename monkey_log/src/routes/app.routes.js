import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/home";
import React from "react";

const {Navigator, Screen} = createDrawerNavigator();

const AppRoutes = () => {
  return (
    <Navigator>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
};
export default AppRoutes;
