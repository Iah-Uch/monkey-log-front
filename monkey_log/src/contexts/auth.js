import React, { createContext, useEffect, useState, useContext, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function LoadStoragedData() {
      const storagedUser = await AsyncStorage.getItem('@user');

      if (storagedUser) {
        setUser(JSON.parse(storagedUser));
      }

      setLoading(false);
    }
    LoadStoragedData();
  }, []);

  const signIn = async (data) => {
    try {
      setUser(data);
      await AsyncStorage.setItem('@user', JSON.stringify(data));
    } catch (error) {
      console.error(error);
      // Trate o erro aqui, como mostrar uma mensagem de erro para o usuário
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const authValue = useMemo(() => ({
    signed: !!user,
    user,
    signIn,
    signOut,
  }), [user]);

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthContext, AuthProvider, useAuth };
