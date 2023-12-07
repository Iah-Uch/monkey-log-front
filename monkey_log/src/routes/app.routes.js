import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation } from '@react-navigation/native';
import Home from "../screens/home";
import React from "react";
import { Button, View } from "native-base";
import { TouchableOpacity } from "react-native";
import Post from "../screens/post";
import { AntDesign } from "@expo/vector-icons";
import CustomDrawerContent from "../components/CustomDrawerContent";

const {Navigator, Screen} = createDrawerNavigator();

const AppRoutes = () => {
  const navigation = useNavigation();
  return (
    <Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
    screenOptions={{
      headerRight: ()=>(
        <TouchableOpacity style={{marginRight: 12}} onPress={() => {
          navigation.navigate("Post")
        }}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerStyle:{
        backgroundColor: "#0B1416",
      },
      headerTitleStyle: {display: "none"},
      drawerStyle:{
        backgroundColor: "#0B1416",
      },
      headerTintColor: "white"
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="Post" component={Post}/>
    </Navigator>
  );
};
export default AppRoutes;
