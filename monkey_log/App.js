import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider } from "native-base"
import Routes from "./src/routes";

export default function App() {
  return (
<NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}