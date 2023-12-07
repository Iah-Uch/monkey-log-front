import React from "react";
import { View, Text, Button } from "native-base";
import { useAuth } from "../contexts/auth";

function CustomDrawerContent({ navigation, user }) {
  const { signOut } = useAuth();
  const handleLogout = () => {
    signOut();
  };

  return (
    <View flex={1} justifyContent="space-between" margin={10}>
      <View flexDirection={"row"} justifyContent={"space-between"}>
        <View
          backgroundColor={"#4D47C3"}
          h={10}
          width={10}
          borderRadius={5}
          marginRight={3}
        />
        <Text color="white" fontWeight="bold" fontSize={25}>
          DouglasDoce
        </Text>
      </View>
      <View>
        <Button onPress={handleLogout} colorScheme="danger">
          Logout
        </Button>
      </View>
    </View>
  );
}

export default CustomDrawerContent;
