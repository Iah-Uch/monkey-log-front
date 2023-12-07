import React from "react";
import { View, Text, Button } from "native-base";

function CustomDrawerContent({ navigation, user }) {
  const handleLogout = () => {
    // Lógica para fazer logout
  };

  return (
<View flex={1} justifyContent="space-between" padding={16}>
      <View flexDirection={"row"} justifyContent={"space-between"} >
        <View backgroundColor={"#4D47C3"}  h={10} width={10} borderRadius={5} marginRight={3}/>
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
