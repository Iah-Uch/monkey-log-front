import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native"
import { NativeBaseProvider } from "native-base"
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth";

export default function App() {
  return (
<NativeBaseProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <AuthProvider>
        <Routes/>
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}