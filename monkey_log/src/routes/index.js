import React, { useState, useEffect } from "react";
import AuthRoutes from "./auth.routes";
import AppRoutes from "./app.routes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Routes = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@user");
        if (value !== null) {
          setUser(value);
          console.log("FOIIIIII");
        }
      } catch (e) {
        console.log(e);
      }
    };

    getData();
  }, []); // O segundo parâmetro vazio [] garante que o useEffect seja executado apenas uma vez, após a montagem inicial do componente.

  return <>{user ? <AppRoutes /> : <AuthRoutes />}</>;
};

export default Routes;
