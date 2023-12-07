import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/home";
import React from "react";
import { Button, View } from "native-base";
import Post from "../screens/post";
import { AntDesign } from "@expo/vector-icons";
import CustomDrawerContent from "../components/CustomDrawerContent";

const {Navigator, Screen} = createDrawerNavigator();

const AppRoutes = () => {
  return (
    <Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerTitleAlign:"center",
      headerStyle:{
        backgroundColor: "#0B1416",
      },
      headerTintColor: "white",
      headerTitleStyle: {display: "none"},
      drawerStyle:{
        backgroundColor: "#0B1416",
      },
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="Post" component={Post}/>
    </Navigator>
  );
};
export default AppRoutes;
