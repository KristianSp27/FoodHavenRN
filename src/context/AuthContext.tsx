import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  userToken: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreToken();
  }, []);

  const restoreToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    setUserToken(token);
    setLoading(false);
  };

  const login = async () => {
    const fakeToken = "user-token";
    await SecureStore.setItemAsync("token", fakeToken);
    setUserToken(fakeToken);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};